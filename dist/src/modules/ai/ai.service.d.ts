import { PrismaService } from '../../prisma/prisma.service';
export interface SizeRecommendation {
    sizeCode: string;
    recommendedPct: number;
    recommendedQty: number;
    confidence: number;
    historicalAvg: number;
    reasoning: string;
}
export interface SizeCurveComparison {
    alignment: 'good' | 'warning' | 'risk';
    score: number;
    deviations: Array<{
        sizeCode: string;
        userPct: number;
        recommendedPct: number;
        deviation: number;
    }>;
    suggestion: string;
}
export declare class AiService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    calculateSizeCurve(category: string, storeId: string, totalOrderQty: number): Promise<SizeRecommendation[]>;
    compareSizeCurve(skuId: string, storeId: string, userSizing: Record<string, number>): Promise<SizeCurveComparison>;
    private getSkuCodesForCategory;
    private getDefaultCurve;
    private generateReasoning;
}
