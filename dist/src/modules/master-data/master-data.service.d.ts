import { Prisma } from '../../generated/prisma';
import { PrismaService } from '../../prisma/prisma.service';
export declare class MasterDataService {
    private prisma;
    constructor(prisma: PrismaService);
    getBrands(): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        code: string;
        groupId: string;
        colorConfig: Prisma.JsonValue | null;
        sortOrder: number;
    }[]>;
    getStores(): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        code: string;
        region: string | null;
    }[]>;
    getCollections(): Promise<{
        id: string;
        name: string;
        isActive: boolean;
    }[]>;
    getGenders(): Promise<{
        id: string;
        name: string;
        isActive: boolean;
    }[]>;
    getCategories(): Promise<({
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
    })[]>;
    getSkuCatalog(filters?: {
        productType?: string;
        brandId?: string;
        search?: string;
        page?: number;
        pageSize?: number;
    }): Promise<{
        data: {
            id: string;
            isActive: boolean;
            productType: string;
            brandId: string | null;
            productName: string;
            skuCode: string;
            theme: string | null;
            color: string | null;
            composition: string | null;
            srp: Prisma.Decimal;
            seasonGroupId: string | null;
            imageUrl: string | null;
        }[];
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
