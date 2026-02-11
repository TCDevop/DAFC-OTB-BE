import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateSKUProposalHeaderDto, UpdateProposalDto, ApprovalDecisionDto } from './dto/proposal.dto';

interface ProposalFilters {
  page?: number;
  pageSize?: number;
}

@Injectable()
export class ProposalService {
  constructor(private prisma: PrismaService) { }

  // ─── LIST ────────────────────────────────────────────────────────────────

  async findAll(filters: ProposalFilters) {
    const { page = 1, pageSize = 20 } = filters;
    const where: Prisma.SKUProposalHeaderWhereInput = {};

    const [data, total] = await Promise.all([
      this.prisma.sKUProposalHeader.findMany({
        where,
        include: {
          creator: { select: { userId: true, userName: true, userEmail: true } },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.sKUProposalHeader.count({ where }),
    ]);

    return {
      data,
      meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    };
  }

  // ─── GET ONE ─────────────────────────────────────────────────────────────

  async findOne(id: string) {
    const proposal = await this.prisma.sKUProposalHeader.findUnique({
      where: { skuProposalHeaderId: id },
      include: {
        creator: { select: { userId: true, userName: true, userEmail: true } },
        skuProposals: {
          include: {
            product: true,
            skuAllocates: { include: { store: true } },
            proposalSizings: true
          }
        }
      },
    });

    if (!proposal) throw new NotFoundException('Proposal not found');
    return proposal;
  }

  // ─── CREATE ──────────────────────────────────────────────────────────────

  async create(dto: CreateSKUProposalHeaderDto, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Create Header (Version 1 usually, or just a new proposal set)
      const header = await tx.sKUProposalHeader.create({
        data: {
          version: 1,
          createdBy: userId
        }
      });

      // 2. Create SKU Proposals
      if (dto.proposals && dto.proposals.length > 0) {
        // Need to loop because allocating sub-relations (allocates, sizings)
        for (const prop of dto.proposals) {
          const skuProp = await tx.sKUProposal.create({
            data: {
              skuProposalHeaderId: header.skuProposalHeaderId,
              productId: prop.productId,
              customerTarget: prop.customerTarget,
              unitCost: prop.unitCost,
              srp: prop.srp,
              selectedSizingChoice: prop.selectedSizingChoice || 1
            }
          });

          if (prop.allocates && prop.allocates.length > 0) {
            await tx.sKUAllocate.createMany({
              data: prop.allocates.map(a => ({
                skuProposalId: skuProp.skuProposalId,
                storeId: a.storeId,
                quantity: a.quantity
              }))
            });
          }

          if (prop.sizings && prop.sizings.length > 0) {
            await tx.proposalSizing.createMany({
              data: prop.sizings.map(s => ({
                skuProposalId: skuProp.skuProposalId,
                subcategorySizeId: s.subcategorySizeId,
                sizingChoice: s.sizingChoice || 1, // Default to 1
                proposalQuantity: s.proposalQuantity,
                actualSalesmixPct: 0, // Defaults
                actualStPct: 0
              }))
            });
          }
        }
      }

      return header;
    });
  }

  // ─── UPDATE ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateProposalDto, userId: string) {
    const proposal = await this.prisma.sKUProposalHeader.findUnique({ where: { skuProposalHeaderId: id } });
    if (!proposal) throw new NotFoundException('Proposal not found');

    // Recreating logic similar to create (replace all)
    return this.prisma.$transaction(async (tx) => {
      // Delete existing proposals (cascade should handle allocates/sizings)
      await tx.sKUProposal.deleteMany({ where: { skuProposalHeaderId: id } });

      if (dto.proposals && dto.proposals.length > 0) {
        for (const prop of dto.proposals) {
          const skuProp = await tx.sKUProposal.create({
            data: {
              skuProposalHeaderId: id,
              productId: prop.productId,
              customerTarget: prop.customerTarget,
              unitCost: prop.unitCost,
              srp: prop.srp,
              selectedSizingChoice: prop.selectedSizingChoice || 1
            }
          });

          if (prop.allocates && prop.allocates.length > 0) {
            await tx.sKUAllocate.createMany({
              data: prop.allocates.map(a => ({
                skuProposalId: skuProp.skuProposalId,
                storeId: a.storeId,
                quantity: a.quantity
              }))
            });
          }

          if (prop.sizings && prop.sizings.length > 0) {
            await tx.proposalSizing.createMany({
              data: prop.sizings.map(s => ({
                skuProposalId: skuProp.skuProposalId,
                subcategorySizeId: s.subcategorySizeId,
                sizingChoice: s.sizingChoice || 1, // Default to 1
                proposalQuantity: s.proposalQuantity
              }))
            });
          }
        }
      }

      return this.findOne(id);
    });
  }

  // ─── DELETE ──────────────────────────────────────────────────────────────

  async remove(id: string) {
    const proposal = await this.prisma.sKUProposalHeader.findUnique({ where: { skuProposalHeaderId: id } });
    if (!proposal) throw new NotFoundException('Proposal not found');

    // Cascade delete manually just in case
    const props = await this.prisma.sKUProposal.findMany({ where: { skuProposalHeaderId: id } });
    const propIds = props.map(p => p.skuProposalId);

    await this.prisma.sKUAllocate.deleteMany({ where: { skuProposalId: { in: propIds } } });
    await this.prisma.proposalSizing.deleteMany({ where: { skuProposalId: { in: propIds } } });
    await this.prisma.sKUProposal.deleteMany({ where: { skuProposalHeaderId: id } });

    return this.prisma.sKUProposalHeader.delete({ where: { skuProposalHeaderId: id } });
  }

  // ─── FINALIZE ──────────────────────────────────────────────────────────

  async finalize(id: string) {
    const proposal = await this.prisma.sKUProposalHeader.findUnique({ where: { skuProposalHeaderId: id } });
    if (!proposal) throw new NotFoundException('Proposal not found');

    if (proposal.proposalStatus === 'FINAL') {
      throw new BadRequestException('Proposal is already finalized');
    }

    return this.prisma.sKUProposalHeader.update({
      where: { skuProposalHeaderId: id },
      data: { proposalStatus: 'FINAL' }
    });
  }
}
