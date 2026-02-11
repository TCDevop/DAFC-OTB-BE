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
let ProposalService = class ProposalService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const { page = 1, pageSize = 20 } = filters;
        const where = {};
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
    async findOne(id) {
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
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        return proposal;
    }
    async create(dto, userId) {
        return this.prisma.$transaction(async (tx) => {
            const header = await tx.sKUProposalHeader.create({
                data: {
                    version: 1,
                    createdBy: userId
                }
            });
            if (dto.proposals && dto.proposals.length > 0) {
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
                                sizingChoice: s.sizingChoice || 1,
                                proposalQuantity: s.proposalQuantity,
                                actualSalesmixPct: 0,
                                actualStPct: 0
                            }))
                        });
                    }
                }
            }
            return header;
        });
    }
    async update(id, dto, userId) {
        const proposal = await this.prisma.sKUProposalHeader.findUnique({ where: { skuProposalHeaderId: id } });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        return this.prisma.$transaction(async (tx) => {
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
                                sizingChoice: s.sizingChoice || 1,
                                proposalQuantity: s.proposalQuantity
                            }))
                        });
                    }
                }
            }
            return this.findOne(id);
        });
    }
    async remove(id) {
        const proposal = await this.prisma.sKUProposalHeader.findUnique({ where: { skuProposalHeaderId: id } });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        const props = await this.prisma.sKUProposal.findMany({ where: { skuProposalHeaderId: id } });
        const propIds = props.map(p => p.skuProposalId);
        await this.prisma.sKUAllocate.deleteMany({ where: { skuProposalId: { in: propIds } } });
        await this.prisma.proposalSizing.deleteMany({ where: { skuProposalId: { in: propIds } } });
        await this.prisma.sKUProposal.deleteMany({ where: { skuProposalHeaderId: id } });
        return this.prisma.sKUProposalHeader.delete({ where: { skuProposalHeaderId: id } });
    }
    async finalize(id) {
        const proposal = await this.prisma.sKUProposalHeader.findUnique({ where: { skuProposalHeaderId: id } });
        if (!proposal)
            throw new common_1.NotFoundException('Proposal not found');
        if (proposal.proposalStatus === 'FINAL') {
            throw new common_1.BadRequestException('Proposal is already finalized');
        }
        return this.prisma.sKUProposalHeader.update({
            where: { skuProposalHeaderId: id },
            data: { proposalStatus: 'FINAL' }
        });
    }
};
exports.ProposalService = ProposalService;
exports.ProposalService = ProposalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProposalService);
//# sourceMappingURL=proposal.service.js.map