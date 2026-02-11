import { PrismaService } from '../../prisma/prisma.service';
import { CreateApprovalWorkflowDto, UpdateApprovalWorkflowDto } from './dto/approval-workflow.dto';
export declare class ApprovalWorkflowService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(groupBrandId?: string): Promise<({
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
    })[]>;
    findOne(id: string): Promise<{
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
    }>;
    create(dto: CreateApprovalWorkflowDto): Promise<{
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
    }>;
    update(id: string, dto: UpdateApprovalWorkflowDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
        groupBrandId: string;
        approvalWorkflowId: string;
        workflowName: string;
    }>;
}
