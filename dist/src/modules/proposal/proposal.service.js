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
exports.ProposalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ProposalService = class ProposalService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const { budgetId, planningVersionId, status } = filters;
        const page = Number(filters.page) || 1;
        const pageSize = Number(filters.pageSize) || 20;
        const where = {};
        if (budgetId)
            where.budgetId = budgetId;
        if (planningVersionId)
            where.planningVersionId = planningVersionId;
        if (status)
            where.status = status;
        const [data, total] = await Promise.all([
            this.prisma.proposal.findMany({
                where,
                include: {
                    budget: { include: { groupBrand: true } },
                    planningVersion: { select: { id: true, planningCode: true, versionNumber: true } },
                    createdBy: { select: { id: true, name: true, email: true } },
                    _count: { select: { products: true } },
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.proposal.count({ where }),
        ]);
        return {
            data,
            meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
        };
    }
    async findOne(id) {
        const proposal = await this.prisma.proposal.findUnique({
            where: { id },
            include: {
                budget: { include: { groupBrand: true } },
                planningVersion: {
                    include: {
                        budgetDetail: { include: { store: true } },
                    },
                },
                createdBy: { select: { id: true, name: true, email: true } },
                products: {
                    orderBy: { sortOrder: 'asc' },
                },
            },
        });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        const approvals = await this.prisma.approval.findMany({
            where: { entityType: 'proposal', entityId: id },
            include: { decider: { select: { id: true, name: true } } },
            orderBy: { decidedAt: 'desc' },
        });
        const summary = this.calculateSummary(proposal.products);
        return { ...proposal, approvals, summary };
    }
    async create(dto, userId) {
        const budget = await this.prisma.budget.findUnique({
            where: { id: dto.budgetId },
        });
        if (!budget)
            throw new common_1.BadRequestException('Budget not found');
        if (budget.status !== 'APPROVED') {
            throw new common_1.BadRequestException('Cannot create proposal for non-approved budget');
        }
        if (dto.planningVersionId) {
            const planning = await this.prisma.planningVersion.findUnique({
                where: { id: dto.planningVersionId },
                include: { budgetDetail: true },
            });
            if (!planning)
                throw new common_1.BadRequestException('Planning version not found');
            if (planning.budgetDetail.budgetId !== dto.budgetId) {
                throw new common_1.BadRequestException('Planning version does not belong to the specified budget');
            }
        }
        return this.prisma.proposal.create({
            data: {
                ticketName: dto.ticketName,
                budgetId: dto.budgetId,
                planningVersionId: dto.planningVersionId,
                createdById: userId,
            },
            include: {
                budget: { include: { groupBrand: true } },
                planningVersion: true,
            },
        });
    }
    async update(id, dto, userId) {
        const proposal = await this.prisma.proposal.findUnique({ where: { id } });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        if (proposal.status !== client_1.ProposalStatus.DRAFT) {
            throw new common_1.ForbiddenException('Only draft proposals can be edited');
        }
        if (dto.planningVersionId) {
            const planning = await this.prisma.planningVersion.findUnique({
                where: { id: dto.planningVersionId },
                include: { budgetDetail: true },
            });
            if (!planning)
                throw new common_1.BadRequestException('Planning version not found');
            if (planning.budgetDetail.budgetId !== proposal.budgetId) {
                throw new common_1.BadRequestException('Planning version does not belong to the proposal budget');
            }
        }
        return this.prisma.proposal.update({
            where: { id },
            data: {
                ticketName: dto.ticketName,
                planningVersionId: dto.planningVersionId,
            },
            include: {
                budget: { include: { groupBrand: true } },
                planningVersion: true,
            },
        });
    }
    async addProduct(proposalId, dto, userId) {
        const proposal = await this.prisma.proposal.findUnique({ where: { id: proposalId } });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        if (proposal.status !== client_1.ProposalStatus.DRAFT) {
            throw new common_1.ForbiddenException('Can only add products to draft proposals');
        }
        const existing = await this.prisma.proposalProduct.findFirst({
            where: { proposalId, skuId: dto.skuId },
        });
        if (existing) {
            throw new common_1.BadRequestException('SKU already exists in this proposal. Use update to change quantity.');
        }
        const sku = await this.prisma.skuCatalog.findUnique({
            where: { id: dto.skuId },
            include: { brand: true },
        });
        if (!sku)
            throw new common_1.BadRequestException('SKU not found in catalog');
        const [genderCode, ...categoryParts] = (sku.productType || '').split(' ');
        const gender = genderCode === 'W' ? 'Women' : genderCode === 'M' ? 'Men' : genderCode;
        const category = categoryParts.join(' ');
        const unitCost = Number(sku.srp);
        const totalValue = unitCost * dto.orderQty;
        const lastProduct = await this.prisma.proposalProduct.findFirst({
            where: { proposalId },
            orderBy: { sortOrder: 'desc' },
        });
        const product = await this.prisma.proposalProduct.create({
            data: {
                proposalId,
                skuId: dto.skuId,
                skuCode: sku.skuCode,
                productName: sku.productName,
                collection: sku.brand?.name || null,
                gender,
                category,
                subCategory: null,
                theme: sku.theme,
                color: sku.color,
                composition: sku.composition,
                unitCost,
                srp: sku.srp,
                orderQty: dto.orderQty,
                totalValue,
                customerTarget: dto.customerTarget,
                imageUrl: sku.imageUrl,
                sortOrder: (lastProduct?.sortOrder || 0) + 1,
            },
        });
        await this.updateProposalTotals(proposalId);
        return product;
    }
    async bulkAddProducts(proposalId, dto, userId) {
        const proposal = await this.prisma.proposal.findUnique({ where: { id: proposalId } });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        if (proposal.status !== client_1.ProposalStatus.DRAFT) {
            throw new common_1.ForbiddenException('Can only add products to draft proposals');
        }
        const results = [];
        for (const productDto of dto.products) {
            try {
                const product = await this.addProduct(proposalId, productDto, userId);
                results.push({ success: true, skuId: productDto.skuId, product });
            }
            catch (error) {
                results.push({ success: false, skuId: productDto.skuId, error: error.message });
            }
        }
        return { results, proposal: await this.findOne(proposalId) };
    }
    async updateProduct(proposalId, productId, dto, userId) {
        const proposal = await this.prisma.proposal.findUnique({ where: { id: proposalId } });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        if (proposal.status !== client_1.ProposalStatus.DRAFT) {
            throw new common_1.ForbiddenException('Can only update products in draft proposals');
        }
        const product = await this.prisma.proposalProduct.findFirst({
            where: { id: productId, proposalId },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found in this proposal');
        const updateData = {};
        if (dto.orderQty !== undefined) {
            updateData.orderQty = dto.orderQty;
            updateData.totalValue = Number(product.unitCost) * dto.orderQty;
        }
        if (dto.customerTarget !== undefined)
            updateData.customerTarget = dto.customerTarget;
        if (dto.sortOrder !== undefined)
            updateData.sortOrder = dto.sortOrder;
        const updated = await this.prisma.proposalProduct.update({
            where: { id: productId },
            data: updateData,
        });
        await this.updateProposalTotals(proposalId);
        return updated;
    }
    async removeProduct(proposalId, productId, userId) {
        const proposal = await this.prisma.proposal.findUnique({ where: { id: proposalId } });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        if (proposal.status !== client_1.ProposalStatus.DRAFT) {
            throw new common_1.ForbiddenException('Can only remove products from draft proposals');
        }
        const product = await this.prisma.proposalProduct.findFirst({
            where: { id: productId, proposalId },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found in this proposal');
        await this.prisma.proposalProduct.delete({ where: { id: productId } });
        await this.updateProposalTotals(proposalId);
        return { message: 'Product removed from proposal' };
    }
    async submit(id, userId) {
        const proposal = await this.prisma.proposal.findUnique({
            where: { id },
            include: { products: true },
        });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        if (proposal.status !== client_1.ProposalStatus.DRAFT) {
            throw new common_1.BadRequestException(`Cannot submit proposal with status: ${proposal.status}`);
        }
        if (proposal.products.length === 0) {
            throw new common_1.BadRequestException('Proposal must have at least one product');
        }
        return this.prisma.proposal.update({
            where: { id },
            data: { status: client_1.ProposalStatus.SUBMITTED },
            include: {
                budget: { include: { groupBrand: true } },
                _count: { select: { products: true } },
            },
        });
    }
    async approveLevel1(id, dto, userId) {
        const proposal = await this.prisma.proposal.findUnique({ where: { id } });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        if (proposal.status !== client_1.ProposalStatus.SUBMITTED) {
            throw new common_1.BadRequestException(`Cannot approve proposal with status: ${proposal.status}`);
        }
        const newStatus = dto.action === 'APPROVED'
            ? client_1.ProposalStatus.LEVEL1_APPROVED
            : client_1.ProposalStatus.REJECTED;
        await this.prisma.approval.create({
            data: {
                entityType: 'proposal',
                entityId: id,
                level: 1,
                deciderId: userId,
                action: dto.action,
                comment: dto.comment,
            },
        });
        return this.prisma.proposal.update({
            where: { id },
            data: { status: newStatus },
            include: {
                budget: { include: { groupBrand: true } },
                _count: { select: { products: true } },
            },
        });
    }
    async approveLevel2(id, dto, userId) {
        const proposal = await this.prisma.proposal.findUnique({ where: { id } });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        if (proposal.status !== client_1.ProposalStatus.LEVEL1_APPROVED) {
            throw new common_1.BadRequestException(`Cannot approve proposal with status: ${proposal.status}`);
        }
        const newStatus = dto.action === 'APPROVED'
            ? client_1.ProposalStatus.APPROVED
            : client_1.ProposalStatus.REJECTED;
        await this.prisma.approval.create({
            data: {
                entityType: 'proposal',
                entityId: id,
                level: 2,
                deciderId: userId,
                action: dto.action,
                comment: dto.comment,
            },
        });
        return this.prisma.proposal.update({
            where: { id },
            data: { status: newStatus },
            include: {
                budget: { include: { groupBrand: true } },
                _count: { select: { products: true } },
            },
        });
    }
    async remove(id) {
        const proposal = await this.prisma.proposal.findUnique({ where: { id } });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        if (proposal.status !== client_1.ProposalStatus.DRAFT) {
            throw new common_1.ForbiddenException('Only draft proposals can be deleted');
        }
        return this.prisma.proposal.delete({ where: { id } });
    }
    async getStatistics(budgetId) {
        const where = budgetId ? { budgetId } : {};
        const [total, byStatus, totals] = await Promise.all([
            this.prisma.proposal.count({ where }),
            this.prisma.proposal.groupBy({
                by: ['status'],
                where,
                _count: true,
            }),
            this.prisma.proposal.aggregate({
                where,
                _sum: {
                    totalSkuCount: true,
                    totalOrderQty: true,
                    totalValue: true,
                },
            }),
        ]);
        const statusMap = byStatus.reduce((acc, s) => {
            acc[s.status] = s._count;
            return acc;
        }, {});
        return {
            total,
            byStatus: statusMap,
            totals: {
                skuCount: totals._sum.totalSkuCount || 0,
                orderQty: totals._sum.totalOrderQty || 0,
                value: totals._sum.totalValue || 0,
            },
        };
    }
    async updateProposalTotals(proposalId) {
        const products = await this.prisma.proposalProduct.findMany({
            where: { proposalId },
        });
        const totalSkuCount = products.length;
        const totalOrderQty = products.reduce((sum, p) => sum + p.orderQty, 0);
        const totalValue = products.reduce((sum, p) => sum + Number(p.totalValue), 0);
        await this.prisma.proposal.update({
            where: { id: proposalId },
            data: { totalSkuCount, totalOrderQty, totalValue },
        });
    }
    calculateSummary(products) {
        const byCollection = {};
        const byCategory = {};
        for (const p of products) {
            const collection = p.collection || 'Unknown';
            const category = p.category || 'Unknown';
            if (!byCollection[collection])
                byCollection[collection] = { qty: 0, value: 0, count: 0 };
            byCollection[collection].qty += p.orderQty;
            byCollection[collection].value += Number(p.totalValue);
            byCollection[collection].count += 1;
            if (!byCategory[category])
                byCategory[category] = { qty: 0, value: 0, count: 0 };
            byCategory[category].qty += p.orderQty;
            byCategory[category].value += Number(p.totalValue);
            byCategory[category].count += 1;
        }
        return { byCollection, byCategory };
    }
};
exports.ProposalService = ProposalService;
exports.ProposalService = ProposalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProposalService);
//# sourceMappingURL=proposal.service.js.map