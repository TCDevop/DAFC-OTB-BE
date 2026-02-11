export declare class PlanningCollectionDto {
    storeId: string;
    collectionId: string;
    actualBuyPct: number;
    proposedBuyPct: number;
    otbProposedAmount: number;
}
export declare class PlanningGenderDto {
    storeId: string;
    genderId: string;
    actualBuyPct: number;
    proposedBuyPct: number;
    otbProposedAmount: number;
}
export declare class CreatePlanningHeaderDto {
    collections?: PlanningCollectionDto[];
    genders?: PlanningGenderDto[];
}
export declare class UpdatePlanningDto {
    collections?: PlanningCollectionDto[];
    genders?: PlanningGenderDto[];
}
