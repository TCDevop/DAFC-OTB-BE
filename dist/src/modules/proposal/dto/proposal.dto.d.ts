export declare class CreateProposalDto {
    ticketName: string;
    budgetId: string;
    planningVersionId?: string;
}
export declare class UpdateProposalDto {
    ticketName?: string;
    planningVersionId?: string;
}
export declare class AddProductDto {
    skuId: string;
    orderQty: number;
    customerTarget?: string;
}
export declare class BulkAddProductsDto {
    products: AddProductDto[];
}
export declare class UpdateProductDto {
    orderQty?: number;
    customerTarget?: string;
    sortOrder?: number;
}
export declare class ApprovalDecisionDto {
    action: 'APPROVED' | 'REJECTED';
    comment?: string;
}
