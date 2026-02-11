import { BudgetService } from './budget.service';
import { CreateBudgetDto, UpdateBudgetDto, ApprovalDecisionDto } from './dto/budget.dto';
export declare class BudgetController {
    private budgetService;
    constructor(budgetService: BudgetService);
    findAll(fiscalYear?: number, groupBrandId?: string, seasonGroupId?: string, status?: any, page?: number, pageSize?: number): Promise<{
        data: ({
            groupBrand: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                groupId: string;
                colorConfig: string | null;
                sortOrder: number;
            };
            details: ({
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
            })[];
            createdBy: {
                id: string;
                email: string;
                name: string;
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
            status: string;
            budgetCode: string;
            totalBudget: import("src/generated/prisma/runtime/library").Decimal;
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
                action: string;
                entityType: string;
                entityId: string;
                level: number;
                deciderId: string;
                decidedAt: Date;
            })[];
            groupBrand: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                groupId: string;
                colorConfig: string | null;
                sortOrder: number;
            };
            details: ({
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
            })[];
            createdBy: {
                id: string;
                email: string;
                name: string;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            seasonGroupId: string;
            groupBrandId: string;
            seasonType: string;
            fiscalYear: number;
            comment: string | null;
            status: string;
            budgetCode: string;
            totalBudget: import("src/generated/prisma/runtime/library").Decimal;
            createdById: string;
        };
    }>;
    create(dto: CreateBudgetDto, req: any): Promise<{
        success: boolean;
        data: {
            groupBrand: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                groupId: string;
                colorConfig: string | null;
                sortOrder: number;
            };
            details: ({
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
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            seasonGroupId: string;
            groupBrandId: string;
            seasonType: string;
            fiscalYear: number;
            comment: string | null;
            status: string;
            budgetCode: string;
            totalBudget: import("src/generated/prisma/runtime/library").Decimal;
            createdById: string;
        };
    }>;
    update(id: string, dto: UpdateBudgetDto, req: any): Promise<{
        success: boolean;
        data: {
            groupBrand: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                groupId: string;
                colorConfig: string | null;
                sortOrder: number;
            };
            details: ({
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
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            seasonGroupId: string;
            groupBrandId: string;
            seasonType: string;
            fiscalYear: number;
            comment: string | null;
            status: string;
            budgetCode: string;
            totalBudget: import("src/generated/prisma/runtime/library").Decimal;
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
            groupBrandId: string;
            seasonType: string;
            fiscalYear: number;
            comment: string | null;
            status: string;
            budgetCode: string;
            totalBudget: import("src/generated/prisma/runtime/library").Decimal;
            createdById: string;
        };
    }>;
    approveLevel1(id: string, dto: ApprovalDecisionDto, req: any): Promise<{
        success: boolean;
        data: {
            groupBrand: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                groupId: string;
                colorConfig: string | null;
                sortOrder: number;
            };
            details: ({
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
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            seasonGroupId: string;
            groupBrandId: string;
            seasonType: string;
            fiscalYear: number;
            comment: string | null;
            status: string;
            budgetCode: string;
            totalBudget: import("src/generated/prisma/runtime/library").Decimal;
            createdById: string;
        };
    }>;
    approveLevel2(id: string, dto: ApprovalDecisionDto, req: any): Promise<{
        success: boolean;
        data: {
            groupBrand: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                groupId: string;
                colorConfig: string | null;
                sortOrder: number;
            };
            details: ({
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
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            seasonGroupId: string;
            groupBrandId: string;
            seasonType: string;
            fiscalYear: number;
            comment: string | null;
            status: string;
            budgetCode: string;
            totalBudget: import("src/generated/prisma/runtime/library").Decimal;
            createdById: string;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
