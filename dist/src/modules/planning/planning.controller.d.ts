import { PlanningService } from './planning.service';
import { CreatePlanningDto, UpdatePlanningDto, UpdateDetailDto, ApprovalDecisionDto } from './dto/planning.dto';
export declare class PlanningController {
    private planningService;
    constructor(planningService: PlanningService);
    findAll(budgetDetailId?: string, budgetId?: string, status?: any, page?: number, pageSize?: number): Promise<{
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
                        colorConfig: import("@prisma/client/runtime/library").JsonValue | null;
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
                    totalBudget: import("@prisma/client/runtime/library").Decimal;
                    status: import(".prisma/client").$Enums.BudgetStatus;
                    comment: string | null;
                    groupBrandId: string;
                    createdById: string;
                };
            } & {
                id: string;
                budgetAmount: import("@prisma/client/runtime/library").Decimal;
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
            snapshotData: import("@prisma/client/runtime/library").JsonValue | null;
            budgetDetailId: string;
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
                lastSeasonSales: import("@prisma/client/runtime/library").Decimal;
                lastSeasonPct: import("@prisma/client/runtime/library").Decimal;
                systemBuyPct: import("@prisma/client/runtime/library").Decimal;
                userBuyPct: import("@prisma/client/runtime/library").Decimal;
                otbValue: import("@prisma/client/runtime/library").Decimal;
                variancePct: import("@prisma/client/runtime/library").Decimal;
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
                        colorConfig: import("@prisma/client/runtime/library").JsonValue | null;
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
                    totalBudget: import("@prisma/client/runtime/library").Decimal;
                    status: import(".prisma/client").$Enums.BudgetStatus;
                    comment: string | null;
                    groupBrandId: string;
                    createdById: string;
                };
            } & {
                id: string;
                budgetAmount: import("@prisma/client/runtime/library").Decimal;
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
            snapshotData: import("@prisma/client/runtime/library").JsonValue | null;
            budgetDetailId: string;
        };
    }>;
    create(dto: CreatePlanningDto, req: any): Promise<{
        success: boolean;
        data: {
            details: {
                id: string;
                genderId: string | null;
                categoryId: string | null;
                dimensionType: string;
                lastSeasonSales: import("@prisma/client/runtime/library").Decimal;
                lastSeasonPct: import("@prisma/client/runtime/library").Decimal;
                systemBuyPct: import("@prisma/client/runtime/library").Decimal;
                userBuyPct: import("@prisma/client/runtime/library").Decimal;
                otbValue: import("@prisma/client/runtime/library").Decimal;
                variancePct: import("@prisma/client/runtime/library").Decimal;
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
                    totalBudget: import("@prisma/client/runtime/library").Decimal;
                    status: import(".prisma/client").$Enums.BudgetStatus;
                    comment: string | null;
                    groupBrandId: string;
                    createdById: string;
                };
            } & {
                id: string;
                budgetAmount: import("@prisma/client/runtime/library").Decimal;
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
            snapshotData: import("@prisma/client/runtime/library").JsonValue | null;
            budgetDetailId: string;
        };
    }>;
    createFromVersion(id: string, req: any): Promise<{
        success: boolean;
        data: {
            details: {
                id: string;
                genderId: string | null;
                categoryId: string | null;
                dimensionType: string;
                lastSeasonSales: import("@prisma/client/runtime/library").Decimal;
                lastSeasonPct: import("@prisma/client/runtime/library").Decimal;
                systemBuyPct: import("@prisma/client/runtime/library").Decimal;
                userBuyPct: import("@prisma/client/runtime/library").Decimal;
                otbValue: import("@prisma/client/runtime/library").Decimal;
                variancePct: import("@prisma/client/runtime/library").Decimal;
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
                budgetAmount: import("@prisma/client/runtime/library").Decimal;
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
            snapshotData: import("@prisma/client/runtime/library").JsonValue | null;
            budgetDetailId: string;
        };
    }>;
    update(id: string, dto: UpdatePlanningDto, req: any): Promise<{
        success: boolean;
        data: {
            details: {
                id: string;
                genderId: string | null;
                categoryId: string | null;
                dimensionType: string;
                lastSeasonSales: import("@prisma/client/runtime/library").Decimal;
                lastSeasonPct: import("@prisma/client/runtime/library").Decimal;
                systemBuyPct: import("@prisma/client/runtime/library").Decimal;
                userBuyPct: import("@prisma/client/runtime/library").Decimal;
                otbValue: import("@prisma/client/runtime/library").Decimal;
                variancePct: import("@prisma/client/runtime/library").Decimal;
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
                    totalBudget: import("@prisma/client/runtime/library").Decimal;
                    status: import(".prisma/client").$Enums.BudgetStatus;
                    comment: string | null;
                    groupBrandId: string;
                    createdById: string;
                };
            } & {
                id: string;
                budgetAmount: import("@prisma/client/runtime/library").Decimal;
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
            snapshotData: import("@prisma/client/runtime/library").JsonValue | null;
            budgetDetailId: string;
        };
    }>;
    updateDetail(id: string, detailId: string, dto: UpdateDetailDto, req: any): Promise<{
        success: boolean;
        data: {
            id: string;
            genderId: string | null;
            categoryId: string | null;
            dimensionType: string;
            lastSeasonSales: import("@prisma/client/runtime/library").Decimal;
            lastSeasonPct: import("@prisma/client/runtime/library").Decimal;
            systemBuyPct: import("@prisma/client/runtime/library").Decimal;
            userBuyPct: import("@prisma/client/runtime/library").Decimal;
            otbValue: import("@prisma/client/runtime/library").Decimal;
            variancePct: import("@prisma/client/runtime/library").Decimal;
            userComment: string | null;
            planningVersionId: string;
            collectionId: string | null;
            subCategoryId: string | null;
        };
    }>;
    submit(id: string, req: any): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: import("@prisma/client/runtime/library").JsonValue | null;
            budgetDetailId: string;
        };
    }>;
    approveLevel1(id: string, dto: ApprovalDecisionDto, req: any): Promise<{
        success: boolean;
        data: {
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
                budgetAmount: import("@prisma/client/runtime/library").Decimal;
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
            snapshotData: import("@prisma/client/runtime/library").JsonValue | null;
            budgetDetailId: string;
        };
    }>;
    approveLevel2(id: string, dto: ApprovalDecisionDto, req: any): Promise<{
        success: boolean;
        data: {
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
                budgetAmount: import("@prisma/client/runtime/library").Decimal;
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
            snapshotData: import("@prisma/client/runtime/library").JsonValue | null;
            budgetDetailId: string;
        };
    }>;
    markAsFinal(id: string, req: any): Promise<{
        success: boolean;
        data: {
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
                budgetAmount: import("@prisma/client/runtime/library").Decimal;
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
            snapshotData: import("@prisma/client/runtime/library").JsonValue | null;
            budgetDetailId: string;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
