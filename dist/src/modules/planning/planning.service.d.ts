import { PrismaService } from '../../prisma/prisma.service';
import { PlanningStatus, Prisma } from '@prisma/client';
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
            _count: {
                details: number;
            };
            createdBy: {
                id: string;
                name: string;
                email: string;
            };
            budgetDetail: {
                store: {
                    id: string;
                    code: string;
                    name: string;
                    region: string | null;
                    isActive: boolean;
                };
                budget: {
                    groupBrand: {
                        id: string;
                        code: string;
                        name: string;
                        isActive: boolean;
                        groupId: string;
                        colorConfig: Prisma.JsonValue | null;
                        sortOrder: number;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    seasonGroupId: string;
                    budgetCode: string;
                    seasonType: string;
                    fiscalYear: number;
                    totalBudget: Prisma.Decimal;
                    status: import(".prisma/client").$Enums.BudgetStatus;
                    comment: string | null;
                    groupBrandId: string;
                    createdById: string;
                };
            } & {
                id: string;
                budgetAmount: Prisma.Decimal;
                budgetId: string;
                storeId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: Prisma.JsonValue | null;
            budgetDetailId: string;
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
            entityType: string;
            entityId: string;
            level: number;
            action: import(".prisma/client").$Enums.ApprovalAction;
            decidedAt: Date;
            deciderId: string;
        })[];
        createdBy: {
            id: string;
            name: string;
            email: string;
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
            lastSeasonSales: Prisma.Decimal;
            lastSeasonPct: Prisma.Decimal;
            systemBuyPct: Prisma.Decimal;
            userBuyPct: Prisma.Decimal;
            otbValue: Prisma.Decimal;
            variancePct: Prisma.Decimal;
            userComment: string | null;
            planningVersionId: string;
            collectionId: string | null;
            subCategoryId: string | null;
        })[];
        budgetDetail: {
            store: {
                id: string;
                code: string;
                name: string;
                region: string | null;
                isActive: boolean;
            };
            budget: {
                groupBrand: {
                    id: string;
                    code: string;
                    name: string;
                    isActive: boolean;
                    groupId: string;
                    colorConfig: Prisma.JsonValue | null;
                    sortOrder: number;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                seasonGroupId: string;
                budgetCode: string;
                seasonType: string;
                fiscalYear: number;
                totalBudget: Prisma.Decimal;
                status: import(".prisma/client").$Enums.BudgetStatus;
                comment: string | null;
                groupBrandId: string;
                createdById: string;
            };
        } & {
            id: string;
            budgetAmount: Prisma.Decimal;
            budgetId: string;
            storeId: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
        budgetDetailId: string;
    }>;
    create(dto: CreatePlanningDto, userId: string): Promise<{
        details: {
            id: string;
            genderId: string | null;
            categoryId: string | null;
            dimensionType: string;
            lastSeasonSales: Prisma.Decimal;
            lastSeasonPct: Prisma.Decimal;
            systemBuyPct: Prisma.Decimal;
            userBuyPct: Prisma.Decimal;
            otbValue: Prisma.Decimal;
            variancePct: Prisma.Decimal;
            userComment: string | null;
            planningVersionId: string;
            collectionId: string | null;
            subCategoryId: string | null;
        }[];
        budgetDetail: {
            store: {
                id: string;
                code: string;
                name: string;
                region: string | null;
                isActive: boolean;
            };
            budget: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                seasonGroupId: string;
                budgetCode: string;
                seasonType: string;
                fiscalYear: number;
                totalBudget: Prisma.Decimal;
                status: import(".prisma/client").$Enums.BudgetStatus;
                comment: string | null;
                groupBrandId: string;
                createdById: string;
            };
        } & {
            id: string;
            budgetAmount: Prisma.Decimal;
            budgetId: string;
            storeId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
        budgetDetailId: string;
    }>;
    update(id: string, dto: UpdatePlanningDto, userId: string): Promise<{
        details: {
            id: string;
            genderId: string | null;
            categoryId: string | null;
            dimensionType: string;
            lastSeasonSales: Prisma.Decimal;
            lastSeasonPct: Prisma.Decimal;
            systemBuyPct: Prisma.Decimal;
            userBuyPct: Prisma.Decimal;
            otbValue: Prisma.Decimal;
            variancePct: Prisma.Decimal;
            userComment: string | null;
            planningVersionId: string;
            collectionId: string | null;
            subCategoryId: string | null;
        }[];
        budgetDetail: {
            store: {
                id: string;
                code: string;
                name: string;
                region: string | null;
                isActive: boolean;
            };
            budget: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                seasonGroupId: string;
                budgetCode: string;
                seasonType: string;
                fiscalYear: number;
                totalBudget: Prisma.Decimal;
                status: import(".prisma/client").$Enums.BudgetStatus;
                comment: string | null;
                groupBrandId: string;
                createdById: string;
            };
        } & {
            id: string;
            budgetAmount: Prisma.Decimal;
            budgetId: string;
            storeId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
        budgetDetailId: string;
    }>;
    updateDetail(planningId: string, detailId: string, dto: UpdateDetailDto, userId: string): Promise<{
        id: string;
        genderId: string | null;
        categoryId: string | null;
        dimensionType: string;
        lastSeasonSales: Prisma.Decimal;
        lastSeasonPct: Prisma.Decimal;
        systemBuyPct: Prisma.Decimal;
        userBuyPct: Prisma.Decimal;
        otbValue: Prisma.Decimal;
        variancePct: Prisma.Decimal;
        userComment: string | null;
        planningVersionId: string;
        collectionId: string | null;
        subCategoryId: string | null;
    }>;
    submit(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
        budgetDetailId: string;
    }>;
    approveLevel1(id: string, dto: ApprovalDecisionDto, userId: string): Promise<{
        budgetDetail: {
            store: {
                id: string;
                code: string;
                name: string;
                region: string | null;
                isActive: boolean;
            };
        } & {
            id: string;
            budgetAmount: Prisma.Decimal;
            budgetId: string;
            storeId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
        budgetDetailId: string;
    }>;
    approveLevel2(id: string, dto: ApprovalDecisionDto, userId: string): Promise<{
        budgetDetail: {
            store: {
                id: string;
                code: string;
                name: string;
                region: string | null;
                isActive: boolean;
            };
        } & {
            id: string;
            budgetAmount: Prisma.Decimal;
            budgetId: string;
            storeId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
        budgetDetailId: string;
    }>;
    markAsFinal(id: string, userId: string): Promise<{
        budgetDetail: {
            store: {
                id: string;
                code: string;
                name: string;
                region: string | null;
                isActive: boolean;
            };
        } & {
            id: string;
            budgetAmount: Prisma.Decimal;
            budgetId: string;
            storeId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
        budgetDetailId: string;
    }>;
    createFromVersion(sourceId: string, userId: string): Promise<{
        details: {
            id: string;
            genderId: string | null;
            categoryId: string | null;
            dimensionType: string;
            lastSeasonSales: Prisma.Decimal;
            lastSeasonPct: Prisma.Decimal;
            systemBuyPct: Prisma.Decimal;
            userBuyPct: Prisma.Decimal;
            otbValue: Prisma.Decimal;
            variancePct: Prisma.Decimal;
            userComment: string | null;
            planningVersionId: string;
            collectionId: string | null;
            subCategoryId: string | null;
        }[];
        budgetDetail: {
            store: {
                id: string;
                code: string;
                name: string;
                region: string | null;
                isActive: boolean;
            };
        } & {
            id: string;
            budgetAmount: Prisma.Decimal;
            budgetId: string;
            storeId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
        budgetDetailId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PlanningStatus;
        createdById: string;
        planningCode: string;
        versionNumber: number;
        versionName: string | null;
        isFinal: boolean;
        snapshotData: Prisma.JsonValue | null;
        budgetDetailId: string;
    }>;
}
export {};
