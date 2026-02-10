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
exports.BudgetService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let BudgetService = class BudgetService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const { fiscalYear, groupBrandId, seasonGroupId, status, page = 1, pageSize = 20 } = filters;
        const where = {};
        if (fiscalYear)
            where.fiscalYear = fiscalYear;
        if (groupBrandId)
            where.groupBrandId = groupBrandId;
        if (seasonGroupId)
            where.seasonGroupId = seasonGroupId;
        if (status)
            where.status = status;
        const [data, total] = await Promise.all([
            this.prisma.budget.findMany({
                where,
                include: {
                    groupBrand: true,
                    details: { include: { store: true } },
                    createdBy: { select: { id: true, name: true, email: true } },
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
    async findOne(id) {
        const budget = await this.prisma.budget.findUnique({
            where: { id },
            include: {
                groupBrand: true,
                details: { include: { store: true } },
                createdBy: { select: { id: true, name: true, email: true } },
            },
        });
        if (!budget)
            throw new common_1.NotFoundException('Budget not found');
        const approvals = await this.prisma.approval.findMany({
            where: { entityType: 'budget', entityId: id },
            include: { decider: { select: { id: true, name: true } } },
            orderBy: { decidedAt: 'desc' },
        });
        return { ...budget, approvals };
    }
    async create(dto, userId) {
        const validDetails = dto.details.filter(d => d.budgetAmount > 0);
        if (validDetails.length === 0) {
            throw new common_1.BadRequestException('At least one store must have a budget amount > 0');
        }
        const totalBudget = validDetails.reduce((sum, d) => sum + d.budgetAmount, 0);
        const brand = await this.prisma.groupBrand.findUnique({ where: { id: dto.groupBrandId } });
        if (!brand)
            throw new common_1.BadRequestException('Invalid brand');
        const budgetCode = `BUD-${brand.code}-${dto.seasonGroupId}-${dto.seasonType}-${dto.fiscalYear}`;
        const existing = await this.prisma.budget.findUnique({ where: { budgetCode } });
        if (existing) {
            throw new common_1.BadRequestException(`Budget already exists: ${budgetCode}`);
        }
        return this.prisma.budget.create({
            data: {
                budgetCode,
                groupBrandId: dto.groupBrandId,
                seasonGroupId: dto.seasonGroupId,
                seasonType: dto.seasonType,
                fiscalYear: dto.fiscalYear,
                totalBudget,
                comment: dto.comment,
                createdById: userId,
                details: {
                    create: dto.details.map(d => ({
                        storeId: d.storeId,
                        budgetAmount: d.budgetAmount,
                    })),
                },
            },
            include: {
                groupBrand: true,
                details: { include: { store: true } },
            },
        });
    }
    async update(id, dto, userId) {
        const budget = await this.prisma.budget.findUnique({ where: { id } });
        if (!budget)
            throw new common_1.NotFoundException('Budget not found');
        if (budget.status !== client_1.BudgetStatus.DRAFT) {
            throw new common_1.ForbiddenException('Only draft budgets can be edited');
        }
        const updateData = {};
        if (dto.comment !== undefined)
            updateData.comment = dto.comment;
        if (dto.details) {
            const validDetails = dto.details.filter(d => d.budgetAmount > 0);
            if (validDetails.length === 0) {
                throw new common_1.BadRequestException('At least one store must have a budget amount > 0');
            }
            updateData.totalBudget = dto.details.reduce((sum, d) => sum + d.budgetAmount, 0);
            await this.prisma.budgetDetail.deleteMany({ where: { budgetId: id } });
            await this.prisma.budgetDetail.createMany({
                data: dto.details.map(d => ({
                    budgetId: id,
                    storeId: d.storeId,
                    budgetAmount: d.budgetAmount,
                })),
            });
        }
        return this.prisma.budget.update({
            where: { id },
            data: updateData,
            include: {
                groupBrand: true,
                details: { include: { store: true } },
            },
        });
    }
    async submit(id, userId) {
        const budget = await this.prisma.budget.findUnique({
            where: { id },
            include: { details: true },
        });
        if (!budget)
            throw new common_1.NotFoundException('Budget not found');
        if (budget.status !== client_1.BudgetStatus.DRAFT) {
            throw new common_1.BadRequestException(`Cannot submit budget with status: ${budget.status}`);
        }
        return this.prisma.budget.update({
            where: { id },
            data: { status: client_1.BudgetStatus.SUBMITTED },
        });
    }
    async remove(id) {
        const budget = await this.prisma.budget.findUnique({
            where: { id },
            include: { details: { include: { planningVersions: true } } },
        });
        if (!budget)
            throw new common_1.NotFoundException('Budget not found');
        if (budget.status !== client_1.BudgetStatus.DRAFT) {
            throw new common_1.ForbiddenException('Only draft budgets can be deleted');
        }
        const hasPlanning = budget.details.some(d => d.planningVersions.length > 0);
        if (hasPlanning) {
            throw new common_1.ForbiddenException('Cannot delete budget that has linked planning versions');
        }
        return this.prisma.budget.delete({ where: { id } });
    }
    async approveLevel1(id, dto, userId) {
        const budget = await this.prisma.budget.findUnique({ where: { id } });
        if (!budget)
            throw new common_1.NotFoundException('Budget not found');
        if (budget.status !== client_1.BudgetStatus.SUBMITTED) {
            throw new common_1.BadRequestException(`Cannot approve budget with status: ${budget.status}. Must be SUBMITTED.`);
        }
        const newStatus = dto.action === 'APPROVED'
            ? client_1.BudgetStatus.LEVEL1_APPROVED
            : client_1.BudgetStatus.REJECTED;
        await this.prisma.approval.create({
            data: {
                entityType: 'budget',
                entityId: id,
                level: 1,
                deciderId: userId,
                action: dto.action,
                comment: dto.comment,
            },
        });
        return this.prisma.budget.update({
            where: { id },
            data: { status: newStatus },
            include: {
                groupBrand: true,
                details: { include: { store: true } },
            },
        });
    }
    async approveLevel2(id, dto, userId) {
        const budget = await this.prisma.budget.findUnique({ where: { id } });
        if (!budget)
            throw new common_1.NotFoundException('Budget not found');
        if (budget.status !== client_1.BudgetStatus.LEVEL1_APPROVED) {
            throw new common_1.BadRequestException(`Cannot approve budget with status: ${budget.status}. Must be LEVEL1_APPROVED.`);
        }
        const newStatus = dto.action === 'APPROVED'
            ? client_1.BudgetStatus.APPROVED
            : client_1.BudgetStatus.REJECTED;
        await this.prisma.approval.create({
            data: {
                entityType: 'budget',
                entityId: id,
                level: 2,
                deciderId: userId,
                action: dto.action,
                comment: dto.comment,
            },
        });
        return this.prisma.budget.update({
            where: { id },
            data: { status: newStatus },
            include: {
                groupBrand: true,
                details: { include: { store: true } },
            },
        });
    }
    async getStatistics(fiscalYear) {
        const where = {};
        if (fiscalYear)
            where.fiscalYear = fiscalYear;
        const [total, byStatus, totalAmount] = await Promise.all([
            this.prisma.budget.count({ where }),
            this.prisma.budget.groupBy({
                by: ['status'],
                where,
                _count: true,
            }),
            this.prisma.budget.aggregate({
                where,
                _sum: { totalBudget: true },
            }),
        ]);
        const approvedBudgets = await this.prisma.budget.aggregate({
            where: { ...where, status: client_1.BudgetStatus.APPROVED },
            _sum: { totalBudget: true },
        });
        return {
            totalBudgets: total,
            totalAmount: totalAmount._sum.totalBudget || 0,
            approvedAmount: approvedBudgets._sum.totalBudget || 0,
            byStatus: byStatus.reduce((acc, item) => {
                acc[item.status] = item._count;
                return acc;
            }, {}),
        };
    }
};
exports.BudgetService = BudgetService;
exports.BudgetService = BudgetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BudgetService);
//# sourceMappingURL=budget.service.js.map