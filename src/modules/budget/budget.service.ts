import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { BudgetStatus, ApprovalAction } from '../../common/enums';
import { CreateBudgetDto, UpdateBudgetDto, ApprovalDecisionDto } from './dto/budget.dto';

interface BudgetFilters {
  fiscalYear?: number;
  brandId?: string;
  budgetName?: string;
  status?: BudgetStatus;
  page?: number;
  pageSize?: number;
}

import { TicketService } from '../ticket/ticket.service';

@Injectable()
export class BudgetService {
  constructor(
    private prisma: PrismaService,
    private ticketService: TicketService
  ) { }

  // ─── LIST ──────────────────────────────────────────────────────────────

  async findAll(filters: BudgetFilters) {
    const { fiscalYear, brandId, budgetName, status, page = 1, pageSize = 20 } = filters;

    const where: Prisma.BudgetWhereInput = {};
    if (fiscalYear) where.fiscalYear = fiscalYear;
    if (brandId) where.brandId = brandId;
    if (budgetName) where.budgetName = { contains: budgetName };
    if (status) where.budgetStatus = status;

    const [data, total] = await Promise.all([
      this.prisma.budget.findMany({
        where,
        include: {
          brand: true,
          creator: { select: { userId: true, userName: true, userEmail: true } },
          // Include latest allocation header? Or simplify for list view.
          allocateHeaders: {
            orderBy: { version: 'desc' },
            take: 1
          }
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.budget.count({ where }),
    ]);

    return {
      data,
      meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    };
  }

  // ─── GET ONE ───────────────────────────────────────────────────────────

  async findOne(id: string) {
    const budget = await this.prisma.budget.findUnique({
      where: { budgetId: id },
      include: {
        brand: true,
        creator: { select: { userId: true, userName: true, userEmail: true } },
        allocateHeaders: {
          include: {
            budgetAllocates: { include: { store: true, season: true, seasonGroup: true } }
          },
          orderBy: { version: 'desc' }
        }
      },
    });

    if (!budget) throw new NotFoundException('Budget not found');
    return budget;
  }

  // ─── CREATE ────────────────────────────────────────────────────────────

  async create(dto: CreateBudgetDto, userId: string) {
    // Validate allocations
    if (!dto.allocations || dto.allocations.length === 0) {
      throw new BadRequestException('At least one allocation is required');
    }

    // Check uniqueness (basic check on name/year/brand combo if needed, but budgetName is not unique in DB schema, so okay)

    // Create Budget + AllocateHeader (v1) + Allocations
    return this.prisma.$transaction(async (tx) => {
      const budget = await tx.budget.create({
        data: {
          budgetName: dto.budgetName,
          brandId: dto.brandId,
          fiscalYear: dto.fiscalYear,
          budgetAmount: dto.budgetAmount,
          budgetStatus: 'DRAFT',
          description: dto.comment,
          createdBy: userId
        }
      });

      const header = await tx.allocateHeader.create({
        data: {
          budgetId: budget.budgetId,
          version: 1,
          createdBy: userId
        }
      });

      if (dto.allocations.length > 0) {
        await tx.budgetAllocate.createMany({
          data: dto.allocations.map(alloc => ({
            allocateHeaderId: header.allocateHeaderId,
            storeId: alloc.storeId,
            seasonGroupId: alloc.seasonGroupId,
            seasonId: alloc.seasonId,
            budgetAmount: alloc.budgetAmount
          }))
        });
      }

      return budget;
    });
  }

  // ─── UPDATE ────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateBudgetDto, userId: string) {
    const budget = await this.prisma.budget.findUnique({
      where: { budgetId: id },
      include: { allocateHeaders: { orderBy: { version: 'desc' }, take: 1 } }
    });

    if (!budget) throw new NotFoundException('Budget not found');

    if (budget.budgetStatus !== 'DRAFT') {
      throw new ForbiddenException('Only draft budgets can be edited');
    }

    // Update basic fields
    const updateData: any = {};
    if (dto.budgetName) updateData.budgetName = dto.budgetName;
    if (dto.budgetAmount) updateData.budgetAmount = dto.budgetAmount;
    if (dto.comment) updateData.description = dto.comment;

    await this.prisma.budget.update({
      where: { budgetId: id },
      data: updateData
    });

    // Handle allocations update
    // Strategy: Update the latest AllocateHeader if it exists and is draft (which it inherently is if budget is draft).
    // Simply delete old allocations for this header and recreate.
    if (dto.allocations && dto.allocations.length > 0) {
      let headerId = budget.allocateHeaders[0]?.allocateHeaderId;

      if (!headerId) {
        // Should not happen if created correctly, but handle anyway
        const header = await this.prisma.allocateHeader.create({
          data: { budgetId: id, version: 1, createdBy: userId }
        });
        headerId = header.allocateHeaderId;
      }

      // Replace allocations
      await this.prisma.budgetAllocate.deleteMany({ where: { allocateHeaderId: headerId } });
      await this.prisma.budgetAllocate.createMany({
        data: dto.allocations.map(alloc => ({
          allocateHeaderId: headerId,
          storeId: alloc.storeId,
          seasonGroupId: alloc.seasonGroupId,
          seasonId: alloc.seasonId,
          budgetAmount: alloc.budgetAmount
        }))
      });
    }

    return this.findOne(id);
  }

  // ─── SUBMIT ────────────────────────────────────────────────────────────

  async submit(id: string, userId: string) {
    const budget = await this.prisma.budget.findUnique({
      where: { budgetId: id },
      include: { allocateHeaders: { orderBy: { version: 'desc' }, take: 1, include: { budgetAllocates: true } } }
    });
    if (!budget) throw new NotFoundException('Budget not found');

    if (budget.budgetStatus !== 'DRAFT') {
      throw new BadRequestException(`Cannot submit budget with status: ${budget.budgetStatus}`);
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Update Budget Status
      await tx.budget.update({
        where: { budgetId: id },
        data: { budgetStatus: 'SUBMITTED' },
      });

      // 2. Create Tickets for all allocations in the latest header
      const latestHeader = budget.allocateHeaders[0];
      if (latestHeader && latestHeader.budgetAllocates.length > 0) {
        for (const alloc of latestHeader.budgetAllocates) {
          await this.ticketService.create(userId, { budgetAllocateId: alloc.budgetAllocateId });
        }
      }

      return budget;
    });
  }

  // ─── DELETE ────────────────────────────────────────────────────────────

  async remove(id: string) {
    const budget = await this.prisma.budget.findUnique({ where: { budgetId: id } });
    if (!budget) throw new NotFoundException('Budget not found');

    if (budget.budgetStatus !== 'DRAFT') {
      throw new ForbiddenException('Only draft budgets can be deleted');
    }

    // Cascade delete via Prisma if configured, or manual delete.
    // Schema relations might not cascade.
    // Manual delete for safety:

    // 1. Delete BudgetAllocates (need specific header IDs)
    // 2. Delete AllocateHeaders
    // 3. Delete Budget

    // Better: Rely on onDelete: Cascade in schema if present. 
    // Checking schema: 
    // Budget -> AllocateHeader (onDelete: Cascade? No, default is usually separate).
    // Let's optimize delete:
    const headers = await this.prisma.allocateHeader.findMany({ where: { budgetId: id } });
    const headerIds = headers.map(h => h.allocateHeaderId);

    await this.prisma.budgetAllocate.deleteMany({ where: { allocateHeaderId: { in: headerIds } } });
    await this.prisma.allocateHeader.deleteMany({ where: { budgetId: id } });

    return this.prisma.budget.delete({ where: { budgetId: id } });
  }

  // ─── APPROVE (Simplified) ────────────────────────────────────────────────

  async approve(id: string, dto: ApprovalDecisionDto, userId: string) {
    const budget = await this.prisma.budget.findUnique({ where: { budgetId: id } });
    if (!budget) throw new NotFoundException('Budget not found');

    if (budget.budgetStatus !== 'SUBMITTED') {
      throw new BadRequestException(`Cannot approve budget with status: ${budget.budgetStatus}. Must be SUBMITTED.`);
    }

    const newStatus = dto.action === 'APPROVED' ? 'APPROVED' : 'REJECTED';

    // In a real system, we'd create a Ticket or Log here.
    // For now, just update status.

    return this.prisma.budget.update({
      where: { budgetId: id },
      data: { budgetStatus: newStatus },
    });
  }

  // ─── STATISTICS ─────────────────────────────────────────────────────────

  async getStatistics(fiscalYear?: number) {
    const where: Prisma.BudgetWhereInput = {};
    if (fiscalYear) where.fiscalYear = fiscalYear;

    const [total, byStatus, totalAmount] = await Promise.all([
      this.prisma.budget.count({ where }),
      this.prisma.budget.groupBy({
        by: ['budgetStatus'],
        where,
        _count: true,
        _sum: { budgetAmount: true }, // Added sum if grouped? groupBy only supports sum in aggregator? No, check syntax.
      }),
      this.prisma.budget.aggregate({
        where,
        _sum: { budgetAmount: true },
      }),
    ]);

    // groupBy returns array of objects ({ budgetStatus: ..., _count: ... })
    // The previous getStatistics had _count: true. 

    // Let's check previous implementation in step 602.
    // groupBy({ by: ['budgetStatus'], where, _count: true })
    // aggregate({ where, _sum: { budgetAmount: true } })

    const approvedBudgets = await this.prisma.budget.aggregate({
      where: { ...where, budgetStatus: 'APPROVED' },
      _sum: { budgetAmount: true },
    });

    return {
      totalBudgets: total,
      totalAmount: totalAmount._sum.budgetAmount || 0,
      approvedAmount: approvedBudgets._sum.budgetAmount || 0,
      byStatus: byStatus.reduce((acc, item) => {
        acc[item.budgetStatus] = item._count;
        return acc;
      }, {} as Record<string, number>),
    };
  }
}
