import { ApprovalWorkflowService } from './approval-workflow.service';
export declare class ApprovalWorkflowController {
    private service;
    constructor(service: ApprovalWorkflowService);
    findAll(brandId?: string): Promise<{
        success: boolean;
        data: ({
            user: {
                id: string;
                email: string;
                name: string;
            } | null;
            brand: {
                id: string;
                name: string;
                code: string;
            };
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            brandId: string;
            stepNumber: number;
            roleName: string;
            roleCode: string | null;
            userId: string | null;
        })[];
    }>;
    getAvailableRoles(): Promise<{
        success: boolean;
        data: {
            code: string;
            name: string;
        }[];
    }>;
    findByBrand(brandId: string): Promise<{
        success: boolean;
        data: ({
            user: {
                id: string;
                email: string;
                name: string;
            } | null;
            brand: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            brandId: string;
            stepNumber: number;
            roleName: string;
            roleCode: string | null;
            userId: string | null;
        })[];
    }>;
    create(body: {
        brandId: string;
        stepNumber: number;
        roleName: string;
        roleCode?: string;
        userId?: string;
        description?: string;
    }): Promise<{
        success: boolean;
        data: {
            user: {
                id: string;
                name: string;
            } | null;
            brand: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            brandId: string;
            stepNumber: number;
            roleName: string;
            roleCode: string | null;
            userId: string | null;
        };
        message: string;
    }>;
    update(id: string, body: {
        stepNumber?: number;
        roleName?: string;
        roleCode?: string;
        userId?: string;
        description?: string;
    }): Promise<{
        success: boolean;
        data: {
            user: {
                id: string;
                name: string;
            } | null;
            brand: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            brandId: string;
            stepNumber: number;
            roleName: string;
            roleCode: string | null;
            userId: string | null;
        };
        message: string;
    }>;
    delete(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    reorderSteps(brandId: string, stepIds: string[]): Promise<{
        success: boolean;
        data: ({
            user: {
                id: string;
                email: string;
                name: string;
            } | null;
            brand: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            brandId: string;
            stepNumber: number;
            roleName: string;
            roleCode: string | null;
            userId: string | null;
        })[];
    }>;
}
