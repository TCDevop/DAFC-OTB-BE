import { BudgetService } from './budget.service';
import { CreateBudgetDto, UpdateBudgetDto, ApprovalDecisionDto } from './dto/budget.dto';
export declare class BudgetController {
    private budgetService;
    constructor(budgetService: BudgetService);
    findAll(fiscalYear?: number, brandId?: string, budgetName?: string, status?: any, page?: number, pageSize?: number): Promise<{
        data: ({
            brand: {
                isActive: boolean;
                createdAt: Date;
                groupBrandId: string;
                brandId: string;
                brandCode: string;
                brandName: string;
            };
            creator: {
                userId: string;
                userEmail: string;
                userName: string;
            };
            allocateHeaders: {
                createdAt: Date;
                updatedAt: Date;
                version: number;
                createdBy: string;
                allocateHeaderId: string;
                budgetId: string;
            }[];
        } & {
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            brandId: string;
            budgetAmount: import("@prisma/client/runtime/library").Decimal;
            budgetName: string;
            fiscalYear: number;
            createdBy: string;
            budgetId: string;
            budgetStatus: string;
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
            totalAmount: number | import("@prisma/client/runtime/library").Decimal;
            approvedAmount: number | import("@prisma/client/runtime/library").Decimal;
            byStatus: Record<string, number>;
        };
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            brand: {
                isActive: boolean;
                createdAt: Date;
                groupBrandId: string;
                brandId: string;
                brandCode: string;
                brandName: string;
            };
            creator: {
                userId: string;
                userEmail: string;
                userName: string;
            };
            allocateHeaders: ({
                budgetAllocates: ({
                    store: {
                        isActive: boolean;
                        createdAt: Date;
                        storeId: string;
                        storeCode: string;
                        storeName: string;
                        region: string | null;
                        location: string | null;
                    };
                    seasonGroup: {
                        isActive: boolean;
                        seasonGroupId: string;
                        seasonGroupName: string;
                    };
                    season: {
                        isActive: boolean;
                        seasonGroupId: string;
                        seasonId: string;
                        seasonName: string;
                    };
                } & {
                    storeId: string;
                    seasonGroupId: string;
                    seasonId: string;
                    budgetAmount: import("@prisma/client/runtime/library").Decimal;
                    budgetAllocateId: string;
                    allocateHeaderId: string;
                })[];
            } & {
                createdAt: Date;
                updatedAt: Date;
                version: number;
                createdBy: string;
                allocateHeaderId: string;
                budgetId: string;
            })[];
        } & {
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            brandId: string;
            budgetAmount: import("@prisma/client/runtime/library").Decimal;
            budgetName: string;
            fiscalYear: number;
            createdBy: string;
            budgetId: string;
            budgetStatus: string;
        };
    }>;
    create(dto: CreateBudgetDto, req: any): Promise<{
        success: boolean;
        data: {
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            brandId: string;
            budgetAmount: import("@prisma/client/runtime/library").Decimal;
            budgetName: string;
            fiscalYear: number;
            createdBy: string;
            budgetId: string;
            budgetStatus: string;
        };
    }>;
    update(id: string, dto: UpdateBudgetDto, req: any): Promise<{
        success: boolean;
        data: {
            brand: {
                isActive: boolean;
                createdAt: Date;
                groupBrandId: string;
                brandId: string;
                brandCode: string;
                brandName: string;
            };
            creator: {
                userId: string;
                userEmail: string;
                userName: string;
            };
            allocateHeaders: ({
                budgetAllocates: ({
                    store: {
                        isActive: boolean;
                        createdAt: Date;
                        storeId: string;
                        storeCode: string;
                        storeName: string;
                        region: string | null;
                        location: string | null;
                    };
                    seasonGroup: {
                        isActive: boolean;
                        seasonGroupId: string;
                        seasonGroupName: string;
                    };
                    season: {
                        isActive: boolean;
                        seasonGroupId: string;
                        seasonId: string;
                        seasonName: string;
                    };
                } & {
                    storeId: string;
                    seasonGroupId: string;
                    seasonId: string;
                    budgetAmount: import("@prisma/client/runtime/library").Decimal;
                    budgetAllocateId: string;
                    allocateHeaderId: string;
                })[];
            } & {
                createdAt: Date;
                updatedAt: Date;
                version: number;
                createdBy: string;
                allocateHeaderId: string;
                budgetId: string;
            })[];
        } & {
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            brandId: string;
            budgetAmount: import("@prisma/client/runtime/library").Decimal;
            budgetName: string;
            fiscalYear: number;
            createdBy: string;
            budgetId: string;
            budgetStatus: string;
        };
    }>;
    submit(id: string, req: any): Promise<{
        success: boolean;
        data: {
            allocateHeaders: ({
                budgetAllocates: {
                    storeId: string;
                    seasonGroupId: string;
                    seasonId: string;
                    budgetAmount: import("@prisma/client/runtime/library").Decimal;
                    budgetAllocateId: string;
                    allocateHeaderId: string;
                }[];
            } & {
                createdAt: Date;
                updatedAt: Date;
                version: number;
                createdBy: string;
                allocateHeaderId: string;
                budgetId: string;
            })[];
        } & {
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            brandId: string;
            budgetAmount: import("@prisma/client/runtime/library").Decimal;
            budgetName: string;
            fiscalYear: number;
            createdBy: string;
            budgetId: string;
            budgetStatus: string;
        };
    }>;
    approve(id: string, dto: ApprovalDecisionDto, req: any): Promise<{
        success: boolean;
        data: {
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            brandId: string;
            budgetAmount: import("@prisma/client/runtime/library").Decimal;
            budgetName: string;
            fiscalYear: number;
            createdBy: string;
            budgetId: string;
            budgetStatus: string;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
