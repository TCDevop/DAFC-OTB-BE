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
const ticket_service_1 = require("../ticket/ticket.service");
let BudgetService = class BudgetService {
    constructor(prisma, ticketService) {
        this.prisma = prisma;
        this.ticketService = ticketService;
    }
    async findAll(filters) {
        const { fiscalYear, brandId, budgetName, status, page = 1, pageSize = 20 } = filters;
        const where = {};
        if (fiscalYear)
            where.fiscalYear = fiscalYear;
        if (brandId)
            where.brandId = brandId;
        if (budgetName)
            where.budgetName = { contains: budgetName };
        if (status)
            where.budgetStatus = status;
        const [data, total] = await Promise.all([
            this.prisma.budget.findMany({
                where,
                include: {
                    brand: true,
                    creator: { select: { userId: true, userName: true, userEmail: true } },
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
    async findOne(id) {
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
        if (!budget)
            throw new common_1.NotFoundException('Budget not found');
        return budget;
    }
    async create(dto, userId) {
        if (!dto.allocations || dto.allocations.length === 0) {
            throw new common_1.BadRequestException('At least one allocation is required');
        }
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
    async update(id, dto, userId) {
        const budget = await this.prisma.budget.findUnique({
            where: { budgetId: id },
            include: { allocateHeaders: { orderBy: { version: 'desc' }, take: 1 } }
        });
        if (!budget)
            throw new common_1.NotFoundException('Budget not found');
        if (budget.budgetStatus !== 'DRAFT') {
            throw new common_1.ForbiddenException('Only draft budgets can be edited');
        }
        const updateData = {};
        if (dto.budgetName)
            updateData.budgetName = dto.budgetName;
        if (dto.budgetAmount)
            updateData.budgetAmount = dto.budgetAmount;
        if (dto.comment)
            updateData.description = dto.comment;
        await this.prisma.budget.update({
            where: { budgetId: id },
            data: updateData
        });
        if (dto.allocations && dto.allocations.length > 0) {
            let headerId = budget.allocateHeaders[0]?.allocateHeaderId;
            if (!headerId) {
                const header = await this.prisma.allocateHeader.create({
                    data: { budgetId: id, version: 1, createdBy: userId }
                });
                headerId = header.allocateHeaderId;
            }
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
    async submit(id, userId) {
        const budget = await this.prisma.budget.findUnique({
            where: { budgetId: id },
            include: { allocateHeaders: { orderBy: { version: 'desc' }, take: 1, include: { budgetAllocates: true } } }
        });
        if (!budget)
            throw new common_1.NotFoundException('Budget not found');
        if (budget.budgetStatus !== 'DRAFT') {
            throw new common_1.BadRequestException(`Cannot submit budget with status: ${budget.budgetStatus}`);
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.budget.update({
                where: { budgetId: id },
                data: { budgetStatus: 'SUBMITTED' },
            });
            const latestHeader = budget.allocateHeaders[0];
            if (latestHeader && latestHeader.budgetAllocates.length > 0) {
                for (const alloc of latestHeader.budgetAllocates) {
                    await this.ticketService.create(userId, { budgetAllocateId: alloc.budgetAllocateId });
                }
            }
            return budget;
        });
    }
    async remove(id) {
        const budget = await this.prisma.budget.findUnique({ where: { budgetId: id } });
        if (!budget)
            throw new common_1.NotFoundException('Budget not found');
        if (budget.budgetStatus !== 'DRAFT') {
            throw new common_1.ForbiddenException('Only draft budgets can be deleted');
        }
        const headers = await this.prisma.allocateHeader.findMany({ where: { budgetId: id } });
        const headerIds = headers.map(h => h.allocateHeaderId);
        await this.prisma.budgetAllocate.deleteMany({ where: { allocateHeaderId: { in: headerIds } } });
        await this.prisma.allocateHeader.deleteMany({ where: { budgetId: id } });
        return this.prisma.budget.delete({ where: { budgetId: id } });
    }
    async approve(id, dto, userId) {
        const budget = await this.prisma.budget.findUnique({ where: { budgetId: id } });
        if (!budget)
            throw new common_1.NotFoundException('Budget not found');
        if (budget.budgetStatus !== 'SUBMITTED') {
            throw new common_1.BadRequestException(`Cannot approve budget with status: ${budget.budgetStatus}. Must be SUBMITTED.`);
        }
        const newStatus = dto.action === 'APPROVED' ? 'APPROVED' : 'REJECTED';
        return this.prisma.budget.update({
            where: { budgetId: id },
            data: { budgetStatus: newStatus },
        });
    }
    async getStatistics(fiscalYear) {
        const where = {};
        if (fiscalYear)
            where.fiscalYear = fiscalYear;
        const [total, byStatus, totalAmount] = await Promise.all([
            this.prisma.budget.count({ where }),
            this.prisma.budget.groupBy({
                by: ['budgetStatus'],
                where,
                _count: true,
                _sum: { budgetAmount: true },
            }),
            this.prisma.budget.aggregate({
                where,
                _sum: { budgetAmount: true },
            }),
        ]);
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
            }, {}),
        };
    }
};
exports.BudgetService = BudgetService;
exports.BudgetService = BudgetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ticket_service_1.TicketService])
], BudgetService);
//# sourceMappingURL=budget.service.js.map