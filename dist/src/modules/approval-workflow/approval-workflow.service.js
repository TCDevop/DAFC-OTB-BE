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
exports.ApprovalWorkflowService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ApprovalWorkflowService = class ApprovalWorkflowService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(groupBrandId) {
        const where = {};
        if (groupBrandId)
            where.groupBrandId = groupBrandId;
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
    async findOne(id) {
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
        if (!workflow)
            throw new common_1.NotFoundException('Proprsal Workflow not found');
        return workflow;
    }
    async create(dto) {
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
    async update(id, dto) {
        const workflow = await this.prisma.approvalWorkflow.findUnique({ where: { approvalWorkflowId: id } });
        if (!workflow)
            throw new common_1.NotFoundException('Workflow not found');
        return this.prisma.$transaction(async (tx) => {
            if (dto.workflowName) {
                await tx.approvalWorkflow.update({
                    where: { approvalWorkflowId: id },
                    data: { workflowName: dto.workflowName }
                });
            }
            if (dto.levels) {
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
    async remove(id) {
        const workflow = await this.prisma.approvalWorkflow.findUnique({ where: { approvalWorkflowId: id } });
        if (!workflow)
            throw new common_1.NotFoundException('Workflow not found');
        await this.prisma.approvalWorkflowLevel.deleteMany({ where: { approvalWorkflowId: id } });
        return this.prisma.approvalWorkflow.delete({ where: { approvalWorkflowId: id } });
    }
};
exports.ApprovalWorkflowService = ApprovalWorkflowService;
exports.ApprovalWorkflowService = ApprovalWorkflowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApprovalWorkflowService);
//# sourceMappingURL=approval-workflow.service.js.map