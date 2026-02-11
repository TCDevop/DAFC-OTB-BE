import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { BudgetStatus } from '../../common/enums';
import { CreateBudgetDto, UpdateBudgetDto, ApprovalDecisionDto } from './dto/budget.dto';
interface BudgetFilters {
    fiscalYear?: number;
    brandId?: string;
    budgetName?: string;
    status?: BudgetStatus;
    page?: number;
    pageSize?: number;
}
import { TicketService } from '../ticket/ticket.service';
export declare class BudgetService {
    private prisma;
    private ticketService;
    constructor(prisma: PrismaService, ticketService: TicketService);
    findAll(filters: BudgetFilters): Promise<{
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
            budgetAmount: Prisma.Decimal;
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
    }>;
    findOne(id: string): Promise<{
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
                budgetAmount: Prisma.Decimal;
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
        budgetAmount: Prisma.Decimal;
        budgetName: string;
        fiscalYear: number;
        createdBy: string;
        budgetId: string;
        budgetStatus: string;
    }>;
    create(dto: CreateBudgetDto, userId: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        brandId: string;
        budgetAmount: Prisma.Decimal;
        budgetName: string;
        fiscalYear: number;
        createdBy: string;
        budgetId: string;
        budgetStatus: string;
    }>;
    update(id: string, dto: UpdateBudgetDto, userId: string): Promise<{
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
                budgetAmount: Prisma.Decimal;
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
        budgetAmount: Prisma.Decimal;
        budgetName: string;
        fiscalYear: number;
        createdBy: string;
        budgetId: string;
        budgetStatus: string;
    }>;
    submit(id: string, userId: string): Promise<{
        allocateHeaders: ({
            budgetAllocates: {
                storeId: string;
                seasonGroupId: string;
                seasonId: string;
                budgetAmount: Prisma.Decimal;
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
        budgetAmount: Prisma.Decimal;
        budgetName: string;
        fiscalYear: number;
        createdBy: string;
        budgetId: string;
        budgetStatus: string;
    }>;
    remove(id: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        brandId: string;
        budgetAmount: Prisma.Decimal;
        budgetName: string;
        fiscalYear: number;
        createdBy: string;
        budgetId: string;
        budgetStatus: string;
    }>;
    approve(id: string, dto: ApprovalDecisionDto, userId: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        brandId: string;
        budgetAmount: Prisma.Decimal;
        budgetName: string;
        fiscalYear: number;
        createdBy: string;
        budgetId: string;
        budgetStatus: string;
    }>;
    getStatistics(fiscalYear?: number): Promise<{
        totalBudgets: number;
        totalAmount: number | Prisma.Decimal;
        approvedAmount: number | Prisma.Decimal;
        byStatus: Record<string, number>;
    }>;
}
export {};
