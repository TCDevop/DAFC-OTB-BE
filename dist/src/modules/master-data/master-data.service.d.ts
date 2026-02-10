import { Prisma } from '../../generated/prisma';
import { PrismaService } from '../../prisma/prisma.service';
export declare class MasterDataService {
    private prisma;
    constructor(prisma: PrismaService);
    getBrands(): Promise<{
        id: string;
        code: string;
        name: string;
        isActive: boolean;
        groupId: string;
        colorConfig: Prisma.JsonValue | null;
        sortOrder: number;
    }[]>;
    getStores(): Promise<{
        id: string;
        code: string;
        name: string;
        region: string | null;
        isActive: boolean;
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
            skuCode: string;
            productName: string;
            productType: string;
            theme: string | null;
            color: string | null;
            composition: string | null;
            srp: Prisma.Decimal;
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
    }>;
    getSeasonConfig(): {
        seasonGroups: {
            id: string;
            name: string;
            subSeasons: string[];
        }[];
    };
}
