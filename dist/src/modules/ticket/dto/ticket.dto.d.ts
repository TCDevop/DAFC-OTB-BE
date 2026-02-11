import { ApprovalAction } from '../../../common/enums';
export declare class CreateTicketDto {
    budgetAllocateId: string;
    planningHeaderId?: string;
    skuProposalHeaderId?: string;
}
export declare class ApprovalActionDto {
    action: ApprovalAction;
    comment?: string;
}
