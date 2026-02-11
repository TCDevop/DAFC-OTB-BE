import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateSKUProposalHeaderDto, UpdateProposalDto } from './dto/proposal.dto';
interface ProposalFilters {
    page?: number;
    pageSize?: number;
}
export declare class ProposalService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters: ProposalFilters): Promise<{
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
    }>;
    findOne(id: string): Promise<{
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
                srp: Prisma.Decimal;
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
                quantity: Prisma.Decimal;
                skuProposalId: string;
                skuAllocateId: string;
            })[];
            proposalSizings: {
                subcategorySizeId: string;
                sizingChoice: number;
                proposalQuantity: number;
                skuProposalId: string;
                actualStPct: Prisma.Decimal;
                proposalSizingId: string;
                actualSalesmixPct: Prisma.Decimal;
            }[];
        } & {
            productId: string;
            srp: Prisma.Decimal;
            skuProposalHeaderId: string;
            customerTarget: string;
            unitCost: Prisma.Decimal;
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
    }>;
    create(dto: CreateSKUProposalHeaderDto, userId: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        skuProposalHeaderId: string;
        version: number;
        createdBy: string;
        proposalStatus: string;
    }>;
    update(id: string, dto: UpdateProposalDto, userId: string): Promise<{
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
                srp: Prisma.Decimal;
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
                quantity: Prisma.Decimal;
                skuProposalId: string;
                skuAllocateId: string;
            })[];
            proposalSizings: {
                subcategorySizeId: string;
                sizingChoice: number;
                proposalQuantity: number;
                skuProposalId: string;
                actualStPct: Prisma.Decimal;
                proposalSizingId: string;
                actualSalesmixPct: Prisma.Decimal;
            }[];
        } & {
            productId: string;
            srp: Prisma.Decimal;
            skuProposalHeaderId: string;
            customerTarget: string;
            unitCost: Prisma.Decimal;
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
    }>;
    remove(id: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        skuProposalHeaderId: string;
        version: number;
        createdBy: string;
        proposalStatus: string;
    }>;
    finalize(id: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        skuProposalHeaderId: string;
        version: number;
        createdBy: string;
        proposalStatus: string;
    }>;
}
export {};
