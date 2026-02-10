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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const ai_service_1 = require("./ai.service");
const budget_alerts_service_1 = require("./budget-alerts.service");
const otb_allocation_service_1 = require("./otb-allocation.service");
const risk_scoring_service_1 = require("./risk-scoring.service");
const sku_recommender_service_1 = require("./sku-recommender.service");
const ai_dto_1 = require("./dto/ai.dto");
let AiController = class AiController {
    constructor(aiService, budgetAlertsService, otbAllocationService, riskScoringService, skuRecommenderService) {
        this.aiService = aiService;
        this.budgetAlertsService = budgetAlertsService;
        this.otbAllocationService = otbAllocationService;
        this.riskScoringService = riskScoringService;
        this.skuRecommenderService = skuRecommenderService;
    }
    async getSizeCurve(category, storeId, totalOrderQty) {
        const qty = parseInt(totalOrderQty, 10) || 100;
        const data = await this.aiService.calculateSizeCurve(category, storeId, qty);
        return { data };
    }
    async calculateSizeCurve(dto) {
        const data = await this.aiService.calculateSizeCurve(dto.category, dto.storeId, dto.totalOrderQty);
        return { data };
    }
    async compareSizeCurve(dto) {
        const data = await this.aiService.compareSizeCurve(dto.skuId, dto.storeId, dto.userSizing);
        return { data };
    }
    async getAlerts(query) {
        const data = await this.budgetAlertsService.getAlerts({
            budgetId: query.budgetId,
            unreadOnly: query.unreadOnly === 'true',
        });
        return { data };
    }
    async markAlertRead(id) {
        const data = await this.budgetAlertsService.markAsRead(id);
        return { data };
    }
    async dismissAlert(id) {
        const data = await this.budgetAlertsService.dismissAlert(id);
        return { data };
    }
    async triggerAlertCheck() {
        await this.budgetAlertsService.checkAllBudgets();
        return { message: 'Budget alert check completed' };
    }
    async generateAllocation(input) {
        const data = await this.otbAllocationService.generateAllocation(input);
        return { data };
    }
    async getRecommendations(budgetDetailId) {
        const data = await this.otbAllocationService.getRecommendations(budgetDetailId);
        return { data };
    }
    async applyRecommendations(budgetDetailId, dimensionType) {
        const data = await this.otbAllocationService.applyRecommendations(budgetDetailId, dimensionType);
        return { data, message: 'Recommendations applied successfully' };
    }
    async compareAllocation(input) {
        const data = await this.otbAllocationService.compareAllocation(input.budgetDetailId, input.userAllocation);
        return { data };
    }
    async assessRisk(entityType, entityId) {
        if (entityType !== 'proposal') {
            throw new common_1.BadRequestException('Only proposal assessment is currently supported');
        }
        const data = await this.riskScoringService.assessProposal(entityId);
        return { success: true, data };
    }
    async getRiskAssessment(entityType, entityId) {
        const assessment = await this.riskScoringService.getAssessment(entityType, entityId);
        if (!assessment) {
            return { success: false, message: 'No assessment found. Trigger calculation first.' };
        }
        return { success: true, data: assessment };
    }
    async refreshRiskAssessment(entityType, entityId) {
        await this.riskScoringService.markStale(entityType, entityId);
        if (entityType !== 'proposal') {
            throw new common_1.BadRequestException('Only proposal assessment is currently supported');
        }
        const data = await this.riskScoringService.assessProposal(entityId);
        return { success: true, data, message: 'Risk assessment refreshed' };
    }
    async generateSkuRecommendations(input) {
        const data = await this.skuRecommenderService.generateRecommendations(input);
        return { success: true, data };
    }
    async getSkuRecommendations(budgetDetailId, category) {
        const data = await this.skuRecommenderService.getRecommendations(budgetDetailId, category);
        return { success: true, data };
    }
    async updateRecommendationStatus(recommendationId, status) {
        const data = await this.skuRecommenderService.updateRecommendationStatus(recommendationId, status);
        return { success: true, data };
    }
    async addSelectedToProposal(budgetDetailId, proposalId) {
        const count = await this.skuRecommenderService.addSelectedToProposal(budgetDetailId, proposalId);
        return { success: true, data: { addedCount: count }, message: `${count} SKUs added to proposal` };
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Get)('size-curve/:category/:storeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get AI-recommended size curve for a category at a store' }),
    __param(0, (0, common_1.Param)('category')),
    __param(1, (0, common_1.Param)('storeId')),
    __param(2, (0, common_1.Query)('totalOrderQty')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getSizeCurve", null);
__decorate([
    (0, common_1.Post)('size-curve/calculate'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate size curve for specific parameters' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_dto_1.CalculateSizeCurveDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "calculateSizeCurve", null);
__decorate([
    (0, common_1.Post)('size-curve/compare'),
    (0, swagger_1.ApiOperation)({ summary: 'Compare user sizing vs AI recommendation' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_dto_1.CompareSizeCurveDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "compareSizeCurve", null);
__decorate([
    (0, common_1.Get)('alerts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get budget alerts (unread / by budget)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_dto_1.GetAlertsQueryDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getAlerts", null);
__decorate([
    (0, common_1.Patch)('alerts/:id/read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark alert as read' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "markAlertRead", null);
__decorate([
    (0, common_1.Patch)('alerts/:id/dismiss'),
    (0, swagger_1.ApiOperation)({ summary: 'Dismiss an alert' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "dismissAlert", null);
__decorate([
    (0, common_1.Post)('alerts/check'),
    (0, swagger_1.ApiOperation)({ summary: 'Manually trigger budget alert check (admin)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AiController.prototype, "triggerAlertCheck", null);
__decorate([
    (0, common_1.Post)('allocation/generate'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate OTB allocation recommendations' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "generateAllocation", null);
__decorate([
    (0, common_1.Get)('allocation/:budgetDetailId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get existing allocation recommendations' }),
    __param(0, (0, common_1.Param)('budgetDetailId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getRecommendations", null);
__decorate([
    (0, common_1.Post)('allocation/:budgetDetailId/apply'),
    (0, swagger_1.ApiOperation)({ summary: 'Apply AI recommendations to planning' }),
    __param(0, (0, common_1.Param)('budgetDetailId')),
    __param(1, (0, common_1.Query)('dimensionType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "applyRecommendations", null);
__decorate([
    (0, common_1.Post)('allocation/compare'),
    (0, swagger_1.ApiOperation)({ summary: 'Compare user allocation vs AI recommendation' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "compareAllocation", null);
__decorate([
    (0, common_1.Post)('risk/assess/:entityType/:entityId'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate risk score for proposal/ticket' }),
    __param(0, (0, common_1.Param)('entityType')),
    __param(1, (0, common_1.Param)('entityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "assessRisk", null);
__decorate([
    (0, common_1.Get)('risk/:entityType/:entityId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get existing risk assessment' }),
    __param(0, (0, common_1.Param)('entityType')),
    __param(1, (0, common_1.Param)('entityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getRiskAssessment", null);
__decorate([
    (0, common_1.Post)('risk/:entityType/:entityId/refresh'),
    (0, swagger_1.ApiOperation)({ summary: 'Recalculate risk score' }),
    __param(0, (0, common_1.Param)('entityType')),
    __param(1, (0, common_1.Param)('entityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "refreshRiskAssessment", null);
__decorate([
    (0, common_1.Post)('sku-recommend/generate'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate SKU recommendations for a category' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "generateSkuRecommendations", null);
__decorate([
    (0, common_1.Get)('sku-recommend/:budgetDetailId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get existing SKU recommendations' }),
    __param(0, (0, common_1.Param)('budgetDetailId')),
    __param(1, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getSkuRecommendations", null);
__decorate([
    (0, common_1.Patch)('sku-recommend/:recommendationId/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark recommendation as selected/rejected' }),
    __param(0, (0, common_1.Param)('recommendationId')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "updateRecommendationStatus", null);
__decorate([
    (0, common_1.Post)('sku-recommend/:budgetDetailId/add-to-proposal/:proposalId'),
    (0, swagger_1.ApiOperation)({ summary: 'Add selected recommendations to proposal' }),
    __param(0, (0, common_1.Param)('budgetDetailId')),
    __param(1, (0, common_1.Param)('proposalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "addSelectedToProposal", null);
exports.AiController = AiController = __decorate([
    (0, swagger_1.ApiTags)('AI'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [ai_service_1.AiService,
        budget_alerts_service_1.BudgetAlertsService,
        otb_allocation_service_1.OtbAllocationService,
        risk_scoring_service_1.RiskScoringService,
        sku_recommender_service_1.SkuRecommenderService])
], AiController);
//# sourceMappingURL=ai.controller.js.map