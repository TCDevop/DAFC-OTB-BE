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
    async findAll(brandId) {
        const where = { isActive: true };
        if (brandId)
            where.brandId = brandId;
        return this.prisma.approvalWorkflowStep.findMany({
            where,
            include: {
                brand: { select: { id: true, name: true, code: true } },
                user: { select: { id: true, name: true, email: true } },
            },
            orderBy: [{ brandId: 'asc' }, { stepNumber: 'asc' }],
        });
    }
    async findByBrand(brandId) {
        return this.prisma.approvalWorkflowStep.findMany({
            where: { brandId, isActive: true },
            include: {
                brand: { select: { id: true, name: true } },
                user: { select: { id: true, name: true, email: true } },
            },
            orderBy: { stepNumber: 'asc' },
        });
    }
    async create(data) {
        const brand = await this.prisma.groupBrand.findUnique({
            where: { id: data.brandId },
        });
        if (!brand)
            throw new common_1.NotFoundException('Brand not found');
        const existing = await this.prisma.approvalWorkflowStep.findUnique({
            where: { brandId_stepNumber: { brandId: data.brandId, stepNumber: data.stepNumber } },
        });
        if (existing) {
            throw new common_1.BadRequestException(`Step ${data.stepNumber} already exists for this brand`);
        }
        return this.prisma.approvalWorkflowStep.create({
            data,
            include: {
                brand: { select: { id: true, name: true } },
                user: { select: { id: true, name: true } },
            },
        });
    }
    async update(id, data) {
        const step = await this.prisma.approvalWorkflowStep.findUnique({ where: { id } });
        if (!step)
            throw new common_1.NotFoundException('Workflow step not found');
        if (data.stepNumber && data.stepNumber !== step.stepNumber) {
            const existing = await this.prisma.approvalWorkflowStep.findUnique({
                where: { brandId_stepNumber: { brandId: step.brandId, stepNumber: data.stepNumber } },
            });
            if (existing) {
                throw new common_1.BadRequestException(`Step ${data.stepNumber} already exists for this brand`);
            }
        }
        return this.prisma.approvalWorkflowStep.update({
            where: { id },
            data,
            include: {
                brand: { select: { id: true, name: true } },
                user: { select: { id: true, name: true } },
            },
        });
    }
    async delete(id) {
        const step = await this.prisma.approvalWorkflowStep.findUnique({ where: { id } });
        if (!step)
            throw new common_1.NotFoundException('Workflow step not found');
        return this.prisma.approvalWorkflowStep.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async reorderSteps(brandId, stepIds) {
        const updates = stepIds.map((id, index) => this.prisma.approvalWorkflowStep.update({
            where: { id },
            data: { stepNumber: index + 1 },
        }));
        await this.prisma.$transaction(updates);
        return this.findByBrand(brandId);
    }
    getAvailableRoles() {
        return [
            { code: 'BRAND_MANAGER', name: 'Brand Manager' },
            { code: 'GROUP_HEAD', name: 'Group Head' },
            { code: 'FINANCE', name: 'Finance Lead' },
            { code: 'CEO', name: 'CEO' },
            { code: 'ADMIN', name: 'Admin' },
        ];
    }
};
exports.ApprovalWorkflowService = ApprovalWorkflowService;
exports.ApprovalWorkflowService = ApprovalWorkflowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApprovalWorkflowService);
//# sourceMappingURL=approval-workflow.service.js.map