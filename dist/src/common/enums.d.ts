export declare const BudgetStatus: {
    readonly DRAFT: "DRAFT";
    readonly SUBMITTED: "SUBMITTED";
    readonly LEVEL1_APPROVED: "LEVEL1_APPROVED";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type BudgetStatus = (typeof BudgetStatus)[keyof typeof BudgetStatus];
export declare const PlanningStatus: {
    readonly DRAFT: "DRAFT";
    readonly SUBMITTED: "SUBMITTED";
    readonly LEVEL1_APPROVED: "LEVEL1_APPROVED";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type PlanningStatus = (typeof PlanningStatus)[keyof typeof PlanningStatus];
export declare const ProposalStatus: {
    readonly DRAFT: "DRAFT";
    readonly SUBMITTED: "SUBMITTED";
    readonly LEVEL1_APPROVED: "LEVEL1_APPROVED";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type ProposalStatus = (typeof ProposalStatus)[keyof typeof ProposalStatus];
export declare const ApprovalAction: {
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type ApprovalAction = (typeof ApprovalAction)[keyof typeof ApprovalAction];
