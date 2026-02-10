export declare class BudgetDetailDto {
    storeId: string;
    budgetAmount: number;
}
export declare class CreateBudgetDto {
    groupBrandId: string;
    seasonGroupId: string;
    seasonType: string;
    fiscalYear: number;
    comment?: string;
    details: BudgetDetailDto[];
}
export declare class UpdateBudgetDto {
    comment?: string;
    details?: BudgetDetailDto[];
}
export declare class ApprovalDecisionDto {
    action: 'APPROVED' | 'REJECTED';
    comment?: string;
}
