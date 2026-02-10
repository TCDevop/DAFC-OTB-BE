import { PrismaService } from '../../prisma/prisma.service';
import { ProposalStatus, Prisma } from '@prisma/client';
import { CreateProposalDto, UpdateProposalDto, AddProductDto, BulkAddProductsDto, UpdateProductDto, ApprovalDecisionDto } from './dto/proposal.dto';
interface ProposalFilters {
    budgetId?: string;
    planningVersionId?: string;
    status?: ProposalStatus;
    page?: number;
    pageSize?: number;
}
export declare class ProposalService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters: ProposalFilters): Promise<{
        data: ({
            _count: {
                products: number;
            };
            createdBy: {
                id: string;
                name: string;
                email: string;
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
            planningVersion: {
                id: string;
                planningCode: string;
                versionNumber: number;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProposalStatus;
            createdById: string;
            budgetId: string;
            planningVersionId: string | null;
            ticketName: string;
            totalSkuCount: number;
            totalOrderQty: number;
            totalValue: Prisma.Decimal;
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
        summary: {
            byCollection: Record<string, {
                qty: number;
                value: number;
                count: number;
            }>;
            byCategory: Record<string, {
                qty: number;
                value: number;
                count: number;
            }>;
        };
        products: {
            id: string;
            sortOrder: number;
            collection: string | null;
            gender: string | null;
            category: string | null;
            subCategory: string | null;
            skuCode: string;
            productName: string;
            theme: string | null;
            color: string | null;
            composition: string | null;
            srp: Prisma.Decimal;
            imageUrl: string | null;
            totalValue: Prisma.Decimal;
            unitCost: Prisma.Decimal;
            orderQty: number;
            customerTarget: string | null;
            proposalId: string;
            skuId: string;
        }[];
        createdBy: {
            id: string;
            name: string;
            email: string;
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
        planningVersion: ({
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
        }) | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProposalStatus;
        createdById: string;
        budgetId: string;
        planningVersionId: string | null;
        ticketName: string;
        totalSkuCount: number;
        totalOrderQty: number;
        totalValue: Prisma.Decimal;
    }>;
    create(dto: CreateProposalDto, userId: string): Promise<{
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
        planningVersion: {
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
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProposalStatus;
        createdById: string;
        budgetId: string;
        planningVersionId: string | null;
        ticketName: string;
        totalSkuCount: number;
        totalOrderQty: number;
        totalValue: Prisma.Decimal;
    }>;
    update(id: string, dto: UpdateProposalDto, userId: string): Promise<{
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
        planningVersion: {
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
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProposalStatus;
        createdById: string;
        budgetId: string;
        planningVersionId: string | null;
        ticketName: string;
        totalSkuCount: number;
        totalOrderQty: number;
        totalValue: Prisma.Decimal;
    }>;
    addProduct(proposalId: string, dto: AddProductDto, userId: string): Promise<{
        id: string;
        sortOrder: number;
        collection: string | null;
        gender: string | null;
        category: string | null;
        subCategory: string | null;
        skuCode: string;
        productName: string;
        theme: string | null;
        color: string | null;
        composition: string | null;
        srp: Prisma.Decimal;
        imageUrl: string | null;
        totalValue: Prisma.Decimal;
        unitCost: Prisma.Decimal;
        orderQty: number;
        customerTarget: string | null;
        proposalId: string;
        skuId: string;
    }>;
    bulkAddProducts(proposalId: string, dto: BulkAddProductsDto, userId: string): Promise<{
        results: {
            success: boolean;
            skuId: string;
            product?: any;
            error?: string;
        }[];
        proposal: {
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
            summary: {
                byCollection: Record<string, {
                    qty: number;
                    value: number;
                    count: number;
                }>;
                byCategory: Record<string, {
                    qty: number;
                    value: number;
                    count: number;
                }>;
            };
            products: {
                id: string;
                sortOrder: number;
                collection: string | null;
                gender: string | null;
                category: string | null;
                subCategory: string | null;
                skuCode: string;
                productName: string;
                theme: string | null;
                color: string | null;
                composition: string | null;
                srp: Prisma.Decimal;
                imageUrl: string | null;
                totalValue: Prisma.Decimal;
                unitCost: Prisma.Decimal;
                orderQty: number;
                customerTarget: string | null;
                proposalId: string;
                skuId: string;
            }[];
            createdBy: {
                id: string;
                name: string;
                email: string;
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
            planningVersion: ({
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
            }) | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProposalStatus;
            createdById: string;
            budgetId: string;
            planningVersionId: string | null;
            ticketName: string;
            totalSkuCount: number;
            totalOrderQty: number;
            totalValue: Prisma.Decimal;
        };
    }>;
    updateProduct(proposalId: string, productId: string, dto: UpdateProductDto, userId: string): Promise<{
        id: string;
        sortOrder: number;
        collection: string | null;
        gender: string | null;
        category: string | null;
        subCategory: string | null;
        skuCode: string;
        productName: string;
        theme: string | null;
        color: string | null;
        composition: string | null;
        srp: Prisma.Decimal;
        imageUrl: string | null;
        totalValue: Prisma.Decimal;
        unitCost: Prisma.Decimal;
        orderQty: number;
        customerTarget: string | null;
        proposalId: string;
        skuId: string;
    }>;
    removeProduct(proposalId: string, productId: string, userId: string): Promise<{
        message: string;
    }>;
    submit(id: string, userId: string): Promise<{
        _count: {
            products: number;
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
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProposalStatus;
        createdById: string;
        budgetId: string;
        planningVersionId: string | null;
        ticketName: string;
        totalSkuCount: number;
        totalOrderQty: number;
        totalValue: Prisma.Decimal;
    }>;
    approveLevel1(id: string, dto: ApprovalDecisionDto, userId: string): Promise<{
        _count: {
            products: number;
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
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProposalStatus;
        createdById: string;
        budgetId: string;
        planningVersionId: string | null;
        ticketName: string;
        totalSkuCount: number;
        totalOrderQty: number;
        totalValue: Prisma.Decimal;
    }>;
    approveLevel2(id: string, dto: ApprovalDecisionDto, userId: string): Promise<{
        _count: {
            products: number;
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
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProposalStatus;
        createdById: string;
        budgetId: string;
        planningVersionId: string | null;
        ticketName: string;
        totalSkuCount: number;
        totalOrderQty: number;
        totalValue: Prisma.Decimal;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProposalStatus;
        createdById: string;
        budgetId: string;
        planningVersionId: string | null;
        ticketName: string;
        totalSkuCount: number;
        totalOrderQty: number;
        totalValue: Prisma.Decimal;
    }>;
    getStatistics(budgetId?: string): Promise<{
        total: number;
        byStatus: Record<string, number>;
        totals: {
            skuCount: number;
            orderQty: number;
            value: number | Prisma.Decimal;
        };
    }>;
    private updateProposalTotals;
    private calculateSummary;
}
export {};
