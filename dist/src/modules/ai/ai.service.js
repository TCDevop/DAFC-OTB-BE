"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AiService = AiService_1 = class AiService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AiService_1.name);
    }
    async calculateSizeCurve(category, storeId, totalOrderQty) {
        const history = await this.prisma.salesHistory.groupBy({
            by: ['sizeCode', 'season'],
            where: {
                storeId,
                skuCode: {
                    in: await this.getSkuCodesForCategory(category),
                },
            },
            _sum: { quantitySold: true, quantityBought: true },
            _avg: { sellThroughPct: true },
            orderBy: { season: 'desc' },
        });
        if (history.length === 0) {
            return this.getDefaultCurve(totalOrderQty);
        }
        const weights = [0.5, 0.3, 0.2];
        const seasons = [...new Set(history.map((h) => h.season))].slice(0, 3);
        const sizeMap = new Map();
        for (const row of history) {
            const seasonIdx = seasons.indexOf(row.season);
            if (seasonIdx < 0 || seasonIdx >= weights.length)
                continue;
            const weight = weights[seasonIdx];
            const bought = row._sum.quantityBought || 1;
            const sold = row._sum.quantitySold || 0;
            const sellPct = (sold / bought) * 100;
            const existing = sizeMap.get(row.sizeCode) || {
                totalWeight: 0,
                weightedPct: 0,
                seasons: 0,
            };
            existing.totalWeight += weight;
            existing.weightedPct += sellPct * weight;
            existing.seasons += 1;
            sizeMap.set(row.sizeCode, existing);
        }
        let totalPct = 0;
        const sizes = Array.from(sizeMap.entries()).map(([sizeCode, data]) => {
            const pct = data.weightedPct / data.totalWeight;
            totalPct += pct;
            return {
                sizeCode,
                rawPct: pct,
                confidence: Math.min(data.seasons / 3, 1),
                avgSellThrough: pct,
                seasonsUsed: data.seasons,
            };
        });
        const normalized = sizes.map((s) => ({
            ...s,
            pct: (s.rawPct / totalPct) * 100,
        }));
        const recommendations = normalized.map((s) => ({
            sizeCode: s.sizeCode,
            recommendedPct: Math.round(s.pct * 10) / 10,
            recommendedQty: Math.round(totalOrderQty * (s.pct / 100)),
            confidence: Math.round(s.confidence * 100) / 100,
            historicalAvg: Math.round(s.avgSellThrough * 10) / 10,
            reasoning: this.generateReasoning(s),
        }));
        const sumPct = recommendations.reduce((a, b) => a + b.recommendedPct, 0);
        if (Math.abs(sumPct - 100) > 0.1 && recommendations.length > 0) {
            const largest = recommendations.reduce((a, b) => a.recommendedPct > b.recommendedPct ? a : b);
            largest.recommendedPct += 100 - sumPct;
            largest.recommendedQty = Math.round(totalOrderQty * (largest.recommendedPct / 100));
        }
        return recommendations;
    }
    async compareSizeCurve(skuId, storeId, userSizing) {
        const sku = await this.prisma.skuCatalog.findUnique({
            where: { id: skuId },
        });
        if (!sku) {
            return {
                alignment: 'risk',
                score: 0,
                deviations: [],
                suggestion: 'SKU not found',
            };
        }
        const totalQty = Object.values(userSizing).reduce((a, b) => a + b, 0);
        if (totalQty === 0) {
            return {
                alignment: 'good',
                score: 100,
                deviations: [],
                suggestion: 'No sizing data to compare',
            };
        }
        const recommended = await this.calculateSizeCurve(sku.productType, storeId, totalQty);
        const deviations = recommended.map((rec) => {
            const userQty = userSizing[rec.sizeCode] || 0;
            const userPct = (userQty / totalQty) * 100;
            return {
                sizeCode: rec.sizeCode,
                userPct: Math.round(userPct * 10) / 10,
                recommendedPct: rec.recommendedPct,
                deviation: Math.round(Math.abs(userPct - rec.recommendedPct) * 10) / 10,
            };
        });
        const avgDeviation = deviations.reduce((sum, d) => sum + d.deviation, 0) /
            (deviations.length || 1);
        const score = Math.max(0, Math.round(100 - avgDeviation * 2));
        let alignment;
        let suggestion;
        if (avgDeviation <= 5) {
            alignment = 'good';
            suggestion = 'Size allocation aligns well with historical patterns';
        }
        else if (avgDeviation <= 15) {
            alignment = 'warning';
            const worst = deviations.reduce((a, b) => a.deviation > b.deviation ? a : b);
            suggestion = `Consider adjusting size ${worst.sizeCode}: you have ${worst.userPct.toFixed(0)}% vs recommended ${worst.recommendedPct.toFixed(0)}%`;
        }
        else {
            alignment = 'risk';
            suggestion =
                'Significant deviation from historical patterns. Review size allocation to avoid stockout/deadstock.';
        }
        return { alignment, score, deviations, suggestion };
    }
    async getSkuCodesForCategory(category) {
        const skus = await this.prisma.skuCatalog.findMany({
            where: { productType: category, isActive: true },
            select: { skuCode: true },
        });
        return skus.map((s) => s.skuCode);
    }
    getDefaultCurve(totalOrderQty) {
        const sizes = ['0002', '0004', '0006', '0008'];
        const pct = 100 / sizes.length;
        return sizes.map((sizeCode) => ({
            sizeCode,
            recommendedPct: pct,
            recommendedQty: Math.round(totalOrderQty / sizes.length),
            confidence: 0,
            historicalAvg: 0,
            reasoning: 'No historical data — using equal distribution',
        }));
    }
    generateReasoning(size) {
        if (size.confidence >= 0.8) {
            return `High confidence: Based on ${size.seasonsUsed} seasons, size ${size.sizeCode} averages ${size.avgSellThrough.toFixed(1)}% of sales`;
        }
        if (size.confidence >= 0.5) {
            return `Medium confidence: Based on ${size.seasonsUsed} season(s) data`;
        }
        return 'Low confidence: Limited historical data, using category average';
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AiService);
//# sourceMappingURL=ai.service.js.map