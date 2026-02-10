import { PlanningService } from './planning.service';
import { CreatePlanningDto, UpdatePlanningDto, UpdateDetailDto, ApprovalDecisionDto } from './dto/planning.dto';
export declare class PlanningController {
    private planningService;
    constructor(planningService: PlanningService);
    findAll(budgetDetailId?: string, budgetId?: string, status?: any, page?: number, pageSize?: number): Promise<{
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
                        colorConfig: import("src/generated/prisma/runtime/library").JsonValue | null;
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
                    status: import("src/generated/prisma").$Enums.BudgetStatus;
                    budgetCode: string;
                    totalBudget: import("src/generated/prisma/runtime/library").Decimal;
                    createdById: string;
                };
            } & {
                id: string;
                storeId: string;
                budgetAmount: import("src/generated/prisma/runtime/library").Decimal;
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
            status: import("src/generated/prisma").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            budgetDetailId: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: import("src/generated/prisma/runtime/library").JsonValue | null;
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
            approvals: ({
                decider: {
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                comment: string | null;
                action: import("src/generated/prisma").$Enums.ApprovalAction;
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
                        colorConfig: import("src/generated/prisma/runtime/library").JsonValue | null;
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
                    status: import("src/generated/prisma").$Enums.BudgetStatus;
                    budgetCode: string;
                    totalBudget: import("src/generated/prisma/runtime/library").Decimal;
                    createdById: string;
                };
            } & {
                id: string;
                storeId: string;
                budgetAmount: import("src/generated/prisma/runtime/library").Decimal;
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
                lastSeasonSales: import("src/generated/prisma/runtime/library").Decimal;
                lastSeasonPct: import("src/generated/prisma/runtime/library").Decimal;
                systemBuyPct: import("src/generated/prisma/runtime/library").Decimal;
                userBuyPct: import("src/generated/prisma/runtime/library").Decimal;
                userComment: string | null;
                planningVersionId: string;
                otbValue: import("src/generated/prisma/runtime/library").Decimal;
                variancePct: import("src/generated/prisma/runtime/library").Decimal;
            })[];
            createdBy: {
                id: string;
                email: string;
                name: string;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("src/generated/prisma").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            budgetDetailId: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: import("src/generated/prisma/runtime/library").JsonValue | null;
        };
    }>;
    create(dto: CreatePlanningDto, req: any): Promise<{
        success: boolean;
        data: {
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
                    status: import("src/generated/prisma").$Enums.BudgetStatus;
                    budgetCode: string;
                    totalBudget: import("src/generated/prisma/runtime/library").Decimal;
                    createdById: string;
                };
            } & {
                id: string;
                storeId: string;
                budgetAmount: import("src/generated/prisma/runtime/library").Decimal;
                budgetId: string;
            };
            details: {
                id: string;
                genderId: string | null;
                categoryId: string | null;
                dimensionType: string;
                collectionId: string | null;
                subCategoryId: string | null;
                lastSeasonSales: import("src/generated/prisma/runtime/library").Decimal;
                lastSeasonPct: import("src/generated/prisma/runtime/library").Decimal;
                systemBuyPct: import("src/generated/prisma/runtime/library").Decimal;
                userBuyPct: import("src/generated/prisma/runtime/library").Decimal;
                userComment: string | null;
                planningVersionId: string;
                otbValue: import("src/generated/prisma/runtime/library").Decimal;
                variancePct: import("src/generated/prisma/runtime/library").Decimal;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("src/generated/prisma").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            budgetDetailId: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: import("src/generated/prisma/runtime/library").JsonValue | null;
        };
    }>;
    createFromVersion(id: string, req: any): Promise<{
        success: boolean;
        data: {
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
                budgetAmount: import("src/generated/prisma/runtime/library").Decimal;
                budgetId: string;
            };
            details: {
                id: string;
                genderId: string | null;
                categoryId: string | null;
                dimensionType: string;
                collectionId: string | null;
                subCategoryId: string | null;
                lastSeasonSales: import("src/generated/prisma/runtime/library").Decimal;
                lastSeasonPct: import("src/generated/prisma/runtime/library").Decimal;
                systemBuyPct: import("src/generated/prisma/runtime/library").Decimal;
                userBuyPct: import("src/generated/prisma/runtime/library").Decimal;
                userComment: string | null;
                planningVersionId: string;
                otbValue: import("src/generated/prisma/runtime/library").Decimal;
                variancePct: import("src/generated/prisma/runtime/library").Decimal;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("src/generated/prisma").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            budgetDetailId: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: import("src/generated/prisma/runtime/library").JsonValue | null;
        };
    }>;
    update(id: string, dto: UpdatePlanningDto, req: any): Promise<{
        success: boolean;
        data: {
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
                    status: import("src/generated/prisma").$Enums.BudgetStatus;
                    budgetCode: string;
                    totalBudget: import("src/generated/prisma/runtime/library").Decimal;
                    createdById: string;
                };
            } & {
                id: string;
                storeId: string;
                budgetAmount: import("src/generated/prisma/runtime/library").Decimal;
                budgetId: string;
            };
            details: {
                id: string;
                genderId: string | null;
                categoryId: string | null;
                dimensionType: string;
                collectionId: string | null;
                subCategoryId: string | null;
                lastSeasonSales: import("src/generated/prisma/runtime/library").Decimal;
                lastSeasonPct: import("src/generated/prisma/runtime/library").Decimal;
                systemBuyPct: import("src/generated/prisma/runtime/library").Decimal;
                userBuyPct: import("src/generated/prisma/runtime/library").Decimal;
                userComment: string | null;
                planningVersionId: string;
                otbValue: import("src/generated/prisma/runtime/library").Decimal;
                variancePct: import("src/generated/prisma/runtime/library").Decimal;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("src/generated/prisma").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            budgetDetailId: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: import("src/generated/prisma/runtime/library").JsonValue | null;
        };
    }>;
    updateDetail(id: string, detailId: string, dto: UpdateDetailDto, req: any): Promise<{
        success: boolean;
        data: {
            id: string;
            genderId: string | null;
            categoryId: string | null;
            dimensionType: string;
            collectionId: string | null;
            subCategoryId: string | null;
            lastSeasonSales: import("src/generated/prisma/runtime/library").Decimal;
            lastSeasonPct: import("src/generated/prisma/runtime/library").Decimal;
            systemBuyPct: import("src/generated/prisma/runtime/library").Decimal;
            userBuyPct: import("src/generated/prisma/runtime/library").Decimal;
            userComment: string | null;
            planningVersionId: string;
            otbValue: import("src/generated/prisma/runtime/library").Decimal;
            variancePct: import("src/generated/prisma/runtime/library").Decimal;
        };
    }>;
    submit(id: string, req: any): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("src/generated/prisma").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            budgetDetailId: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: import("src/generated/prisma/runtime/library").JsonValue | null;
        };
    }>;
    approveLevel1(id: string, dto: ApprovalDecisionDto, req: any): Promise<{
        success: boolean;
        data: {
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
                budgetAmount: import("src/generated/prisma/runtime/library").Decimal;
                budgetId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("src/generated/prisma").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            budgetDetailId: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: import("src/generated/prisma/runtime/library").JsonValue | null;
        };
    }>;
    approveLevel2(id: string, dto: ApprovalDecisionDto, req: any): Promise<{
        success: boolean;
        data: {
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
                budgetAmount: import("src/generated/prisma/runtime/library").Decimal;
                budgetId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("src/generated/prisma").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            budgetDetailId: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: import("src/generated/prisma/runtime/library").JsonValue | null;
        };
    }>;
    markAsFinal(id: string, req: any): Promise<{
        success: boolean;
        data: {
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
                budgetAmount: import("src/generated/prisma/runtime/library").Decimal;
                budgetId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("src/generated/prisma").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            budgetDetailId: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: import("src/generated/prisma/runtime/library").JsonValue | null;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
