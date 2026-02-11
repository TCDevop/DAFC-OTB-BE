export declare class BudgetAllocateDto {
    storeId: string;
    seasonGroupId: string;
    seasonId: string;
    budgetAmount: number;
}
export declare class CreateBudgetDto {
    budgetName: string;
    brandId: string;
    fiscalYear: number;
    budgetAmount: number;
    comment?: string;
    allocations: BudgetAllocateDto[];
}
export declare class UpdateBudgetDto {
    budgetName?: string;
    budgetAmount?: number;
    comment?: string;
    allocations?: BudgetAllocateDto[];
}
export declare class ApprovalDecisionDto {
    action: string;
    comment?: string;
}
