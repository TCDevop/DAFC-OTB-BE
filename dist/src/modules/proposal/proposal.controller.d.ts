import { ProposalService } from './proposal.service';
import { CreateProposalDto, UpdateProposalDto, AddProductDto, BulkAddProductsDto, UpdateProductDto, ApprovalDecisionDto } from './dto/proposal.dto';
export declare class ProposalController {
    private proposalService;
    constructor(proposalService: ProposalService);
    findAll(budgetId?: string, planningVersionId?: string, status?: any, page?: number, pageSize?: number): Promise<{
        data: ({
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
            status: import("src/generated/prisma").$Enums.ProposalStatus;
            createdById: string;
            budgetId: string;
            planningVersionId: string | null;
            ticketName: string;
            totalSkuCount: number;
            totalOrderQty: number;
            totalValue: import("src/generated/prisma/runtime/library").Decimal;
        })[];
        meta: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
        success: boolean;
    }>;
    getStatistics(budgetId?: string): Promise<{
        success: boolean;
        data: {
            total: number;
            byStatus: Record<string, number>;
            totals: {
                skuCount: number;
                orderQty: number;
                value: number | import("src/generated/prisma/runtime/library").Decimal;
            };
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
                action: import("src/generated/prisma").$Enums.ApprovalAction;
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
                srp: import("src/generated/prisma/runtime/library").Decimal;
                imageUrl: string | null;
                totalValue: import("src/generated/prisma/runtime/library").Decimal;
                skuId: string;
                orderQty: number;
                customerTarget: string | null;
                proposalId: string;
                unitCost: import("src/generated/prisma/runtime/library").Decimal;
            }[];
            createdBy: {
                id: string;
                email: string;
                name: string;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("src/generated/prisma").$Enums.ProposalStatus;
            createdById: string;
            budgetId: string;
            planningVersionId: string | null;
            ticketName: string;
            totalSkuCount: number;
            totalOrderQty: number;
            totalValue: import("src/generated/prisma/runtime/library").Decimal;
        };
    }>;
    create(dto: CreateProposalDto, req: any): Promise<{
        success: boolean;
        data: {
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
            planningVersion: {
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
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("src/generated/prisma").$Enums.ProposalStatus;
            createdById: string;
            budgetId: string;
            planningVersionId: string | null;
            ticketName: string;
            totalSkuCount: number;
            totalOrderQty: number;
            totalValue: import("src/generated/prisma/runtime/library").Decimal;
        };
    }>;
    update(id: string, dto: UpdateProposalDto, req: any): Promise<{
        success: boolean;
        data: {
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
            planningVersion: {
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
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("src/generated/prisma").$Enums.ProposalStatus;
            createdById: string;
            budgetId: string;
            planningVersionId: string | null;
            ticketName: string;
            totalSkuCount: number;
            totalOrderQty: number;
            totalValue: import("src/generated/prisma/runtime/library").Decimal;
        };
    }>;
    addProduct(id: string, dto: AddProductDto, req: any): Promise<{
        success: boolean;
        data: {
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
            srp: import("src/generated/prisma/runtime/library").Decimal;
            imageUrl: string | null;
            totalValue: import("src/generated/prisma/runtime/library").Decimal;
            skuId: string;
            orderQty: number;
            customerTarget: string | null;
            proposalId: string;
            unitCost: import("src/generated/prisma/runtime/library").Decimal;
        };
    }>;
    bulkAddProducts(id: string, dto: BulkAddProductsDto, req: any): Promise<{
        success: boolean;
        data: {
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
                    action: import("src/generated/prisma").$Enums.ApprovalAction;
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
                    srp: import("src/generated/prisma/runtime/library").Decimal;
                    imageUrl: string | null;
                    totalValue: import("src/generated/prisma/runtime/library").Decimal;
                    skuId: string;
                    orderQty: number;
                    customerTarget: string | null;
                    proposalId: string;
                    unitCost: import("src/generated/prisma/runtime/library").Decimal;
                }[];
                createdBy: {
                    id: string;
                    email: string;
                    name: string;
                };
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("src/generated/prisma").$Enums.ProposalStatus;
                createdById: string;
                budgetId: string;
                planningVersionId: string | null;
                ticketName: string;
                totalSkuCount: number;
                totalOrderQty: number;
                totalValue: import("src/generated/prisma/runtime/library").Decimal;
            };
        };
    }>;
    updateProduct(id: string, productId: string, dto: UpdateProductDto, req: any): Promise<{
        success: boolean;
        data: {
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
            srp: import("src/generated/prisma/runtime/library").Decimal;
            imageUrl: string | null;
            totalValue: import("src/generated/prisma/runtime/library").Decimal;
            skuId: string;
            orderQty: number;
            customerTarget: string | null;
            proposalId: string;
            unitCost: import("src/generated/prisma/runtime/library").Decimal;
        };
    }>;
    removeProduct(id: string, productId: string, req: any): Promise<{
        success: boolean;
        data: {
            message: string;
        };
    }>;
    submit(id: string, req: any): Promise<{
        success: boolean;
        data: {
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
            _count: {
                products: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("src/generated/prisma").$Enums.ProposalStatus;
            createdById: string;
            budgetId: string;
            planningVersionId: string | null;
            ticketName: string;
            totalSkuCount: number;
            totalOrderQty: number;
            totalValue: import("src/generated/prisma/runtime/library").Decimal;
        };
    }>;
    approveLevel1(id: string, dto: ApprovalDecisionDto, req: any): Promise<{
        success: boolean;
        data: {
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
            _count: {
                products: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("src/generated/prisma").$Enums.ProposalStatus;
            createdById: string;
            budgetId: string;
            planningVersionId: string | null;
            ticketName: string;
            totalSkuCount: number;
            totalOrderQty: number;
            totalValue: import("src/generated/prisma/runtime/library").Decimal;
        };
    }>;
    approveLevel2(id: string, dto: ApprovalDecisionDto, req: any): Promise<{
        success: boolean;
        data: {
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
            _count: {
                products: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("src/generated/prisma").$Enums.ProposalStatus;
            createdById: string;
            budgetId: string;
            planningVersionId: string | null;
            ticketName: string;
            totalSkuCount: number;
            totalOrderQty: number;
            totalValue: import("src/generated/prisma/runtime/library").Decimal;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
