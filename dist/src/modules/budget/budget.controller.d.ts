import { BudgetService } from './budget.service';
import { CreateBudgetDto, UpdateBudgetDto, ApprovalDecisionDto } from './dto/budget.dto';
export declare class BudgetController {
    private budgetService;
    constructor(budgetService: BudgetService);
    findAll(fiscalYear?: number, groupBrandId?: string, seasonGroupId?: string, status?: any, page?: number, pageSize?: number): Promise<{
        data: ({
            groupBrand: {
                id: string;
                code: string;
                name: string;
                isActive: boolean;
                groupId: string;
                colorConfig: import("src/generated/prisma/runtime/library").JsonValue | null;
                sortOrder: number;
            };
            createdBy: {
                id: string;
                name: string;
                email: string;
            };
            details: ({
                store: {
                    id: string;
                    code: string;
                    name: string;
                    region: string | null;
                    isActive: boolean;
                };
            } & {
                id: string;
                budgetAmount: import("src/generated/prisma/runtime/library").Decimal;
                budgetId: string;
                storeId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            seasonGroupId: string;
            budgetCode: string;
            seasonType: string;
            fiscalYear: number;
            totalBudget: import("src/generated/prisma/runtime/library").Decimal;
            status: import("src/generated/prisma").$Enums.BudgetStatus;
            comment: string | null;
            groupBrandId: string;
            createdById: string;
        })[];
        meta: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
        success: boolean;
    }>;
    getStatistics(fiscalYear?: number): Promise<{
        success: boolean;
        data: {
            totalBudgets: number;
            totalAmount: number | import("src/generated/prisma/runtime/library").Decimal;
            approvedAmount: number | import("src/generated/prisma/runtime/library").Decimal;
            byStatus: Record<string, number>;
        };
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
                action: import("src/generated/prisma").$Enums.ApprovalAction;
                decidedAt: Date;
                deciderId: string;
            })[];
            groupBrand: {
                id: string;
                code: string;
                name: string;
                isActive: boolean;
                groupId: string;
                colorConfig: import("src/generated/prisma/runtime/library").JsonValue | null;
                sortOrder: number;
            };
            createdBy: {
                id: string;
                name: string;
                email: string;
            };
            details: ({
                store: {
                    id: string;
                    code: string;
                    name: string;
                    region: string | null;
                    isActive: boolean;
                };
            } & {
                id: string;
                budgetAmount: import("src/generated/prisma/runtime/library").Decimal;
                budgetId: string;
                storeId: string;
            })[];
            id: string;
            createdAt: Date;
            updatedAt: Date;
            seasonGroupId: string;
            budgetCode: string;
            seasonType: string;
            fiscalYear: number;
            totalBudget: import("src/generated/prisma/runtime/library").Decimal;
            status: import("src/generated/prisma").$Enums.BudgetStatus;
            comment: string | null;
            groupBrandId: string;
            createdById: string;
        };
    }>;
    create(dto: CreateBudgetDto, req: any): Promise<{
        success: boolean;
        data: {
            groupBrand: {
                id: string;
                code: string;
                name: string;
                isActive: boolean;
                groupId: string;
                colorConfig: import("src/generated/prisma/runtime/library").JsonValue | null;
                sortOrder: number;
            };
            details: ({
                store: {
                    id: string;
                    code: string;
                    name: string;
                    region: string | null;
                    isActive: boolean;
                };
            } & {
                id: string;
                budgetAmount: import("src/generated/prisma/runtime/library").Decimal;
                budgetId: string;
                storeId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            seasonGroupId: string;
            budgetCode: string;
            seasonType: string;
            fiscalYear: number;
            totalBudget: import("src/generated/prisma/runtime/library").Decimal;
            status: import("src/generated/prisma").$Enums.BudgetStatus;
            comment: string | null;
            groupBrandId: string;
            createdById: string;
        };
    }>;
    update(id: string, dto: UpdateBudgetDto, req: any): Promise<{
        success: boolean;
        data: {
            groupBrand: {
                id: string;
                code: string;
                name: string;
                isActive: boolean;
                groupId: string;
                colorConfig: import("src/generated/prisma/runtime/library").JsonValue | null;
                sortOrder: number;
            };
            details: ({
                store: {
                    id: string;
                    code: string;
                    name: string;
                    region: string | null;
                    isActive: boolean;
                };
            } & {
                id: string;
                budgetAmount: import("src/generated/prisma/runtime/library").Decimal;
                budgetId: string;
                storeId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            seasonGroupId: string;
            budgetCode: string;
            seasonType: string;
            fiscalYear: number;
            totalBudget: import("src/generated/prisma/runtime/library").Decimal;
            status: import("src/generated/prisma").$Enums.BudgetStatus;
            comment: string | null;
            groupBrandId: string;
            createdById: string;
        };
    }>;
    submit(id: string, req: any): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            seasonGroupId: string;
            budgetCode: string;
            seasonType: string;
            fiscalYear: number;
            totalBudget: import("src/generated/prisma/runtime/library").Decimal;
            status: import("src/generated/prisma").$Enums.BudgetStatus;
            comment: string | null;
            groupBrandId: string;
            createdById: string;
        };
    }>;
    approveLevel1(id: string, dto: ApprovalDecisionDto, req: any): Promise<{
        success: boolean;
        data: {
            groupBrand: {
                id: string;
                code: string;
                name: string;
                isActive: boolean;
                groupId: string;
                colorConfig: import("src/generated/prisma/runtime/library").JsonValue | null;
                sortOrder: number;
            };
            details: ({
                store: {
                    id: string;
                    code: string;
                    name: string;
                    region: string | null;
                    isActive: boolean;
                };
            } & {
                id: string;
                budgetAmount: import("src/generated/prisma/runtime/library").Decimal;
                budgetId: string;
                storeId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            seasonGroupId: string;
            budgetCode: string;
            seasonType: string;
            fiscalYear: number;
            totalBudget: import("src/generated/prisma/runtime/library").Decimal;
            status: import("src/generated/prisma").$Enums.BudgetStatus;
            comment: string | null;
            groupBrandId: string;
            createdById: string;
        };
    }>;
    approveLevel2(id: string, dto: ApprovalDecisionDto, req: any): Promise<{
        success: boolean;
        data: {
            groupBrand: {
                id: string;
                code: string;
                name: string;
                isActive: boolean;
                groupId: string;
                colorConfig: import("src/generated/prisma/runtime/library").JsonValue | null;
                sortOrder: number;
            };
            details: ({
                store: {
                    id: string;
                    code: string;
                    name: string;
                    region: string | null;
                    isActive: boolean;
                };
            } & {
                id: string;
                budgetAmount: import("src/generated/prisma/runtime/library").Decimal;
                budgetId: string;
                storeId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            seasonGroupId: string;
            budgetCode: string;
            seasonType: string;
            fiscalYear: number;
            totalBudget: import("src/generated/prisma/runtime/library").Decimal;
            status: import("src/generated/prisma").$Enums.BudgetStatus;
            comment: string | null;
            groupBrandId: string;
            createdById: string;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
