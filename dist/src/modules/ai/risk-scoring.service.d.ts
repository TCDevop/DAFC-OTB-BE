import { PrismaService } from '../../prisma/prisma.service';
export interface RiskFactor {
    name: string;
    score: number;
    weight: number;
    status: 'good' | 'warning' | 'risk';
    details: string;
    recommendation?: string;
}
export interface RiskAssessmentResult {
    entityType: string;
    entityId: string;
    overallScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    factors: RiskFactor[];
    warnings: string[];
    recommendation: string;
}
export declare class RiskScoringService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    assessProposal(proposalId: string): Promise<RiskAssessmentResult>;
    private assessBudgetAlignment;
    private assessSkuDiversity;
    private assessSizeCurve;
    private assessVendorConcentration;
    private assessCategoryBalance;
    private assessMarginImpact;
    getAssessment(entityType: string, entityId: string): Promise<{
        id: string;
        entityType: string;
        entityId: string;
        warnings: import("@prisma/client/runtime/library").JsonValue | null;
        factors: import("@prisma/client/runtime/library").JsonValue | null;
        overallScore: import("@prisma/client/runtime/library").Decimal;
        riskLevel: string;
        budgetAlignmentScore: import("@prisma/client/runtime/library").Decimal;
        skuDiversityScore: import("@prisma/client/runtime/library").Decimal;
        sizeCurveScore: import("@prisma/client/runtime/library").Decimal;
        vendorConcentrationScore: import("@prisma/client/runtime/library").Decimal;
        categoryBalanceScore: import("@prisma/client/runtime/library").Decimal;
        marginImpactScore: import("@prisma/client/runtime/library").Decimal;
        recommendation: string | null;
        calculatedAt: Date;
        calculatedBy: string | null;
        isStale: boolean;
    } | null>;
    markStale(entityType: string, entityId: string): Promise<void>;
    saveAssessment(result: RiskAssessmentResult): Promise<void>;
    private getRiskLevel;
    private generateRecommendation;
    private formatCurrency;
}
