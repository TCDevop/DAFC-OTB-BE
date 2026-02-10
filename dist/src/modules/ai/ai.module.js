"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiModule = void 0;
const common_1 = require("@nestjs/common");
const ai_controller_1 = require("./ai.controller");
const ai_service_1 = require("./ai.service");
const budget_alerts_service_1 = require("./budget-alerts.service");
const otb_allocation_service_1 = require("./otb-allocation.service");
const risk_scoring_service_1 = require("./risk-scoring.service");
const sku_recommender_service_1 = require("./sku-recommender.service");
let AiModule = class AiModule {
};
exports.AiModule = AiModule;
exports.AiModule = AiModule = __decorate([
    (0, common_1.Module)({
        controllers: [ai_controller_1.AiController],
        providers: [ai_service_1.AiService, budget_alerts_service_1.BudgetAlertsService, otb_allocation_service_1.OtbAllocationService, risk_scoring_service_1.RiskScoringService, sku_recommender_service_1.SkuRecommenderService],
        exports: [ai_service_1.AiService, budget_alerts_service_1.BudgetAlertsService, otb_allocation_service_1.OtbAllocationService, risk_scoring_service_1.RiskScoringService, sku_recommender_service_1.SkuRecommenderService],
    })
], AiModule);
//# sourceMappingURL=ai.module.js.map