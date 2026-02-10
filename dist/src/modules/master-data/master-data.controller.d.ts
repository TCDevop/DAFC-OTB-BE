import { MasterDataService } from './master-data.service';
export declare class MasterDataController {
    private masterDataService;
    constructor(masterDataService: MasterDataService);
    getBrands(): Promise<{
        success: boolean;
        data: {
            id: string;
            code: string;
            name: string;
            isActive: boolean;
            groupId: string;
            colorConfig: import("@prisma/client/runtime/library").JsonValue | null;
            sortOrder: number;
        }[];
    }>;
    getStores(): Promise<{
        success: boolean;
        data: {
            id: string;
            code: string;
            name: string;
            region: string | null;
            isActive: boolean;
        }[];
    }>;
    getCollections(): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            isActive: boolean;
        }[];
    }>;
    getGenders(): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            isActive: boolean;
        }[];
    }>;
    getCategories(): Promise<{
        success: boolean;
        data: ({
            categories: ({
                subCategories: {
                    id: string;
                    name: string;
                    isActive: boolean;
                    categoryId: string;
                }[];
            } & {
                id: string;
                name: string;
                isActive: boolean;
                genderId: string;
            })[];
        } & {
            id: string;
            name: string;
            isActive: boolean;
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
        data: {
            id: string;
            isActive: boolean;
            skuCode: string;
            productName: string;
            productType: string;
            theme: string | null;
            color: string | null;
            composition: string | null;
            srp: import("@prisma/client/runtime/library").Decimal;
            brandId: string | null;
            seasonGroupId: string | null;
            imageUrl: string | null;
        }[];
        meta: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
        success: boolean;
    }>;
}
