import { PrismaService } from '../../prisma/prisma.service';
export interface RecommendationInput {
    budgetDetailId: string;
    category: string;
    subCategory?: string;
    budgetAmount: number;
    seasonGroup: string;
    fiscalYear: number;
    storeId?: string;
    brandId?: string;
    excludeSkuIds?: string[];
    maxResults?: number;
}
export interface SkuRecommendationItem {
    skuId: string;
    skuCode: string;
    productName: string;
    category: string;
    subCategory?: string;
    color?: string;
    theme?: string;
    srp: number;
    recommendedQty: number;
    recommendedValue: number;
    confidence: number;
    performanceScore: number;
    trendScore: number;
    assortmentScore: number;
    priceScore: number;
    overallScore: number;
    riskLevel: string;
    reasoning: string;
}
export interface RecommendationResult {
    budgetDetailId: string;
    category: string;
    subCategory?: string;
    budgetAmount: number;
    totalRecommendedValue: number;
    recommendations: SkuRecommendationItem[];
    assortmentSummary: {
        colorCoverage: number;
        priceTierCoverage: number;
        themeCoverage: number;
    };
    warnings: string[];
}
export declare class SkuRecommenderService {
    private prisma;
    private readonly logger;
    private readonly SCORE_WEIGHTS;
    private readonly PRICE_TIERS;
    constructor(prisma: PrismaService);
    generateRecommendations(input: RecommendationInput): Promise<RecommendationResult>;
    getRecommendations(budgetDetailId: string, category?: string): Promise<({
        sku: {
            id: string;
            isActive: boolean;
            skuCode: string;
            productName: string;
            productType: string;
            theme: string | null;
            color: string | null;
            composition: string | null;
            srp: import("src/generated/prisma/runtime/library").Decimal;
            brandId: string | null;
            seasonGroupId: string | null;
            imageUrl: string | null;
        };
    } & {
        id: string;
        category: string;
        subCategory: string | null;
        createdAt: Date;
        skuCode: string;
        productName: string;
        budgetDetailId: string;
        skuId: string;
        confidence: import("src/generated/prisma/runtime/library").Decimal;
        reasoning: string | null;
        overallScore: number;
        riskLevel: string;
        recommendedQty: number;
        recommendedValue: import("src/generated/prisma/runtime/library").Decimal;
        performanceScore: number;
        trendScore: number;
        assortmentScore: number;
        priceScore: number;
        isSelected: boolean;
        isRejected: boolean;
    })[]>;
    updateRecommendationStatus(recommendationId: string, status: 'selected' | 'rejected'): Promise<{
        id: string;
        category: string;
        subCategory: string | null;
        createdAt: Date;
        skuCode: string;
        productName: string;
        budgetDetailId: string;
        skuId: string;
        confidence: import("src/generated/prisma/runtime/library").Decimal;
        reasoning: string | null;
        overallScore: number;
        riskLevel: string;
        recommendedQty: number;
        recommendedValue: import("src/generated/prisma/runtime/library").Decimal;
        performanceScore: number;
        trendScore: number;
        assortmentScore: number;
        priceScore: number;
        isSelected: boolean;
        isRejected: boolean;
    }>;
    addSelectedToProposal(budgetDetailId: string, proposalId: string): Promise<number>;
    private getEligibleSkus;
    private getPerformanceMap;
    private getAttributeTrends;
    private analyzeAssortmentGaps;
    private calcPerformanceScore;
    private calcTrendScore;
    private calcAssortmentScore;
    private calcPriceScore;
    private calcRiskLevel;
    private selectWithinBudget;
    private assignQuantities;
    private buildReasoning;
    private saveRecommendations;
    private getPriceTier;
    private emptyResult;
}
