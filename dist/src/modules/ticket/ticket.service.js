"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const enums_1 = require("../../common/enums");
let TicketService = class TicketService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        if (dto.planningHeaderId) {
            const plan = await this.prisma.planningHeader.findUnique({ where: { planningHeaderId: dto.planningHeaderId } });
            if (!plan)
                throw new common_1.NotFoundException('Planning Header not found');
            if (plan.planningStatus !== 'FINAL')
                throw new common_1.BadRequestException('Planning Header must be FINAL to create a ticket');
        }
        if (dto.skuProposalHeaderId) {
            const prop = await this.prisma.sKUProposalHeader.findUnique({ where: { skuProposalHeaderId: dto.skuProposalHeaderId } });
            if (!prop)
                throw new common_1.NotFoundException('SKU Proposal Header not found');
            if (prop.proposalStatus !== 'FINAL')
                throw new common_1.BadRequestException('Proposal Header must be FINAL to create a ticket');
        }
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
        if (!allocation)
            throw new common_1.NotFoundException('Budget Allocation not found');
        if (!allocation.allocateHeader?.budget?.brand)
            throw new common_1.BadRequestException('Invalid allocation structure');
        const groupBrandId = allocation.allocateHeader.budget.brand.groupBrandId;
        const workflow = await this.prisma.approvalWorkflow.findFirst({
            where: { groupBrandId },
            include: { approvalWorkflowLevels: { orderBy: { levelOrder: 'asc' } } }
        });
        if (!workflow || workflow.approvalWorkflowLevels.length === 0) {
            throw new common_1.BadRequestException('No approval workflow found for this brand group');
        }
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
    async findOne(id) {
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
        if (!ticket)
            throw new common_1.NotFoundException('Ticket not found');
        return ticket;
    }
    async processApproval(id, userId, dto) {
        const ticket = await this.findOne(id);
        if (ticket.ticketStatus === 'APPROVED' || ticket.ticketStatus === 'REJECTED') {
            throw new common_1.BadRequestException('Ticket is already finalized');
        }
        const allocation = await this.prisma.budgetAllocate.findUnique({
            where: { budgetAllocateId: ticket.budgetAllocateId },
            include: { allocateHeader: { include: { budget: { include: { brand: true } } } } }
        });
        if (!allocation)
            throw new common_1.NotFoundException('Allocation not found');
        if (!allocation.allocateHeader?.budget?.brand)
            throw new common_1.BadRequestException('Invalid allocation data');
        const groupBrandId = allocation.allocateHeader.budget.brand.groupBrandId;
        const workflow = await this.prisma.approvalWorkflow.findFirst({
            where: { groupBrandId },
            include: { approvalWorkflowLevels: { orderBy: { levelOrder: 'asc' } } }
        });
        if (!workflow)
            throw new common_1.BadRequestException('Workflow configuration missing');
        const approvedLogs = ticket.ticketApprovalLogs.filter(l => l.isApproved);
        const currentLevelIndex = approvedLogs.length;
        if (currentLevelIndex >= workflow.approvalWorkflowLevels.length) {
            throw new common_1.BadRequestException('All levels already approved');
        }
        const currentLevel = workflow.approvalWorkflowLevels[currentLevelIndex];
        if (currentLevel.approverUserId !== userId) {
            throw new common_1.ForbiddenException('You are not the designated approver for this level');
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.ticketApprovalLog.create({
                data: {
                    ticketId: id,
                    approvalWorkflowLevelId: currentLevel.approvalWorkflowLevelId,
                    approverUserId: userId,
                    isApproved: dto.action === enums_1.ApprovalAction.APPROVED,
                    comment: dto.comment,
                    approvedAt: new Date()
                }
            });
            if (dto.action === enums_1.ApprovalAction.REJECTED) {
                await tx.ticket.update({
                    where: { ticketId: id },
                    data: { ticketStatus: 'REJECTED' }
                });
            }
            else {
                if (currentLevelIndex + 1 >= workflow.approvalWorkflowLevels.length) {
                    await tx.ticket.update({
                        where: { ticketId: id },
                        data: { ticketStatus: 'APPROVED' }
                    });
                }
                else {
                    await tx.ticket.update({
                        where: { ticketId: id },
                        data: { ticketStatus: 'PENDING' }
                    });
                }
            }
            return this.findOne(id);
        });
    }
};
exports.TicketService = TicketService;
exports.TicketService = TicketService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketService);
//# sourceMappingURL=ticket.service.js.map