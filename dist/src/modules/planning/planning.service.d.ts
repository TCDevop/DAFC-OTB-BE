import { PrismaService } from '../../prisma/prisma.service';
import { PlanningStatus, Prisma } from '../../generated/prisma';
import { CreatePlanningDto, UpdatePlanningDto, UpdateDetailDto, ApprovalDecisionDto } from './dto/planning.dto';
interface PlanningFilters {
    budgetDetailId?: string;
    budgetId?: string;
    status?: PlanningStatus;
    page?: number;
    pageSize?: number;
}
export declare class PlanningService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters: PlanningFilters): Promise<{
        data: ({
            budgetDetail: {
                store: {
                    id: string;
                    name: string;
                    isActive: boolean;
                    code: string;
                    region: string | null;
                };
                budget: {
                    groupBrand: {
                        id: string;
                        name: string;
                        isActive: boolean;
                        code: string;
                        groupId: string;
                        colorConfig: Prisma.JsonValue | null;
                        sortOrder: number;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    seasonGroupId: string;
                    groupBrandId: string;
                    seasonType: string;
                    fiscalYear: number;
                    comment: string | null;
                    status: import("../../generated/prisma").$Enums.BudgetStatus;
                    budgetCode: string;
                    totalBudget: Prisma.Decimal;
                    createdById: string;
                };
            } & {
                id: string;
                storeId: string;
                budgetAmount: Prisma.Decimal;
                budgetId: string;
            };
            _count: {
                details: number;
            };
            createdBy: {
                id: string;
                email: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            budgetDetailId: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: Prisma.JsonValue | null;
        })[];
        meta: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        approvals: ({
            decider: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            comment: string | null;
            action: import("../../generated/prisma").$Enums.ApprovalAction;
            entityType: string;
            entityId: string;
            level: number;
            deciderId: string;
            decidedAt: Date;
        })[];
        budgetDetail: {
            store: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                region: string | null;
            };
            budget: {
                groupBrand: {
                    id: string;
                    name: string;
                    isActive: boolean;
                    code: string;
                    groupId: string;
                    colorConfig: Prisma.JsonValue | null;
                    sortOrder: number;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                seasonGroupId: string;
                groupBrandId: string;
                seasonType: string;
                fiscalYear: number;
                comment: string | null;
                status: import("../../generated/prisma").$Enums.BudgetStatus;
                budgetCode: string;
                totalBudget: Prisma.Decimal;
                createdById: string;
            };
        } & {
            id: string;
            storeId: string;
            budgetAmount: Prisma.Decimal;
            budgetId: string;
        };
        details: ({
            collection: {
                id: string;
                name: string;
                isActive: boolean;
            } | null;
            gender: {
                id: string;
                name: string;
                isActive: boolean;
            } | null;
            category: {
                id: string;
                name: string;
                isActive: boolean;
                genderId: string;
            } | null;
            subCategory: {
                id: string;
                name: string;
                isActive: boolean;
                categoryId: string;
            } | null;
        } & {
            id: string;
            genderId: string | null;
            categoryId: string | null;
            dimensionType: string;
            collectionId: string | null;
            subCategoryId: string | null;
            lastSeasonSales: Prisma.Decimal;
            lastSeasonPct: Prisma.Decimal;
            systemBuyPct: Prisma.Decimal;
            userBuyPct: Prisma.Decimal;
            userComment: string | null;
            planningVersionId: string;
            otbValue: Prisma.Decimal;
            variancePct: Prisma.Decimal;
        })[];
        createdBy: {
            id: string;
            email: string;
            name: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        budgetDetailId: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
    }>;
    create(dto: CreatePlanningDto, userId: string): Promise<{
        budgetDetail: {
            store: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                region: string | null;
            };
            budget: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                seasonGroupId: string;
                groupBrandId: string;
                seasonType: string;
                fiscalYear: number;
                comment: string | null;
                status: import("../../generated/prisma").$Enums.BudgetStatus;
                budgetCode: string;
                totalBudget: Prisma.Decimal;
                createdById: string;
            };
        } & {
            id: string;
            storeId: string;
            budgetAmount: Prisma.Decimal;
            budgetId: string;
        };
        details: {
            id: string;
            genderId: string | null;
            categoryId: string | null;
            dimensionType: string;
            collectionId: string | null;
            subCategoryId: string | null;
            lastSeasonSales: Prisma.Decimal;
            lastSeasonPct: Prisma.Decimal;
            systemBuyPct: Prisma.Decimal;
            userBuyPct: Prisma.Decimal;
            userComment: string | null;
            planningVersionId: string;
            otbValue: Prisma.Decimal;
            variancePct: Prisma.Decimal;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        budgetDetailId: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
    }>;
    update(id: string, dto: UpdatePlanningDto, userId: string): Promise<{
        budgetDetail: {
            store: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                region: string | null;
            };
            budget: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                seasonGroupId: string;
                groupBrandId: string;
                seasonType: string;
                fiscalYear: number;
                comment: string | null;
                status: import("../../generated/prisma").$Enums.BudgetStatus;
                budgetCode: string;
                totalBudget: Prisma.Decimal;
                createdById: string;
            };
        } & {
            id: string;
            storeId: string;
            budgetAmount: Prisma.Decimal;
            budgetId: string;
        };
        details: {
            id: string;
            genderId: string | null;
            categoryId: string | null;
            dimensionType: string;
            collectionId: string | null;
            subCategoryId: string | null;
            lastSeasonSales: Prisma.Decimal;
            lastSeasonPct: Prisma.Decimal;
            systemBuyPct: Prisma.Decimal;
            userBuyPct: Prisma.Decimal;
            userComment: string | null;
            planningVersionId: string;
            otbValue: Prisma.Decimal;
            variancePct: Prisma.Decimal;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        budgetDetailId: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
    }>;
    updateDetail(planningId: string, detailId: string, dto: UpdateDetailDto, userId: string): Promise<{
        id: string;
        genderId: string | null;
        categoryId: string | null;
        dimensionType: string;
        collectionId: string | null;
        subCategoryId: string | null;
        lastSeasonSales: Prisma.Decimal;
        lastSeasonPct: Prisma.Decimal;
        systemBuyPct: Prisma.Decimal;
        userBuyPct: Prisma.Decimal;
        userComment: string | null;
        planningVersionId: string;
        otbValue: Prisma.Decimal;
        variancePct: Prisma.Decimal;
    }>;
    submit(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        budgetDetailId: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
    }>;
    approveLevel1(id: string, dto: ApprovalDecisionDto, userId: string): Promise<{
        budgetDetail: {
            store: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                region: string | null;
            };
        } & {
            id: string;
            storeId: string;
            budgetAmount: Prisma.Decimal;
            budgetId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        budgetDetailId: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
    }>;
    approveLevel2(id: string, dto: ApprovalDecisionDto, userId: string): Promise<{
        budgetDetail: {
            store: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                region: string | null;
            };
        } & {
            id: string;
            storeId: string;
            budgetAmount: Prisma.Decimal;
            budgetId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        budgetDetailId: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
    }>;
    markAsFinal(id: string, userId: string): Promise<{
        budgetDetail: {
            store: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                region: string | null;
            };
        } & {
            id: string;
            storeId: string;
            budgetAmount: Prisma.Decimal;
            budgetId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        budgetDetailId: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
    }>;
    createFromVersion(sourceId: string, userId: string): Promise<{
        budgetDetail: {
            store: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                region: string | null;
            };
        } & {
            id: string;
            storeId: string;
            budgetAmount: Prisma.Decimal;
            budgetId: string;
        };
        details: {
            id: string;
            genderId: string | null;
            categoryId: string | null;
            dimensionType: string;
            collectionId: string | null;
            subCategoryId: string | null;
            lastSeasonSales: Prisma.Decimal;
            lastSeasonPct: Prisma.Decimal;
            systemBuyPct: Prisma.Decimal;
            userBuyPct: Prisma.Decimal;
            userComment: string | null;
            planningVersionId: string;
            otbValue: Prisma.Decimal;
            variancePct: Prisma.Decimal;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        budgetDetailId: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        budgetDetailId: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
    }>;
}
export {};
