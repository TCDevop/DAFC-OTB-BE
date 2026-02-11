import { ApprovalWorkflowService } from './approval-workflow.service';
import { CreateApprovalWorkflowDto, UpdateApprovalWorkflowDto } from './dto/approval-workflow.dto';
export declare class ApprovalWorkflowController {
    private service;
    constructor(service: ApprovalWorkflowService);
    findAll(groupBrandId?: string): Promise<{
        success: boolean;
        data: ({
            groupBrand: {
                groupBrandId: string;
                groupBrandCode: string;
                groupBrandName: string;
            };
            approvalWorkflowLevels: ({
                approverUser: {
                    userId: string;
                    userEmail: string;
                    userName: string;
                };
            } & {
                approvalWorkflowId: string;
                levelOrder: number;
                approvalWorkflowLevelId: string;
                levelName: string;
                approverUserId: string;
                isRequired: boolean;
            })[];
        } & {
            groupBrandId: string;
            approvalWorkflowId: string;
            workflowName: string;
        })[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            groupBrand: {
                isActive: boolean;
                createdAt: Date;
                groupBrandId: string;
                groupBrandCode: string;
                groupBrandName: string;
            };
            approvalWorkflowLevels: ({
                approverUser: {
                    userId: string;
                    userEmail: string;
                    userName: string;
                };
            } & {
                approvalWorkflowId: string;
                levelOrder: number;
                approvalWorkflowLevelId: string;
                levelName: string;
                approverUserId: string;
                isRequired: boolean;
            })[];
        } & {
            groupBrandId: string;
            approvalWorkflowId: string;
            workflowName: string;
        };
    }>;
    create(dto: CreateApprovalWorkflowDto): Promise<{
        success: boolean;
        data: {
            approvalWorkflowLevels: {
                approvalWorkflowId: string;
                levelOrder: number;
                approvalWorkflowLevelId: string;
                levelName: string;
                approverUserId: string;
                isRequired: boolean;
            }[];
        } & {
            groupBrandId: string;
            approvalWorkflowId: string;
            workflowName: string;
        };
        message: string;
    }>;
    update(id: string, dto: UpdateApprovalWorkflowDto): Promise<{
        success: boolean;
        data: {
            groupBrand: {
                isActive: boolean;
                createdAt: Date;
                groupBrandId: string;
                groupBrandCode: string;
                groupBrandName: string;
            };
            approvalWorkflowLevels: ({
                approverUser: {
                    userId: string;
                    userEmail: string;
                    userName: string;
                };
            } & {
                approvalWorkflowId: string;
                levelOrder: number;
                approvalWorkflowLevelId: string;
                levelName: string;
                approverUserId: string;
                isRequired: boolean;
            })[];
        } & {
            groupBrandId: string;
            approvalWorkflowId: string;
            workflowName: string;
        };
        message: string;
    }>;
    delete(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
