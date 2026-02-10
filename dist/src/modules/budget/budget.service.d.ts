import { PrismaService } from '../../prisma/prisma.service';
import { BudgetStatus, Prisma } from '../../generated/prisma';
import { CreateBudgetDto, UpdateBudgetDto, ApprovalDecisionDto } from './dto/budget.dto';
interface BudgetFilters {
    fiscalYear?: number;
    groupBrandId?: string;
    seasonGroupId?: string;
    status?: BudgetStatus;
    page?: number;
    pageSize?: number;
}
export declare class BudgetService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters: BudgetFilters): Promise<{
        data: ({
            groupBrand: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                groupId: string;
                colorConfig: Prisma.JsonValue | null;
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
                budgetAmount: Prisma.Decimal;
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
            status: import("../../generated/prisma").$Enums.BudgetStatus;
            budgetCode: string;
            totalBudget: Prisma.Decimal;
            createdById: string;
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
        groupBrand: {
            id: string;
            name: string;
            isActive: boolean;
            code: string;
            groupId: string;
            colorConfig: Prisma.JsonValue | null;
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
            budgetAmount: Prisma.Decimal;
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
        status: import("../../generated/prisma").$Enums.BudgetStatus;
        budgetCode: string;
        totalBudget: Prisma.Decimal;
        createdById: string;
    }>;
    create(dto: CreateBudgetDto, userId: string): Promise<{
        groupBrand: {
            id: string;
            name: string;
            isActive: boolean;
            code: string;
            groupId: string;
            colorConfig: Prisma.JsonValue | null;
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
            budgetAmount: Prisma.Decimal;
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
        status: import("../../generated/prisma").$Enums.BudgetStatus;
        budgetCode: string;
        totalBudget: Prisma.Decimal;
        createdById: string;
    }>;
    update(id: string, dto: UpdateBudgetDto, userId: string): Promise<{
        groupBrand: {
            id: string;
            name: string;
            isActive: boolean;
            code: string;
            groupId: string;
            colorConfig: Prisma.JsonValue | null;
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
            budgetAmount: Prisma.Decimal;
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
        status: import("../../generated/prisma").$Enums.BudgetStatus;
        budgetCode: string;
        totalBudget: Prisma.Decimal;
        createdById: string;
    }>;
    submit(id: string, userId: string): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    approveLevel1(id: string, dto: ApprovalDecisionDto, userId: string): Promise<{
        groupBrand: {
            id: string;
            name: string;
            isActive: boolean;
            code: string;
            groupId: string;
            colorConfig: Prisma.JsonValue | null;
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
            budgetAmount: Prisma.Decimal;
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
        status: import("../../generated/prisma").$Enums.BudgetStatus;
        budgetCode: string;
        totalBudget: Prisma.Decimal;
        createdById: string;
    }>;
    approveLevel2(id: string, dto: ApprovalDecisionDto, userId: string): Promise<{
        groupBrand: {
            id: string;
            name: string;
            isActive: boolean;
            code: string;
            groupId: string;
            colorConfig: Prisma.JsonValue | null;
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
            budgetAmount: Prisma.Decimal;
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
        status: import("../../generated/prisma").$Enums.BudgetStatus;
        budgetCode: string;
        totalBudget: Prisma.Decimal;
        createdById: string;
    }>;
    getStatistics(fiscalYear?: number): Promise<{
        totalBudgets: number;
        totalAmount: number | Prisma.Decimal;
        approvedAmount: number | Prisma.Decimal;
        byStatus: Record<string, number>;
    }>;
}
export {};
