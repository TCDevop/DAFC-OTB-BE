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
exports.MasterDataService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MasterDataService = class MasterDataService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getGroupBrands() {
        return this.prisma.groupBrand.findMany({
            where: { isActive: true },
        });
    }
    async getBrands() {
        return this.prisma.groupBrand.findMany({
            where: { isActive: true },
        });
    }
    async getStores() {
        return this.prisma.store.findMany({
            where: { isActive: true },
        });
    }
    async getCollections() {
        return this.prisma.collection.findMany({
            where: { isActive: true },
        });
    }
    async getGenders() {
        return this.prisma.gender.findMany({
            where: { isActive: true },
        });
    }
    async getCategories() {
        return this.prisma.gender.findMany({
            where: { isActive: true },
            include: {
                categories: {
                    where: { isActive: true },
                    include: {
                        subCategories: {
                            where: { isActive: true },
                        },
                    },
                },
            },
        });
    }
    async getSkuCatalog(filters) {
        const page = filters?.page || 1;
        const pageSize = filters?.pageSize || 50;
        const where = { isActive: true };
        if (filters?.productType) {
            where.subCategory = {
                subCategoryName: { contains: filters.productType }
            };
        }
        if (filters?.brandId)
            where.brandId = filters.brandId;
        if (filters?.search) {
            where.OR = [
                { skuCode: { contains: filters.search } },
                { productName: { contains: filters.search } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip: (Number(page) - 1) * Number(pageSize),
                take: Number(pageSize),
                orderBy: { skuCode: 'asc' },
                include: {
                    brand: true,
                    subCategory: {
                        include: { category: { include: { gender: true } } }
                    }
                }
            }),
            this.prisma.product.count({ where }),
        ]);
        return {
            data,
            meta: { page: Number(page), pageSize: Number(pageSize), total, totalPages: Math.ceil(total / Number(pageSize)) },
        };
    }
    getSeasonConfig() {
        return {
            seasonGroups: [
                { id: 'SS', name: 'Spring Summer', subSeasons: ['Pre', 'Main'] },
                { id: 'FW', name: 'Fall Winter', subSeasons: ['Pre', 'Main'] },
            ],
        };
    }
};
exports.MasterDataService = MasterDataService;
exports.MasterDataService = MasterDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MasterDataService);
//# sourceMappingURL=master-data.service.js.map