export declare class SKUAllocateDto {
    storeId: string;
    quantity: number;
}
export declare class ProposalSizingDto {
    subcategorySizeId: string;
    sizingChoice?: number;
    proposalQuantity: number;
}
export declare class SKUProposalDto {
    productId: string;
    customerTarget: string;
    unitCost: number;
    srp: number;
    selectedSizingChoice?: number;
    allocates: SKUAllocateDto[];
    sizings?: ProposalSizingDto[];
}
export declare class CreateSKUProposalHeaderDto {
    proposals: SKUProposalDto[];
}
export declare class UpdateProposalDto {
    proposals?: SKUProposalDto[];
}
export declare class ApprovalDecisionDto {
    action: string;
    comment?: string;
}
