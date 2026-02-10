export declare class CalculateSizeCurveDto {
    category: string;
    storeId: string;
    totalOrderQty: number;
}
export declare class CompareSizeCurveDto {
    skuId: string;
    storeId: string;
    userSizing: Record<string, number>;
}
export declare class GetAlertsQueryDto {
    budgetId?: string;
    unreadOnly?: string;
}
