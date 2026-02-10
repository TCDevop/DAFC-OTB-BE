import { PrismaService } from '../../prisma/prisma.service';
import { ProposalStatus, Prisma } from '../../generated/prisma';
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
            budget: {
                groupBrand: {
                    id: string;
                    name: string;
                    isActive: boolean;
                    code: string;
                    groupId: string;
                    colorConfig: Prisma.JsonValue | null;
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
                status: import("../../generated/prisma").$Enums.BudgetStatus;
                budgetCode: string;
                totalBudget: Prisma.Decimal;
                createdById: string;
            };
            planningVersion: {
                id: string;
                planningCode: string;
                versionNumber: number;
            } | null;
            _count: {
                products: number;
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
            status: import("../../generated/prisma").$Enums.ProposalStatus;
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
            action: import("../../generated/prisma").$Enums.ApprovalAction;
            entityType: string;
            entityId: string;
            level: number;
            deciderId: string;
            decidedAt: Date;
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
        budget: {
            groupBrand: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                groupId: string;
                colorConfig: Prisma.JsonValue | null;
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
            status: import("../../generated/prisma").$Enums.BudgetStatus;
            budgetCode: string;
            totalBudget: Prisma.Decimal;
            createdById: string;
        };
        planningVersion: ({
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
                budgetAmount: Prisma.Decimal;
                budgetId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            budgetDetailId: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: Prisma.JsonValue | null;
        }) | null;
        products: {
            collection: string | null;
            gender: string | null;
            category: string | null;
            subCategory: string | null;
            id: string;
            sortOrder: number;
            productName: string;
            skuCode: string;
            theme: string | null;
            color: string | null;
            composition: string | null;
            srp: Prisma.Decimal;
            imageUrl: string | null;
            totalValue: Prisma.Decimal;
            skuId: string;
            orderQty: number;
            customerTarget: string | null;
            proposalId: string;
            unitCost: Prisma.Decimal;
        }[];
        createdBy: {
            id: string;
            email: string;
            name: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.ProposalStatus;
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
                name: string;
                isActive: boolean;
                code: string;
                groupId: string;
                colorConfig: Prisma.JsonValue | null;
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
            status: import("../../generated/prisma").$Enums.BudgetStatus;
            budgetCode: string;
            totalBudget: Prisma.Decimal;
            createdById: string;
        };
        planningVersion: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            budgetDetailId: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: Prisma.JsonValue | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.ProposalStatus;
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
                name: string;
                isActive: boolean;
                code: string;
                groupId: string;
                colorConfig: Prisma.JsonValue | null;
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
            status: import("../../generated/prisma").$Enums.BudgetStatus;
            budgetCode: string;
            totalBudget: Prisma.Decimal;
            createdById: string;
        };
        planningVersion: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma").$Enums.PlanningStatus;
            createdById: string;
            planningCode: string;
            budgetDetailId: string;
            versionNumber: number;
            versionName: string | null;
            isFinal: boolean;
            snapshotData: Prisma.JsonValue | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.ProposalStatus;
        createdById: string;
        budgetId: string;
        planningVersionId: string | null;
        ticketName: string;
        totalSkuCount: number;
        totalOrderQty: number;
        totalValue: Prisma.Decimal;
    }>;
    addProduct(proposalId: string, dto: AddProductDto, userId: string): Promise<{
        collection: string | null;
        gender: string | null;
        category: string | null;
        subCategory: string | null;
        id: string;
        sortOrder: number;
        productName: string;
        skuCode: string;
        theme: string | null;
        color: string | null;
        composition: string | null;
        srp: Prisma.Decimal;
        imageUrl: string | null;
        totalValue: Prisma.Decimal;
        skuId: string;
        orderQty: number;
        customerTarget: string | null;
        proposalId: string;
        unitCost: Prisma.Decimal;
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
                action: import("../../generated/prisma").$Enums.ApprovalAction;
                entityType: string;
                entityId: string;
                level: number;
                deciderId: string;
                decidedAt: Date;
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
            budget: {
                groupBrand: {
                    id: string;
                    name: string;
                    isActive: boolean;
                    code: string;
                    groupId: string;
                    colorConfig: Prisma.JsonValue | null;
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
                status: import("../../generated/prisma").$Enums.BudgetStatus;
                budgetCode: string;
                totalBudget: Prisma.Decimal;
                createdById: string;
            };
            planningVersion: ({
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
                    budgetAmount: Prisma.Decimal;
                    budgetId: string;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("../../generated/prisma").$Enums.PlanningStatus;
                createdById: string;
                planningCode: string;
                budgetDetailId: string;
                versionNumber: number;
                versionName: string | null;
                isFinal: boolean;
                snapshotData: Prisma.JsonValue | null;
            }) | null;
            products: {
                collection: string | null;
                gender: string | null;
                category: string | null;
                subCategory: string | null;
                id: string;
                sortOrder: number;
                productName: string;
                skuCode: string;
                theme: string | null;
                color: string | null;
                composition: string | null;
                srp: Prisma.Decimal;
                imageUrl: string | null;
                totalValue: Prisma.Decimal;
                skuId: string;
                orderQty: number;
                customerTarget: string | null;
                proposalId: string;
                unitCost: Prisma.Decimal;
            }[];
            createdBy: {
                id: string;
                email: string;
                name: string;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma").$Enums.ProposalStatus;
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
        collection: string | null;
        gender: string | null;
        category: string | null;
        subCategory: string | null;
        id: string;
        sortOrder: number;
        productName: string;
        skuCode: string;
        theme: string | null;
        color: string | null;
        composition: string | null;
        srp: Prisma.Decimal;
        imageUrl: string | null;
        totalValue: Prisma.Decimal;
        skuId: string;
        orderQty: number;
        customerTarget: string | null;
        proposalId: string;
        unitCost: Prisma.Decimal;
    }>;
    removeProduct(proposalId: string, productId: string, userId: string): Promise<{
        message: string;
    }>;
    submit(id: string, userId: string): Promise<{
        budget: {
            groupBrand: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                groupId: string;
                colorConfig: Prisma.JsonValue | null;
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
            status: import("../../generated/prisma").$Enums.BudgetStatus;
            budgetCode: string;
            totalBudget: Prisma.Decimal;
            createdById: string;
        };
        _count: {
            products: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.ProposalStatus;
        createdById: string;
        budgetId: string;
        planningVersionId: string | null;
        ticketName: string;
        totalSkuCount: number;
        totalOrderQty: number;
        totalValue: Prisma.Decimal;
    }>;
    approveLevel1(id: string, dto: ApprovalDecisionDto, userId: string): Promise<{
        budget: {
            groupBrand: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                groupId: string;
                colorConfig: Prisma.JsonValue | null;
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
            status: import("../../generated/prisma").$Enums.BudgetStatus;
            budgetCode: string;
            totalBudget: Prisma.Decimal;
            createdById: string;
        };
        _count: {
            products: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.ProposalStatus;
        createdById: string;
        budgetId: string;
        planningVersionId: string | null;
        ticketName: string;
        totalSkuCount: number;
        totalOrderQty: number;
        totalValue: Prisma.Decimal;
    }>;
    approveLevel2(id: string, dto: ApprovalDecisionDto, userId: string): Promise<{
        budget: {
            groupBrand: {
                id: string;
                name: string;
                isActive: boolean;
                code: string;
                groupId: string;
                colorConfig: Prisma.JsonValue | null;
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
            status: import("../../generated/prisma").$Enums.BudgetStatus;
            budgetCode: string;
            totalBudget: Prisma.Decimal;
            createdById: string;
        };
        _count: {
            products: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma").$Enums.ProposalStatus;
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
        status: import("../../generated/prisma").$Enums.ProposalStatus;
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
