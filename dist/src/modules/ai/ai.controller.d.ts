import { AiService } from './ai.service';
import { BudgetAlertsService } from './budget-alerts.service';
import { OtbAllocationService } from './otb-allocation.service';
import { RiskScoringService } from './risk-scoring.service';
import { SkuRecommenderService } from './sku-recommender.service';
import { CalculateSizeCurveDto, CompareSizeCurveDto, GetAlertsQueryDto } from './dto/ai.dto';
export declare class AiController {
    private readonly aiService;
    private readonly budgetAlertsService;
    private readonly otbAllocationService;
    private readonly riskScoringService;
    private readonly skuRecommenderService;
    constructor(aiService: AiService, budgetAlertsService: BudgetAlertsService, otbAllocationService: OtbAllocationService, riskScoringService: RiskScoringService, skuRecommenderService: SkuRecommenderService);
    getSizeCurve(category: string, storeId: string, totalOrderQty: string): Promise<{
        data: import("./ai.service").SizeRecommendation[];
    }>;
    calculateSizeCurve(dto: CalculateSizeCurveDto): Promise<{
        data: import("./ai.service").SizeRecommendation[];
    }>;
    compareSizeCurve(dto: CompareSizeCurveDto): Promise<{
        data: import("./ai.service").SizeCurveComparison;
    }>;
    getAlerts(query: GetAlertsQueryDto): Promise<{
        data: ({
            budget: {
                groupBrand: {
                    name: string;
                };
                budgetCode: string;
            };
        } & {
            category: string | null;
            id: string;
            createdAt: Date;
            title: string;
            budgetId: string;
            alertType: string;
            severity: string;
            message: string;
            metricValue: import("src/generated/prisma/runtime/library").Decimal;
            threshold: import("src/generated/prisma/runtime/library").Decimal;
            isRead: boolean;
            isDismissed: boolean;
        })[];
    }>;
    markAlertRead(id: string): Promise<{
        data: {
            category: string | null;
            id: string;
            createdAt: Date;
            title: string;
            budgetId: string;
            alertType: string;
            severity: string;
            message: string;
            metricValue: import("src/generated/prisma/runtime/library").Decimal;
            threshold: import("src/generated/prisma/runtime/library").Decimal;
            isRead: boolean;
            isDismissed: boolean;
        };
    }>;
    dismissAlert(id: string): Promise<{
        data: {
            category: string | null;
            id: string;
            createdAt: Date;
            title: string;
            budgetId: string;
            alertType: string;
            severity: string;
            message: string;
            metricValue: import("src/generated/prisma/runtime/library").Decimal;
            threshold: import("src/generated/prisma/runtime/library").Decimal;
            isRead: boolean;
            isDismissed: boolean;
        };
    }>;
    triggerAlertCheck(): Promise<{
        message: string;
    }>;
    generateAllocation(input: {
        budgetDetailId: string;
        budgetAmount: number;
        seasonGroup: string;
        seasonType: string;
        storeId: string;
        brandId?: string;
    }): Promise<{
        data: import("./otb-allocation.service").AllocationResult;
    }>;
    getRecommendations(budgetDetailId: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            budgetDetailId: string;
            dimensionType: string;
            dimensionValue: string;
            recommendedPct: import("src/generated/prisma/runtime/library").Decimal;
            recommendedAmt: import("src/generated/prisma/runtime/library").Decimal;
            confidence: import("src/generated/prisma/runtime/library").Decimal;
            reasoning: string | null;
            basedOnSeasons: number;
            factors: string | null;
            isApplied: boolean;
        }[];
    }>;
    applyRecommendations(budgetDetailId: string, dimensionType?: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            budgetDetailId: string;
            dimensionType: string;
            dimensionValue: string;
            recommendedPct: import("src/generated/prisma/runtime/library").Decimal;
            recommendedAmt: import("src/generated/prisma/runtime/library").Decimal;
            confidence: import("src/generated/prisma/runtime/library").Decimal;
            reasoning: string | null;
            basedOnSeasons: number;
            factors: string | null;
            isApplied: boolean;
        }[];
        message: string;
    }>;
    compareAllocation(input: {
        budgetDetailId: string;
        userAllocation: Array<{
            dimensionType: string;
            dimensionValue: string;
            pct: number;
        }>;
    }): Promise<{
        data: {
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
        };
    }>;
    assessRisk(entityType: string, entityId: string): Promise<{
        success: boolean;
        data: import("./risk-scoring.service").RiskAssessmentResult;
    }>;
    getRiskAssessment(entityType: string, entityId: string): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: {
            id: string;
            entityType: string;
            entityId: string;
            warnings: string | null;
            factors: string | null;
            overallScore: import("src/generated/prisma/runtime/library").Decimal;
            riskLevel: string;
            budgetAlignmentScore: import("src/generated/prisma/runtime/library").Decimal;
            skuDiversityScore: import("src/generated/prisma/runtime/library").Decimal;
            sizeCurveScore: import("src/generated/prisma/runtime/library").Decimal;
            vendorConcentrationScore: import("src/generated/prisma/runtime/library").Decimal;
            categoryBalanceScore: import("src/generated/prisma/runtime/library").Decimal;
            marginImpactScore: import("src/generated/prisma/runtime/library").Decimal;
            recommendation: string | null;
            calculatedAt: Date;
            calculatedBy: string | null;
            isStale: boolean;
        };
        message?: undefined;
    }>;
    refreshRiskAssessment(entityType: string, entityId: string): Promise<{
        success: boolean;
        data: import("./risk-scoring.service").RiskAssessmentResult;
        message: string;
    }>;
    generateSkuRecommendations(input: any): Promise<{
        success: boolean;
        data: import("./sku-recommender.service").RecommendationResult;
    }>;
    getSkuRecommendations(budgetDetailId: string, category?: string): Promise<{
        success: boolean;
        data: ({
            sku: {
                id: string;
                isActive: boolean;
                productType: string;
                brandId: string | null;
                productName: string;
                skuCode: string;
                theme: string | null;
                color: string | null;
                composition: string | null;
                srp: import("src/generated/prisma/runtime/library").Decimal;
                seasonGroupId: string | null;
                imageUrl: string | null;
            };
        } & {
            category: string;
            subCategory: string | null;
            id: string;
            createdAt: Date;
            productName: string;
            skuCode: string;
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
        })[];
    }>;
    updateRecommendationStatus(recommendationId: string, status: 'selected' | 'rejected'): Promise<{
        success: boolean;
        data: {
            category: string;
            subCategory: string | null;
            id: string;
            createdAt: Date;
            productName: string;
            skuCode: string;
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
        };
    }>;
    addSelectedToProposal(budgetDetailId: string, proposalId: string): Promise<{
        success: boolean;
        data: {
            addedCount: number;
        };
        message: string;
    }>;
}
