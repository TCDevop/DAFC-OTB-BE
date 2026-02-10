import { PrismaService } from '../../prisma/prisma.service';
export declare class ApprovalWorkflowService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(brandId?: string): Promise<({
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
    })[]>;
    findByBrand(brandId: string): Promise<({
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
    })[]>;
    create(data: {
        brandId: string;
        stepNumber: number;
        roleName: string;
        roleCode?: string;
        userId?: string;
        description?: string;
    }): Promise<{
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
    }>;
    update(id: string, data: {
        stepNumber?: number;
        roleName?: string;
        roleCode?: string;
        userId?: string;
        description?: string;
    }): Promise<{
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
    }>;
    delete(id: string): Promise<{
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
    }>;
    reorderSteps(brandId: string, stepIds: string[]): Promise<({
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
    })[]>;
    getAvailableRoles(): {
        code: string;
        name: string;
    }[];
}
