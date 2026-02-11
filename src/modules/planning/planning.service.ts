import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePlanningHeaderDto, UpdatePlanningDto } from './dto/planning.dto';

interface PlanningFilters {
  page?: number;
  pageSize?: number;
}

@Injectable()
export class PlanningService {
  constructor(private prisma: PrismaService) { }

  // ─── LIST ──────────────────────────────────────────────────────────────

  async findAll(filters: PlanningFilters) {
    const { page = 1, pageSize = 20 } = filters;
    const where: Prisma.PlanningHeaderWhereInput = { isActive: true };

    const [data, total] = await Promise.all([
      this.prisma.planningHeader.findMany({
        where,
        include: {
          creator: { select: { userId: true, userName: true, userEmail: true } },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.planningHeader.count({ where }),
    ]);

    return {
      data,
      meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    };
  }

  // ─── GET ONE ───────────────────────────────────────────────────────────

  async findOne(id: string) {
    const planning = await this.prisma.planningHeader.findUnique({
      where: { planningHeaderId: id },
      include: {
        creator: { select: { userId: true, userName: true, userEmail: true } },
        planningCollections: { include: { store: true, collection: true } },
        planningGenders: { include: { store: true, gender: true } },
      },
    });

    if (!planning) throw new NotFoundException('Planning not found');
    return planning;
  }

  // ─── CREATE ────────────────────────────────────────────────────────────

  async create(dto: CreatePlanningHeaderDto, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Create Header (Version 1)
      const header = await tx.planningHeader.create({
        data: {
          version: 1,
          createdBy: userId,
          isActive: true
        }
      });

      // 2. Create Collections breakdown
      if (dto.collections && dto.collections.length > 0) {
        await tx.planningCollection.createMany({
          data: dto.collections.map(d => ({
            planningHeaderId: header.planningHeaderId,
            storeId: d.storeId,
            collectionId: d.collectionId,
            actualBuyPct: d.actualBuyPct,
            proposedBuyPct: d.proposedBuyPct,
            otbProposedAmount: d.otbProposedAmount
          }))
        });
      }

      // 3. Create Genders breakdown
      if (dto.genders && dto.genders.length > 0) {
        await tx.planningGender.createMany({
          data: dto.genders.map(d => ({
            planningHeaderId: header.planningHeaderId,
            storeId: d.storeId,
            genderId: d.genderId,
            actualBuyPct: d.actualBuyPct,
            proposedBuyPct: d.proposedBuyPct,
            otbProposedAmount: d.otbProposedAmount
          }))
        });
      }

      return header;
    });
  }

  // ─── UPDATE ────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdatePlanningDto, userId: string) {
    const planning = await this.prisma.planningHeader.findUnique({
      where: { planningHeaderId: id }
    });
    if (!planning) throw new NotFoundException('Planning not found');

    return this.prisma.$transaction(async (tx) => {
      // Update Collections
      if (dto.collections) {
        await tx.planningCollection.deleteMany({ where: { planningHeaderId: id } });
        if (dto.collections.length > 0) {
          await tx.planningCollection.createMany({
            data: dto.collections.map(d => ({
              planningHeaderId: id,
              storeId: d.storeId,
              collectionId: d.collectionId,
              actualBuyPct: d.actualBuyPct,
              proposedBuyPct: d.proposedBuyPct,
              otbProposedAmount: d.otbProposedAmount
            }))
          });
        }
      }

      // Update Genders
      if (dto.genders) {
        await tx.planningGender.deleteMany({ where: { planningHeaderId: id } });
        if (dto.genders.length > 0) {
          await tx.planningGender.createMany({
            data: dto.genders.map(d => ({
              planningHeaderId: id,
              storeId: d.storeId,
              genderId: d.genderId,
              actualBuyPct: d.actualBuyPct,
              proposedBuyPct: d.proposedBuyPct,
              otbProposedAmount: d.otbProposedAmount
            }))
          });
        }
      }

      return this.findOne(id);
    });
  }

  // ─── DELETE ────────────────────────────────────────────────────────────

  async remove(id: string) {
    const planning = await this.prisma.planningHeader.findUnique({ where: { planningHeaderId: id } });
    if (!planning) throw new NotFoundException('Planning not found');

    // Cascade Delete manually
    await this.prisma.planningCollection.deleteMany({ where: { planningHeaderId: id } });
    await this.prisma.planningGender.deleteMany({ where: { planningHeaderId: id } });

    return this.prisma.planningHeader.delete({ where: { planningHeaderId: id } });
  }

  // ─── FINALIZE ──────────────────────────────────────────────────────────

  async finalize(id: string) {
    const planning = await this.prisma.planningHeader.findUnique({ where: { planningHeaderId: id } });
    if (!planning) throw new NotFoundException('Planning not found');

    if (planning.planningStatus === 'FINAL') {
      throw new BadRequestException('Planning is already finalized');
    }

    // Optional: Logic to ensure only one FINAL version exists per criteria?
    // For now, just simple status update as requested.

    return this.prisma.planningHeader.update({
      where: { planningHeaderId: id },
      data: { planningStatus: 'FINAL' }
    });
  }
}
