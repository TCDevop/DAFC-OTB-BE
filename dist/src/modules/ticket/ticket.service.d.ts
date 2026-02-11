import { PrismaService } from '../../prisma/prisma.service';
import { CreateTicketDto, ApprovalActionDto } from './dto/ticket.dto';
export declare class TicketService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateTicketDto): Promise<{
        createdAt: Date;
        budgetAllocateId: string;
        planningHeaderId: string | null;
        skuProposalHeaderId: string | null;
        createdBy: string;
        ticketId: string;
        ticketStatus: string;
    }>;
    findOne(id: string): Promise<{
        budgetAllocate: {
            storeId: string;
            seasonGroupId: string;
            seasonId: string;
            budgetAmount: import("@prisma/client/runtime/library").Decimal;
            budgetAllocateId: string;
            allocateHeaderId: string;
        };
        ticketApprovalLogs: ({
            approvalWorkflowLevel: {
                approvalWorkflowId: string;
                levelOrder: number;
                approvalWorkflowLevelId: string;
                levelName: string;
                approverUserId: string;
                isRequired: boolean;
            };
            approverUser: {
                userId: string;
                userName: string;
            };
        } & {
            createdAt: Date;
            comment: string | null;
            approvalWorkflowLevelId: string;
            approverUserId: string;
            ticketId: string;
            ticketApprovalLogId: string;
            isApproved: boolean;
            approvedAt: Date | null;
        })[];
        creator: {
            userId: string;
            userName: string;
        };
    } & {
        createdAt: Date;
        budgetAllocateId: string;
        planningHeaderId: string | null;
        skuProposalHeaderId: string | null;
        createdBy: string;
        ticketId: string;
        ticketStatus: string;
    }>;
    processApproval(id: string, userId: string, dto: ApprovalActionDto): Promise<{
        budgetAllocate: {
            storeId: string;
            seasonGroupId: string;
            seasonId: string;
            budgetAmount: import("@prisma/client/runtime/library").Decimal;
            budgetAllocateId: string;
            allocateHeaderId: string;
        };
        ticketApprovalLogs: ({
            approvalWorkflowLevel: {
                approvalWorkflowId: string;
                levelOrder: number;
                approvalWorkflowLevelId: string;
                levelName: string;
                approverUserId: string;
                isRequired: boolean;
            };
            approverUser: {
                userId: string;
                userName: string;
            };
        } & {
            createdAt: Date;
            comment: string | null;
            approvalWorkflowLevelId: string;
            approverUserId: string;
            ticketId: string;
            ticketApprovalLogId: string;
            isApproved: boolean;
            approvedAt: Date | null;
        })[];
        creator: {
            userId: string;
            userName: string;
        };
    } & {
        createdAt: Date;
        budgetAllocateId: string;
        planningHeaderId: string | null;
        skuProposalHeaderId: string | null;
        createdBy: string;
        ticketId: string;
        ticketStatus: string;
    }>;
}
