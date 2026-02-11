import { MasterDataService } from './master-data.service';
export declare class MasterDataController {
    private masterDataService;
    constructor(masterDataService: MasterDataService);
    getGroupBrands(): Promise<{
        success: boolean;
        data: {
            isActive: boolean;
            createdAt: Date;
            groupBrandId: string;
            groupBrandCode: string;
            groupBrandName: string;
        }[];
    }>;
    getBrands(): Promise<{
        success: boolean;
        data: {
            isActive: boolean;
            createdAt: Date;
            groupBrandId: string;
            groupBrandCode: string;
            groupBrandName: string;
        }[];
    }>;
    getStores(): Promise<{
        success: boolean;
        data: {
            isActive: boolean;
            createdAt: Date;
            storeId: string;
            storeCode: string;
            storeName: string;
            region: string | null;
            location: string | null;
        }[];
    }>;
    getCollections(): Promise<{
        success: boolean;
        data: {
            isActive: boolean;
            collectionId: string;
            collectionName: string;
        }[];
    }>;
    getGenders(): Promise<{
        success: boolean;
        data: {
            isActive: boolean;
            genderId: string;
            genderName: string;
        }[];
    }>;
    getCategories(): Promise<{
        success: boolean;
        data: ({
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
        })[];
    }>;
    getSeasons(): Promise<{
        success: boolean;
        data: {
            seasonGroups: {
                id: string;
                name: string;
                subSeasons: string[];
            }[];
        };
    }>;
    getSkuCatalog(productType?: string, brandId?: string, search?: string, page?: number, pageSize?: number): Promise<{
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
            srp: import("@prisma/client/runtime/library").Decimal;
            imageUrl: string | null;
        })[];
        meta: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
        success: boolean;
    }>;
}
