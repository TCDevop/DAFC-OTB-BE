export declare class PlanningDetailDto {
    dimensionType: string;
    collectionId?: string;
    genderId?: string;
    categoryId?: string;
    subCategoryId?: string;
    lastSeasonSales: number;
    lastSeasonPct: number;
    systemBuyPct: number;
    userBuyPct: number;
    userComment?: string;
}
export declare class CreatePlanningDto {
    budgetDetailId: string;
    versionName?: string;
    details: PlanningDetailDto[];
}
export declare class UpdatePlanningDto {
    versionName?: string;
    details?: PlanningDetailDto[];
}
export declare class UpdateDetailDto {
    userBuyPct: number;
    userComment?: string;
}
export declare class ApprovalDecisionDto {
    action: 'APPROVED' | 'REJECTED';
    comment?: string;
}
