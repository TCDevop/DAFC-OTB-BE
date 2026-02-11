import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateApprovalWorkflowDto, UpdateApprovalWorkflowDto } from './dto/approval-workflow.dto';

@Injectable()
export class ApprovalWorkflowService {
  constructor(private prisma: PrismaService) { }

  // ─── LIST ────────────────────────────────────────────────────────────────

  async findAll(groupBrandId?: string) {
    const where: any = {};
    if (groupBrandId) where.groupBrandId = groupBrandId;

    return this.prisma.approvalWorkflow.findMany({
      where,
      include: {
        groupBrand: { select: { groupBrandId: true, groupBrandName: true, groupBrandCode: true } },
        approvalWorkflowLevels: {
          include: {
            approverUser: { select: { userId: true, userName: true, userEmail: true } }
          },
          orderBy: { levelOrder: 'asc' }
        },
      },
      orderBy: { groupBrandId: 'asc' },
    });
  }

  // ─── GET ONE ─────────────────────────────────────────────────────────────

  async findOne(id: string) {
    const workflow = await this.prisma.approvalWorkflow.findUnique({
      where: { approvalWorkflowId: id },
      include: {
        groupBrand: true,
        approvalWorkflowLevels: {
          include: {
            approverUser: { select: { userId: true, userName: true, userEmail: true } }
          },
          orderBy: { levelOrder: 'asc' }
        },
      },
    });

    if (!workflow) throw new NotFoundException('Proprsal Workflow not found');
    return workflow;
  }

  // ─── CREATE ──────────────────────────────────────────────────────────────

  async create(dto: CreateApprovalWorkflowDto) {
    // Check if workflow exists for group brand? Maybe multiple allowed? 
    // Assuming one per group brand for simplicity or allow multiple.

    return this.prisma.approvalWorkflow.create({
      data: {
        groupBrandId: dto.groupBrandId,
        workflowName: dto.workflowName,
        approvalWorkflowLevels: {
          create: dto.levels.map(l => ({
            levelOrder: l.levelOrder,
            levelName: l.levelName,
            approverUserId: l.approverUserId,
            isRequired: l.isRequired
          }))
        }
      },
      include: { approvalWorkflowLevels: true }
    });
  }

  // ─── UPDATE ──────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateApprovalWorkflowDto) {
    const workflow = await this.prisma.approvalWorkflow.findUnique({ where: { approvalWorkflowId: id } });
    if (!workflow) throw new NotFoundException('Workflow not found');

    return this.prisma.$transaction(async (tx) => {
      if (dto.workflowName) {
        await tx.approvalWorkflow.update({
          where: { approvalWorkflowId: id },
          data: { workflowName: dto.workflowName }
        });
      }

      if (dto.levels) {
        // Replace levels
        await tx.approvalWorkflowLevel.deleteMany({ where: { approvalWorkflowId: id } });
        await tx.approvalWorkflowLevel.createMany({
          data: dto.levels.map(l => ({
            approvalWorkflowId: id,
            levelOrder: l.levelOrder,
            levelName: l.levelName,
            approverUserId: l.approverUserId,
            isRequired: l.isRequired
          }))
        });
      }

      return this.findOne(id);
    });
  }

  // ─── DELETE ──────────────────────────────────────────────────────────────

  async remove(id: string) {
    const workflow = await this.prisma.approvalWorkflow.findUnique({ where: { approvalWorkflowId: id } });
    if (!workflow) throw new NotFoundException('Workflow not found');

    // Cascade delete handled by schema usually, but levels need delete
    await this.prisma.approvalWorkflowLevel.deleteMany({ where: { approvalWorkflowId: id } });

    return this.prisma.approvalWorkflow.delete({ where: { approvalWorkflowId: id } });
  }
}
