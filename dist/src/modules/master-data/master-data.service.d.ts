import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class MasterDataService {
    private prisma;
    constructor(prisma: PrismaService);
    getGroupBrands(): Promise<{
        isActive: boolean;
        createdAt: Date;
        groupBrandId: string;
        groupBrandCode: string;
        groupBrandName: string;
    }[]>;
    getBrands(): Promise<{
        isActive: boolean;
        createdAt: Date;
        groupBrandId: string;
        groupBrandCode: string;
        groupBrandName: string;
    }[]>;
    getStores(): Promise<{
        isActive: boolean;
        createdAt: Date;
        storeId: string;
        storeCode: string;
        storeName: string;
        region: string | null;
        location: string | null;
    }[]>;
    getCollections(): Promise<{
        isActive: boolean;
        collectionId: string;
        collectionName: string;
    }[]>;
    getGenders(): Promise<{
        isActive: boolean;
        genderId: string;
        genderName: string;
    }[]>;
    getCategories(): Promise<({
        categories: ({
            subCategories: {
                isActive: boolean;
                subCategoryId: string;
                subCategoryName: string;
                categoryId: string;
            }[];
        } & {
            isActive: boolean;
            genderId: string;
            categoryId: string;
            categoryName: string;
        })[];
    } & {
        isActive: boolean;
        genderId: string;
        genderName: string;
    })[]>;
    getSkuCatalog(filters?: {
        productType?: string;
        brandId?: string;
        search?: string;
        page?: number;
        pageSize?: number;
    }): Promise<{
        data: ({
            brand: {
                isActive: boolean;
                createdAt: Date;
                groupBrandId: string;
                brandId: string;
                brandCode: string;
                brandName: string;
            } | null;
            subCategory: {
                category: {
                    gender: {
                        isActive: boolean;
                        genderId: string;
                        genderName: string;
                    };
                } & {
                    isActive: boolean;
                    genderId: string;
                    categoryId: string;
                    categoryName: string;
                };
            } & {
                isActive: boolean;
                subCategoryId: string;
                subCategoryName: string;
                categoryId: string;
            };
        } & {
            isActive: boolean;
            createdAt: Date;
            subCategoryId: string;
            brandId: string | null;
            productName: string;
            skuCode: string;
            productId: string;
            theme: string | null;
            color: string | null;
            composition: string | null;
            srp: Prisma.Decimal;
            imageUrl: string | null;
        })[];
        meta: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    getSeasonConfig(): {
        seasonGroups: {
            id: string;
            name: string;
            subSeasons: string[];
        }[];
    };
}
