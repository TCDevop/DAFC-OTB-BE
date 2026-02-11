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
let PlanningService = class PlanningService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const { page = 1, pageSize = 20 } = filters;
        const where = { isActive: true };
        const [data, total] = await Promise.all([
            this.prisma.planningHeader.findMany({
                where,
                include: {
                    creator: { select: { userId: true, userName: true, userEmail: true } },
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.planningHeader.count({ where }),
        ]);
        return {
            data,
            meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
        };
    }
    async findOne(id) {
        const planning = await this.prisma.planningHeader.findUnique({
            where: { planningHeaderId: id },
            include: {
                creator: { select: { userId: true, userName: true, userEmail: true } },
                planningCollections: { include: { store: true, collection: true } },
                planningGenders: { include: { store: true, gender: true } },
            },
        });
        if (!planning)
            throw new common_1.NotFoundException('Planning not found');
        return planning;
    }
    async create(dto, userId) {
        return this.prisma.$transaction(async (tx) => {
            const header = await tx.planningHeader.create({
                data: {
                    version: 1,
                    createdBy: userId,
                    isActive: true
                }
            });
            if (dto.collections && dto.collections.length > 0) {
                await tx.planningCollection.createMany({
                    data: dto.collections.map(d => ({
                        planningHeaderId: header.planningHeaderId,
                        storeId: d.storeId,
                        collectionId: d.collectionId,
                        actualBuyPct: d.actualBuyPct,
                        proposedBuyPct: d.proposedBuyPct,
                        otbProposedAmount: d.otbProposedAmount
                    }))
                });
            }
            if (dto.genders && dto.genders.length > 0) {
                await tx.planningGender.createMany({
                    data: dto.genders.map(d => ({
                        planningHeaderId: header.planningHeaderId,
                        storeId: d.storeId,
                        genderId: d.genderId,
                        actualBuyPct: d.actualBuyPct,
                        proposedBuyPct: d.proposedBuyPct,
                        otbProposedAmount: d.otbProposedAmount
                    }))
                });
            }
            return header;
        });
    }
    async update(id, dto, userId) {
        const planning = await this.prisma.planningHeader.findUnique({
            where: { planningHeaderId: id }
        });
        if (!planning)
            throw new common_1.NotFoundException('Planning not found');
        return this.prisma.$transaction(async (tx) => {
            if (dto.collections) {
                await tx.planningCollection.deleteMany({ where: { planningHeaderId: id } });
                if (dto.collections.length > 0) {
                    await tx.planningCollection.createMany({
                        data: dto.collections.map(d => ({
                            planningHeaderId: id,
                            storeId: d.storeId,
                            collectionId: d.collectionId,
                            actualBuyPct: d.actualBuyPct,
                            proposedBuyPct: d.proposedBuyPct,
                            otbProposedAmount: d.otbProposedAmount
                        }))
                    });
                }
            }
            if (dto.genders) {
                await tx.planningGender.deleteMany({ where: { planningHeaderId: id } });
                if (dto.genders.length > 0) {
                    await tx.planningGender.createMany({
                        data: dto.genders.map(d => ({
                            planningHeaderId: id,
                            storeId: d.storeId,
                            genderId: d.genderId,
                            actualBuyPct: d.actualBuyPct,
                            proposedBuyPct: d.proposedBuyPct,
                            otbProposedAmount: d.otbProposedAmount
                        }))
                    });
                }
            }
            return this.findOne(id);
        });
    }
    async remove(id) {
        const planning = await this.prisma.planningHeader.findUnique({ where: { planningHeaderId: id } });
        if (!planning)
            throw new common_1.NotFoundException('Planning not found');
        await this.prisma.planningCollection.deleteMany({ where: { planningHeaderId: id } });
        await this.prisma.planningGender.deleteMany({ where: { planningHeaderId: id } });
        return this.prisma.planningHeader.delete({ where: { planningHeaderId: id } });
    }
    async finalize(id) {
        const planning = await this.prisma.planningHeader.findUnique({ where: { planningHeaderId: id } });
        if (!planning)
            throw new common_1.NotFoundException('Planning not found');
        if (planning.planningStatus === 'FINAL') {
            throw new common_1.BadRequestException('Planning is already finalized');
        }
        return this.prisma.planningHeader.update({
            where: { planningHeaderId: id },
            data: { planningStatus: 'FINAL' }
        });
    }
};
exports.PlanningService = PlanningService;
exports.PlanningService = PlanningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlanningService);
//# sourceMappingURL=planning.service.js.map