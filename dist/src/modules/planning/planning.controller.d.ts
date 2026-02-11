import { PlanningService } from './planning.service';
import { CreatePlanningHeaderDto, UpdatePlanningDto } from './dto/planning.dto';
export declare class PlanningController {
    private planningService;
    constructor(planningService: PlanningService);
    findAll(page?: number, pageSize?: number): Promise<{
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
        success: boolean;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
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
                actualBuyPct: import("@prisma/client/runtime/library").Decimal;
                proposedBuyPct: import("@prisma/client/runtime/library").Decimal;
                otbProposedAmount: import("@prisma/client/runtime/library").Decimal;
                planningCollectionId: string;
                actualSalesPct: import("@prisma/client/runtime/library").Decimal;
                actualStPct: import("@prisma/client/runtime/library").Decimal;
                actualMoc: import("@prisma/client/runtime/library").Decimal;
                pctVarVsLast: import("@prisma/client/runtime/library").Decimal;
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
                actualBuyPct: import("@prisma/client/runtime/library").Decimal;
                proposedBuyPct: import("@prisma/client/runtime/library").Decimal;
                otbProposedAmount: import("@prisma/client/runtime/library").Decimal;
                actualSalesPct: import("@prisma/client/runtime/library").Decimal;
                actualStPct: import("@prisma/client/runtime/library").Decimal;
                pctVarVsLast: import("@prisma/client/runtime/library").Decimal;
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
        };
    }>;
    create(dto: CreatePlanningHeaderDto, req: any): Promise<{
        success: boolean;
        data: {
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            planningHeaderId: string;
            version: number;
            planningStatus: string;
            createdBy: string;
        };
    }>;
    update(id: string, dto: UpdatePlanningDto, req: any): Promise<{
        success: boolean;
        data: {
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
                actualBuyPct: import("@prisma/client/runtime/library").Decimal;
                proposedBuyPct: import("@prisma/client/runtime/library").Decimal;
                otbProposedAmount: import("@prisma/client/runtime/library").Decimal;
                planningCollectionId: string;
                actualSalesPct: import("@prisma/client/runtime/library").Decimal;
                actualStPct: import("@prisma/client/runtime/library").Decimal;
                actualMoc: import("@prisma/client/runtime/library").Decimal;
                pctVarVsLast: import("@prisma/client/runtime/library").Decimal;
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
                actualBuyPct: import("@prisma/client/runtime/library").Decimal;
                proposedBuyPct: import("@prisma/client/runtime/library").Decimal;
                otbProposedAmount: import("@prisma/client/runtime/library").Decimal;
                actualSalesPct: import("@prisma/client/runtime/library").Decimal;
                actualStPct: import("@prisma/client/runtime/library").Decimal;
                pctVarVsLast: import("@prisma/client/runtime/library").Decimal;
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
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    finalize(id: string): Promise<{
        success: boolean;
        data: {
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            planningHeaderId: string;
            version: number;
            planningStatus: string;
            createdBy: string;
        };
        message: string;
    }>;
}
