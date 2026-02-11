import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePlanningHeaderDto, UpdatePlanningDto } from './dto/planning.dto';
interface PlanningFilters {
    page?: number;
    pageSize?: number;
}
export declare class PlanningService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters: PlanningFilters): Promise<{
        data: ({
            creator: {
                userId: string;
                userEmail: string;
                userName: string;
            };
        } & {
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            planningHeaderId: string;
            version: number;
            planningStatus: string;
            createdBy: string;
        })[];
        meta: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        planningCollections: ({
            store: {
                isActive: boolean;
                createdAt: Date;
                storeId: string;
                storeCode: string;
                storeName: string;
                region: string | null;
                location: string | null;
            };
            collection: {
                isActive: boolean;
                collectionId: string;
                collectionName: string;
            };
        } & {
            storeId: string;
            collectionId: string;
            planningHeaderId: string;
            actualBuyPct: Prisma.Decimal;
            proposedBuyPct: Prisma.Decimal;
            otbProposedAmount: Prisma.Decimal;
            planningCollectionId: string;
            actualSalesPct: Prisma.Decimal;
            actualStPct: Prisma.Decimal;
            actualMoc: Prisma.Decimal;
            pctVarVsLast: Prisma.Decimal;
        })[];
        planningGenders: ({
            store: {
                isActive: boolean;
                createdAt: Date;
                storeId: string;
                storeCode: string;
                storeName: string;
                region: string | null;
                location: string | null;
            };
            gender: {
                isActive: boolean;
                genderId: string;
                genderName: string;
            };
        } & {
            storeId: string;
            genderId: string;
            planningHeaderId: string;
            actualBuyPct: Prisma.Decimal;
            proposedBuyPct: Prisma.Decimal;
            otbProposedAmount: Prisma.Decimal;
            actualSalesPct: Prisma.Decimal;
            actualStPct: Prisma.Decimal;
            pctVarVsLast: Prisma.Decimal;
            planningGenderId: string;
        })[];
        creator: {
            userId: string;
            userEmail: string;
            userName: string;
        };
    } & {
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        planningHeaderId: string;
        version: number;
        planningStatus: string;
        createdBy: string;
    }>;
    create(dto: CreatePlanningHeaderDto, userId: string): Promise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        planningHeaderId: string;
        version: number;
        planningStatus: string;
        createdBy: string;
    }>;
    update(id: string, dto: UpdatePlanningDto, userId: string): Promise<{
        planningCollections: ({
            store: {
                isActive: boolean;
                createdAt: Date;
                storeId: string;
                storeCode: string;
                storeName: string;
                region: string | null;
                location: string | null;
            };
            collection: {
                isActive: boolean;
                collectionId: string;
                collectionName: string;
            };
        } & {
            storeId: string;
            collectionId: string;
            planningHeaderId: string;
            actualBuyPct: Prisma.Decimal;
            proposedBuyPct: Prisma.Decimal;
            otbProposedAmount: Prisma.Decimal;
            planningCollectionId: string;
            actualSalesPct: Prisma.Decimal;
            actualStPct: Prisma.Decimal;
            actualMoc: Prisma.Decimal;
            pctVarVsLast: Prisma.Decimal;
        })[];
        planningGenders: ({
            store: {
                isActive: boolean;
                createdAt: Date;
                storeId: string;
                storeCode: string;
                storeName: string;
                region: string | null;
                location: string | null;
            };
            gender: {
                isActive: boolean;
                genderId: string;
                genderName: string;
            };
        } & {
            storeId: string;
            genderId: string;
            planningHeaderId: string;
            actualBuyPct: Prisma.Decimal;
            proposedBuyPct: Prisma.Decimal;
            otbProposedAmount: Prisma.Decimal;
            actualSalesPct: Prisma.Decimal;
            actualStPct: Prisma.Decimal;
            pctVarVsLast: Prisma.Decimal;
            planningGenderId: string;
        })[];
        creator: {
            userId: string;
            userEmail: string;
            userName: string;
        };
    } & {
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        planningHeaderId: string;
        version: number;
        planningStatus: string;
        createdBy: string;
    }>;
    remove(id: string): Promise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        planningHeaderId: string;
        version: number;
        planningStatus: string;
        createdBy: string;
    }>;
    finalize(id: string): Promise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        planningHeaderId: string;
        version: number;
        planningStatus: string;
        createdBy: string;
    }>;
}
export {};
