import { PrismaService } from '../../prisma/prisma.service';
export interface DimensionRecommendation {
    dimensionType: 'collection' | 'gender' | 'category';
    dimensionValue: string;
    recommendedPct: number;
    recommendedAmt: number;
    confidence: number;
    reasoning: string;
    factors: {
        historicalAvg: number;
        sellThroughScore: number;
        growthTrend: number;
        seasonalityFactor: number;
    };
}
export interface AllocationResult {
    budgetDetailId: string;
    budgetAmount: number;
    collections: DimensionRecommendation[];
    genders: DimensionRecommendation[];
    categories: DimensionRecommendation[];
    overallConfidence: number;
    dataQuality: 'high' | 'medium' | 'low';
    warnings: string[];
}
interface AllocationInput {
    budgetDetailId: string;
    budgetAmount: number;
    seasonGroup: string;
    seasonType: string;
    storeId: string;
    brandId?: string;
}
export declare class OtbAllocationService {
    private prisma;
    private readonly logger;
    private readonly FACTOR_WEIGHTS;
    constructor(prisma: PrismaService);
    generateAllocation(input: AllocationInput): Promise<AllocationResult>;
    getRecommendations(budgetDetailId: string): Promise<{
        id: string;
        createdAt: Date;
        budgetDetailId: string;
        dimensionType: string;
        dimensionValue: string;
        recommendedPct: import("@prisma/client/runtime/library").Decimal;
        recommendedAmt: import("@prisma/client/runtime/library").Decimal;
        confidence: import("@prisma/client/runtime/library").Decimal;
        reasoning: string | null;
        basedOnSeasons: number;
        factors: import("@prisma/client/runtime/library").JsonValue | null;
        isApplied: boolean;
    }[]>;
    applyRecommendations(budgetDetailId: string, dimensionType?: string): Promise<{
        id: string;
        createdAt: Date;
        budgetDetailId: string;
        dimensionType: string;
        dimensionValue: string;
        recommendedPct: import("@prisma/client/runtime/library").Decimal;
        recommendedAmt: import("@prisma/client/runtime/library").Decimal;
        confidence: import("@prisma/client/runtime/library").Decimal;
        reasoning: string | null;
        basedOnSeasons: number;
        factors: import("@prisma/client/runtime/library").JsonValue | null;
        isApplied: boolean;
    }[]>;
    compareAllocation(budgetDetailId: string, userAllocation: Array<{
        dimensionType: string;
        dimensionValue: string;
        pct: number;
    }>): Promise<{
        comparisons: {
            dimensionType: string;
            dimensionValue: string;
            userPct: number;
            aiPct: number | null;
            deviation: number;
            status: string;
        }[];
        alignmentScore: number;
        overallStatus: string;
        suggestion: string;
    }>;
    private fetchHistoricalData;
    private calcDimension;
    private calcFactors;
    private defaultPct;
    private getDimensionValues;
    private normalize;
    private genReasoning;
    private saveRecommendations;
}
export {};
