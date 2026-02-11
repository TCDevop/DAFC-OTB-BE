import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ApprovalAction } from '../../common/enums';
import { CreateTicketDto, ApprovalActionDto } from './dto/ticket.dto';

@Injectable()
export class TicketService {
    constructor(private prisma: PrismaService) { }

    // ─── CREATE TICKET ──────────────────────────────────────────────────────────

    async create(userId: string, dto: CreateTicketDto) {
        // 1. Validate Planning/Proposal Final Status if provided
        if (dto.planningHeaderId) {
            const plan = await this.prisma.planningHeader.findUnique({ where: { planningHeaderId: dto.planningHeaderId } });
            if (!plan) throw new NotFoundException('Planning Header not found');
            if (plan.planningStatus !== 'FINAL') throw new BadRequestException('Planning Header must be FINAL to create a ticket');
        }

        if (dto.skuProposalHeaderId) {
            const prop = await this.prisma.sKUProposalHeader.findUnique({ where: { skuProposalHeaderId: dto.skuProposalHeaderId } });
            if (!prop) throw new NotFoundException('SKU Proposal Header not found');
            if (prop.proposalStatus !== 'FINAL') throw new BadRequestException('Proposal Header must be FINAL to create a ticket');
        }

        // 2. Get BudgetAllocate details to find GroupBrand
        const allocation = await this.prisma.budgetAllocate.findUnique({
            where: { budgetAllocateId: dto.budgetAllocateId },
            include: {
                allocateHeader: {
                    include: {
                        budget: {
                            include: {
                                brand: { include: { groupBrand: true } }
                            }
                        }
                    }
                }
            }
        });

        if (!allocation) throw new NotFoundException('Budget Allocation not found');
        if (!allocation.allocateHeader?.budget?.brand) throw new BadRequestException('Invalid allocation structure');

        const groupBrandId = (allocation.allocateHeader.budget.brand as any).groupBrandId;

        // 3. Find Active Workflow for GroupBrand
        const workflow = await this.prisma.approvalWorkflow.findFirst({
            where: { groupBrandId },
            include: { approvalWorkflowLevels: { orderBy: { levelOrder: 'asc' } } }
        });

        if (!workflow || workflow.approvalWorkflowLevels.length === 0) {
            throw new BadRequestException('No approval workflow found for this brand group');
        }

        // 4. Create Ticket
        return this.prisma.ticket.create({
            data: {
                budgetAllocateId: dto.budgetAllocateId,
                planningHeaderId: dto.planningHeaderId,
                skuProposalHeaderId: dto.skuProposalHeaderId,
                ticketStatus: 'PENDING',
                createdBy: userId
            }
        });
    }

    // ─── GET TICKET ─────────────────────────────────────────────────────────────

    async findOne(id: string) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { ticketId: id },
            include: {
                budgetAllocate: true,
                creator: { select: { userId: true, userName: true } },
                ticketApprovalLogs: {
                    include: {
                        approverUser: { select: { userId: true, userName: true } },
                        approvalWorkflowLevel: true
                    },
                    orderBy: { createdAt: 'asc' }
                }
            }
        });
        if (!ticket) throw new NotFoundException('Ticket not found');
        return ticket;
    }

    // ─── APPROVE / REJECT ──────────────────────────────────────────────────────

    async processApproval(id: string, userId: string, dto: ApprovalActionDto) {
        const ticket = await this.findOne(id);

        if (ticket.ticketStatus === 'APPROVED' || ticket.ticketStatus === 'REJECTED') {
            throw new BadRequestException('Ticket is already finalized');
        }

        // 1. Re-fetch workflow to know structure
        const allocation = await this.prisma.budgetAllocate.findUnique({
            where: { budgetAllocateId: ticket.budgetAllocateId },
            include: { allocateHeader: { include: { budget: { include: { brand: true } } } } }
        });

        if (!allocation) throw new NotFoundException('Allocation not found');
        if (!allocation.allocateHeader?.budget?.brand) throw new BadRequestException('Invalid allocation data');

        const groupBrandId = (allocation.allocateHeader.budget.brand as any).groupBrandId;
        const workflow = await this.prisma.approvalWorkflow.findFirst({
            where: { groupBrandId },
            include: { approvalWorkflowLevels: { orderBy: { levelOrder: 'asc' } } }
        });

        if (!workflow) throw new BadRequestException('Workflow configuration missing');

        // 2. Determine Current Level
        // Count approvals in logs to see how far we are
        const approvedLogs = ticket.ticketApprovalLogs.filter(l => l.isApproved);
        const currentLevelIndex = approvedLogs.length;

        if (currentLevelIndex >= workflow.approvalWorkflowLevels.length) {
            throw new BadRequestException('All levels already approved');
        }

        const currentLevel = workflow.approvalWorkflowLevels[currentLevelIndex];

        // 3. Check Permission
        if (currentLevel.approverUserId !== userId) {
            // Allow admin override? For now, strict check.
            // Assuming admin might want to override, but let's stick to workflow.
            throw new ForbiddenException('You are not the designated approver for this level');
        }

        return this.prisma.$transaction(async (tx) => {
            // 4. Create Log
            await tx.ticketApprovalLog.create({
                data: {
                    ticketId: id,
                    approvalWorkflowLevelId: currentLevel.approvalWorkflowLevelId,
                    approverUserId: userId,
                    isApproved: dto.action === ApprovalAction.APPROVED,
                    comment: dto.comment,
                    approvedAt: new Date()
                }
            });

            // 5. Update Status
            if (dto.action === ApprovalAction.REJECTED) {
                // Reject whole ticket
                await tx.ticket.update({
                    where: { ticketId: id },
                    data: { ticketStatus: 'REJECTED' }
                });
                // Update Alloction? (Optional, maybe keep it separate)
            } else {
                // Approved
                if (currentLevelIndex + 1 >= workflow.approvalWorkflowLevels.length) {
                    // Final Approval
                    await tx.ticket.update({
                        where: { ticketId: id },
                        data: { ticketStatus: 'APPROVED' }
                    });
                    // Update Allocation Status? (Depends if BudgetAllocate has status)
                    // Schema check: Budget has status, BudgetAllocate logic implied via Ticket?
                    // BudgetAllocate doesn't have status field in new schema? Let's check.
                    // It seems Budget has status. 
                } else {
                    // Move to next level (ticket status remains PENDING or IN_PROGRESS)
                    await tx.ticket.update({
                        where: { ticketId: id },
                        data: { ticketStatus: 'PENDING' } // or 'IN_KEY_USER_REVIEW' etc.
                    });
                }
            }

            return this.findOne(id);
        });
    }
}
