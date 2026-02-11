export declare class WorkflowLevelDto {
    levelOrder: number;
    levelName: string;
    approverUserId: string;
    isRequired: boolean;
}
export declare class CreateApprovalWorkflowDto {
    groupBrandId: string;
    workflowName: string;
    levels: WorkflowLevelDto[];
}
export declare class UpdateApprovalWorkflowDto {
    workflowName?: string;
    levels?: WorkflowLevelDto[];
}
