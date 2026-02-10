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
exports.PlanningService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let PlanningService = class PlanningService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const { budgetDetailId, budgetId, status } = filters;
        const page = Number(filters.page) || 1;
        const pageSize = Number(filters.pageSize) || 20;
        const where = {};
        if (budgetDetailId)
            where.budgetDetailId = budgetDetailId;
        if (budgetId) {
            where.budgetDetail = { budgetId };
        }
        if (status)
            where.status = status;
        const [data, total] = await Promise.all([
            this.prisma.planningVersion.findMany({
                where,
                include: {
                    budgetDetail: {
                        include: {
                            store: true,
                            budget: { include: { groupBrand: true } },
                        },
                    },
                    createdBy: { select: { id: true, name: true, email: true } },
                    _count: { select: { details: true } },
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: [{ budgetDetailId: 'asc' }, { versionNumber: 'desc' }],
            }),
            this.prisma.planningVersion.count({ where }),
        ]);
        return {
            data,
            meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
        };
    }
    async findOne(id) {
        const planning = await this.prisma.planningVersion.findUnique({
            where: { id },
            include: {
                budgetDetail: {
                    include: {
                        store: true,
                        budget: { include: { groupBrand: true } },
                    },
                },
                createdBy: { select: { id: true, name: true, email: true } },
                details: {
                    include: {
                        collection: true,
                        gender: true,
                        category: true,
                        subCategory: true,
                    },
                    orderBy: [
                        { dimensionType: 'asc' },
                        { collectionId: 'asc' },
                        { genderId: 'asc' },
                        { categoryId: 'asc' },
                    ],
                },
            },
        });
        if (!planning)
            throw new common_1.NotFoundException('Planning version not found');
        const approvals = await this.prisma.approval.findMany({
            where: { entityType: 'planning', entityId: id },
            include: { decider: { select: { id: true, name: true } } },
            orderBy: { decidedAt: 'desc' },
        });
        return { ...planning, approvals };
    }
    async create(dto, userId) {
        const budgetDetail = await this.prisma.budgetDetail.findUnique({
            where: { id: dto.budgetDetailId },
            include: { budget: true, store: true },
        });
        if (!budgetDetail) {
            throw new common_1.BadRequestException('Budget detail not found');
        }
        if (budgetDetail.budget.status !== 'APPROVED') {
            throw new common_1.BadRequestException('Cannot create planning for non-approved budget');
        }
        const lastVersion = await this.prisma.planningVersion.findFirst({
            where: { budgetDetailId: dto.budgetDetailId },
            orderBy: { versionNumber: 'desc' },
        });
        const versionNumber = (lastVersion?.versionNumber || 0) + 1;
        const planningCode = `PLN-${budgetDetail.budget.budgetCode}-${budgetDetail.store.code}-V${versionNumber}`;
        const budgetAmount = Number(budgetDetail.budgetAmount);
        const detailsWithOtb = dto.details.map(d => ({
            ...d,
            otbValue: budgetAmount * d.userBuyPct,
            variancePct: d.userBuyPct - d.systemBuyPct,
        }));
        const totalPct = dto.details.reduce((sum, d) => sum + d.userBuyPct, 0);
        if (Math.abs(totalPct - 1) > 0.001) {
            throw new common_1.BadRequestException(`Total allocation percentage must equal 100%. Current: ${(totalPct * 100).toFixed(2)}%`);
        }
        return this.prisma.planningVersion.create({
            data: {
                planningCode,
                budgetDetailId: dto.budgetDetailId,
                versionNumber,
                versionName: dto.versionName || `Version ${versionNumber}`,
                createdById: userId,
                details: {
                    create: detailsWithOtb.map(d => ({
                        dimensionType: d.dimensionType,
                        collectionId: d.collectionId,
                        genderId: d.genderId,
                        categoryId: d.categoryId,
                        subCategoryId: d.subCategoryId,
                        lastSeasonSales: d.lastSeasonSales,
                        lastSeasonPct: d.lastSeasonPct,
                        systemBuyPct: d.systemBuyPct,
                        userBuyPct: d.userBuyPct,
                        otbValue: d.otbValue,
                        variancePct: d.variancePct,
                        userComment: d.userComment,
                    })),
                },
            },
            include: {
                budgetDetail: { include: { store: true, budget: true } },
                details: true,
            },
        });
    }
    async update(id, dto, userId) {
        const planning = await this.prisma.planningVersion.findUnique({
            where: { id },
            include: { budgetDetail: true },
        });
        if (!planning)
            throw new common_1.NotFoundException('Planning version not found');
        if (planning.status !== client_1.PlanningStatus.DRAFT) {
            throw new common_1.ForbiddenException('Only draft planning versions can be edited');
        }
        const updateData = {};
        if (dto.versionName)
            updateData.versionName = dto.versionName;
        if (dto.details) {
            const totalPct = dto.details.reduce((sum, d) => sum + d.userBuyPct, 0);
            if (Math.abs(totalPct - 1) > 0.001) {
                throw new common_1.BadRequestException(`Total allocation percentage must equal 100%. Current: ${(totalPct * 100).toFixed(2)}%`);
            }
            const budgetAmount = Number(planning.budgetDetail.budgetAmount);
            await this.prisma.planningDetail.deleteMany({ where: { planningVersionId: id } });
            await this.prisma.planningDetail.createMany({
                data: dto.details.map(d => ({
                    planningVersionId: id,
                    dimensionType: d.dimensionType,
                    collectionId: d.collectionId,
                    genderId: d.genderId,
                    categoryId: d.categoryId,
                    subCategoryId: d.subCategoryId,
                    lastSeasonSales: d.lastSeasonSales,
                    lastSeasonPct: d.lastSeasonPct,
                    systemBuyPct: d.systemBuyPct,
                    userBuyPct: d.userBuyPct,
                    otbValue: budgetAmount * d.userBuyPct,
                    variancePct: d.userBuyPct - d.systemBuyPct,
                    userComment: d.userComment,
                })),
            });
        }
        return this.prisma.planningVersion.update({
            where: { id },
            data: updateData,
            include: {
                budgetDetail: { include: { store: true, budget: true } },
                details: true,
            },
        });
    }
    async updateDetail(planningId, detailId, dto, userId) {
        const planning = await this.prisma.planningVersion.findUnique({
            where: { id: planningId },
            include: { budgetDetail: true, details: true },
        });
        if (!planning)
            throw new common_1.NotFoundException('Planning version not found');
        if (planning.status !== client_1.PlanningStatus.DRAFT) {
            throw new common_1.ForbiddenException('Only draft planning versions can be edited');
        }
        const detail = planning.details.find(d => d.id === detailId);
        if (!detail)
            throw new common_1.NotFoundException('Planning detail not found');
        const otherDetails = planning.details.filter(d => d.id !== detailId);
        const otherTotal = otherDetails.reduce((sum, d) => sum + Number(d.userBuyPct), 0);
        const newTotal = otherTotal + dto.userBuyPct;
        if (Math.abs(newTotal - 1) > 0.001) {
            throw new common_1.BadRequestException(`Total allocation would be ${(newTotal * 100).toFixed(2)}%. Remaining available: ${((1 - otherTotal) * 100).toFixed(2)}%`);
        }
        const budgetAmount = Number(planning.budgetDetail.budgetAmount);
        return this.prisma.planningDetail.update({
            where: { id: detailId },
            data: {
                userBuyPct: dto.userBuyPct,
                otbValue: budgetAmount * dto.userBuyPct,
                variancePct: dto.userBuyPct - Number(detail.systemBuyPct),
                userComment: dto.userComment,
            },
        });
    }
    async submit(id, userId) {
        const planning = await this.prisma.planningVersion.findUnique({
            where: { id },
            include: { details: true },
        });
        if (!planning)
            throw new common_1.NotFoundException('Planning version not found');
        if (planning.status !== client_1.PlanningStatus.DRAFT) {
            throw new common_1.BadRequestException(`Cannot submit planning with status: ${planning.status}`);
        }
        if (planning.details.length === 0) {
            throw new common_1.BadRequestException('Planning must have at least one allocation detail');
        }
        const snapshotData = {
            submittedAt: new Date().toISOString(),
            details: planning.details,
        };
        return this.prisma.planningVersion.update({
            where: { id },
            data: {
                status: client_1.PlanningStatus.SUBMITTED,
                snapshotData,
            },
        });
    }
    async approveLevel1(id, dto, userId) {
        const planning = await this.prisma.planningVersion.findUnique({ where: { id } });
        if (!planning)
            throw new common_1.NotFoundException('Planning version not found');
        if (planning.status !== client_1.PlanningStatus.SUBMITTED) {
            throw new common_1.BadRequestException(`Cannot approve planning with status: ${planning.status}`);
        }
        const newStatus = dto.action === 'APPROVED'
            ? client_1.PlanningStatus.LEVEL1_APPROVED
            : client_1.PlanningStatus.REJECTED;
        await this.prisma.approval.create({
            data: {
                entityType: 'planning',
                entityId: id,
                level: 1,
                deciderId: userId,
                action: dto.action,
                comment: dto.comment,
            },
        });
        return this.prisma.planningVersion.update({
            where: { id },
            data: { status: newStatus },
            include: { budgetDetail: { include: { store: true } } },
        });
    }
    async approveLevel2(id, dto, userId) {
        const planning = await this.prisma.planningVersion.findUnique({ where: { id } });
        if (!planning)
            throw new common_1.NotFoundException('Planning version not found');
        if (planning.status !== client_1.PlanningStatus.LEVEL1_APPROVED) {
            throw new common_1.BadRequestException(`Cannot approve planning with status: ${planning.status}`);
        }
        const newStatus = dto.action === 'APPROVED'
            ? client_1.PlanningStatus.APPROVED
            : client_1.PlanningStatus.REJECTED;
        await this.prisma.approval.create({
            data: {
                entityType: 'planning',
                entityId: id,
                level: 2,
                deciderId: userId,
                action: dto.action,
                comment: dto.comment,
            },
        });
        return this.prisma.planningVersion.update({
            where: { id },
            data: { status: newStatus },
            include: { budgetDetail: { include: { store: true } } },
        });
    }
    async markAsFinal(id, userId) {
        const planning = await this.prisma.planningVersion.findUnique({
            where: { id },
            include: { budgetDetail: true },
        });
        if (!planning)
            throw new common_1.NotFoundException('Planning version not found');
        if (planning.status !== client_1.PlanningStatus.APPROVED) {
            throw new common_1.BadRequestException('Only approved planning versions can be marked as final');
        }
        await this.prisma.planningVersion.updateMany({
            where: {
                budgetDetailId: planning.budgetDetailId,
                isFinal: true,
            },
            data: { isFinal: false },
        });
        return this.prisma.planningVersion.update({
            where: { id },
            data: { isFinal: true },
            include: { budgetDetail: { include: { store: true } } },
        });
    }
    async createFromVersion(sourceId, userId) {
        const source = await this.prisma.planningVersion.findUnique({
            where: { id: sourceId },
            include: { details: true, budgetDetail: { include: { store: true, budget: true } } },
        });
        if (!source)
            throw new common_1.NotFoundException('Source planning version not found');
        const lastVersion = await this.prisma.planningVersion.findFirst({
            where: { budgetDetailId: source.budgetDetailId },
            orderBy: { versionNumber: 'desc' },
        });
        const versionNumber = (lastVersion?.versionNumber || 0) + 1;
        const planningCode = `PLN-${source.budgetDetail.budget.budgetCode}-${source.budgetDetail.store.code}-V${versionNumber}`;
        return this.prisma.planningVersion.create({
            data: {
                planningCode,
                budgetDetailId: source.budgetDetailId,
                versionNumber,
                versionName: `Version ${versionNumber} (copy from V${source.versionNumber})`,
                createdById: userId,
                details: {
                    create: source.details.map(d => ({
                        dimensionType: d.dimensionType,
                        collectionId: d.collectionId,
                        genderId: d.genderId,
                        categoryId: d.categoryId,
                        subCategoryId: d.subCategoryId,
                        lastSeasonSales: d.lastSeasonSales,
                        lastSeasonPct: d.lastSeasonPct,
                        systemBuyPct: d.systemBuyPct,
                        userBuyPct: d.userBuyPct,
                        otbValue: d.otbValue,
                        variancePct: d.variancePct,
                        userComment: d.userComment,
                    })),
                },
            },
            include: {
                budgetDetail: { include: { store: true } },
                details: true,
            },
        });
    }
    async remove(id) {
        const planning = await this.prisma.planningVersion.findUnique({
            where: { id },
            include: { proposals: true },
        });
        if (!planning)
            throw new common_1.NotFoundException('Planning version not found');
        if (planning.status !== client_1.PlanningStatus.DRAFT) {
            throw new common_1.ForbiddenException('Only draft planning versions can be deleted');
        }
        if (planning.proposals.length > 0) {
            throw new common_1.ForbiddenException('Cannot delete planning with linked proposals');
        }
        return this.prisma.planningVersion.delete({ where: { id } });
    }
};
exports.PlanningService = PlanningService;
exports.PlanningService = PlanningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlanningService);
//# sourceMappingURL=planning.service.js.map