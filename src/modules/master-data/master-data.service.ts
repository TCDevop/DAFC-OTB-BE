import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MasterDataService {
  constructor(private prisma: PrismaService) { }

  async getGroupBrands() {
    return this.prisma.groupBrand.findMany({
      where: { isActive: true },
    });
  }

  async getBrands() {
    return this.prisma.groupBrand.findMany({
      where: { isActive: true },
      // orderBy: { sortOrder: 'asc' }, // sortOrder removed in new schema or not present? Checked seed-rich, it didn't set sortOrder.
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

  async getSkuCatalog(filters?: {
    productType?: string;
    brandId?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }) {
    const page = filters?.page || 1;
    const pageSize = filters?.pageSize || 50;

    const where: Prisma.ProductWhereInput = { isActive: true };
    // if (filters?.productType) where.productType = filters.productType; // Product type logic changed to subCategory.
    // We might need to join/filter by subCategory name if 'productType' is passed as string
    if (filters?.productType) {
      where.subCategory = {
        subCategoryName: { contains: filters.productType }
      };
    }
    if (filters?.brandId) where.brandId = filters.brandId;
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

  // Season config (static — no DB table needed)
  getSeasonConfig() {
    return {
      seasonGroups: [
        { id: 'SS', name: 'Spring Summer', subSeasons: ['Pre', 'Main'] },
        { id: 'FW', name: 'Fall Winter', subSeasons: ['Pre', 'Main'] },
      ],
    };
  }
}
