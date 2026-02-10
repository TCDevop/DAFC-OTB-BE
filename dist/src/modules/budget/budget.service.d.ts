import { PrismaService } from '../../prisma/prisma.service';
import { BudgetStatus, Prisma } from '@prisma/client';
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
                code: string;
                name: string;
                isActive: boolean;
                groupId: string;
                colorConfig: Prisma.JsonValue | null;
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
                budgetAmount: Prisma.Decimal;
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
            totalBudget: Prisma.Decimal;
            status: import(".prisma/client").$Enums.BudgetStatus;
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
        groupBrand: {
            id: string;
            code: string;
            name: string;
            isActive: boolean;
            groupId: string;
            colorConfig: Prisma.JsonValue | null;
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
            budgetAmount: Prisma.Decimal;
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
        totalBudget: Prisma.Decimal;
        status: import(".prisma/client").$Enums.BudgetStatus;
        comment: string | null;
        groupBrandId: string;
        createdById: string;
    }>;
    create(dto: CreateBudgetDto, userId: string): Promise<{
        groupBrand: {
            id: string;
            code: string;
            name: string;
            isActive: boolean;
            groupId: string;
            colorConfig: Prisma.JsonValue | null;
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
            budgetAmount: Prisma.Decimal;
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
        totalBudget: Prisma.Decimal;
        status: import(".prisma/client").$Enums.BudgetStatus;
        comment: string | null;
        groupBrandId: string;
        createdById: string;
    }>;
    update(id: string, dto: UpdateBudgetDto, userId: string): Promise<{
        groupBrand: {
            id: string;
            code: string;
            name: string;
            isActive: boolean;
            groupId: string;
            colorConfig: Prisma.JsonValue | null;
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
            budgetAmount: Prisma.Decimal;
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
        totalBudget: Prisma.Decimal;
        status: import(".prisma/client").$Enums.BudgetStatus;
        comment: string | null;
        groupBrandId: string;
        createdById: string;
    }>;
    submit(id: string, userId: string): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    approveLevel1(id: string, dto: ApprovalDecisionDto, userId: string): Promise<{
        groupBrand: {
            id: string;
            code: string;
            name: string;
            isActive: boolean;
            groupId: string;
            colorConfig: Prisma.JsonValue | null;
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
            budgetAmount: Prisma.Decimal;
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
        totalBudget: Prisma.Decimal;
        status: import(".prisma/client").$Enums.BudgetStatus;
        comment: string | null;
        groupBrandId: string;
        createdById: string;
    }>;
    approveLevel2(id: string, dto: ApprovalDecisionDto, userId: string): Promise<{
        groupBrand: {
            id: string;
            code: string;
            name: string;
            isActive: boolean;
            groupId: string;
            colorConfig: Prisma.JsonValue | null;
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
            budgetAmount: Prisma.Decimal;
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
        totalBudget: Prisma.Decimal;
        status: import(".prisma/client").$Enums.BudgetStatus;
        comment: string | null;
        groupBrandId: string;
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
