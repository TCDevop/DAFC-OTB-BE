import { ProposalService } from './proposal.service';
import { CreateSKUProposalHeaderDto, UpdateProposalDto } from './dto/proposal.dto';
export declare class ProposalController {
    private proposalService;
    constructor(proposalService: ProposalService);
    findAll(page?: number, pageSize?: number): Promise<{
        data: ({
            creator: {
                userId: string;
                userEmail: string;
                userName: string;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            skuProposalHeaderId: string;
            version: number;
            createdBy: string;
            proposalStatus: string;
        })[];
        meta: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
        success: boolean;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            skuProposals: ({
                product: {
                    isActive: boolean;
                    createdAt: Date;
                    subCategoryId: string;
                    brandId: string | null;
                    productName: string;
                    skuCode: string;
                    productId: string;
                    theme: string | null;
                    color: string | null;
                    composition: string | null;
                    srp: import("@prisma/client/runtime/library").Decimal;
                    imageUrl: string | null;
                };
                skuAllocates: ({
                    store: {
                        isActive: boolean;
                        createdAt: Date;
                        storeId: string;
                        storeCode: string;
                        storeName: string;
                        region: string | null;
                        location: string | null;
                    };
                } & {
                    storeId: string;
                    quantity: import("@prisma/client/runtime/library").Decimal;
                    skuProposalId: string;
                    skuAllocateId: string;
                })[];
                proposalSizings: {
                    subcategorySizeId: string;
                    sizingChoice: number;
                    proposalQuantity: number;
                    skuProposalId: string;
                    actualStPct: import("@prisma/client/runtime/library").Decimal;
                    proposalSizingId: string;
                    actualSalesmixPct: import("@prisma/client/runtime/library").Decimal;
                }[];
            } & {
                productId: string;
                srp: import("@prisma/client/runtime/library").Decimal;
                skuProposalHeaderId: string;
                customerTarget: string;
                unitCost: import("@prisma/client/runtime/library").Decimal;
                selectedSizingChoice: number;
                skuProposalId: string;
            })[];
            creator: {
                userId: string;
                userEmail: string;
                userName: string;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            skuProposalHeaderId: string;
            version: number;
            createdBy: string;
            proposalStatus: string;
        };
    }>;
    create(dto: CreateSKUProposalHeaderDto, req: any): Promise<{
        success: boolean;
        data: {
            createdAt: Date;
            updatedAt: Date;
            skuProposalHeaderId: string;
            version: number;
            createdBy: string;
            proposalStatus: string;
        };
    }>;
    update(id: string, dto: UpdateProposalDto, req: any): Promise<{
        success: boolean;
        data: {
            skuProposals: ({
                product: {
                    isActive: boolean;
                    createdAt: Date;
                    subCategoryId: string;
                    brandId: string | null;
                    productName: string;
                    skuCode: string;
                    productId: string;
                    theme: string | null;
                    color: string | null;
                    composition: string | null;
                    srp: import("@prisma/client/runtime/library").Decimal;
                    imageUrl: string | null;
                };
                skuAllocates: ({
                    store: {
                        isActive: boolean;
                        createdAt: Date;
                        storeId: string;
                        storeCode: string;
                        storeName: string;
                        region: string | null;
                        location: string | null;
                    };
                } & {
                    storeId: string;
                    quantity: import("@prisma/client/runtime/library").Decimal;
                    skuProposalId: string;
                    skuAllocateId: string;
                })[];
                proposalSizings: {
                    subcategorySizeId: string;
                    sizingChoice: number;
                    proposalQuantity: number;
                    skuProposalId: string;
                    actualStPct: import("@prisma/client/runtime/library").Decimal;
                    proposalSizingId: string;
                    actualSalesmixPct: import("@prisma/client/runtime/library").Decimal;
                }[];
            } & {
                productId: string;
                srp: import("@prisma/client/runtime/library").Decimal;
                skuProposalHeaderId: string;
                customerTarget: string;
                unitCost: import("@prisma/client/runtime/library").Decimal;
                selectedSizingChoice: number;
                skuProposalId: string;
            })[];
            creator: {
                userId: string;
                userEmail: string;
                userName: string;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            skuProposalHeaderId: string;
            version: number;
            createdBy: string;
            proposalStatus: string;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    finalize(id: string): Promise<{
        success: boolean;
        data: {
            createdAt: Date;
            updatedAt: Date;
            skuProposalHeaderId: string;
            version: number;
            createdBy: string;
            proposalStatus: string;
        };
        message: string;
    }>;
}
