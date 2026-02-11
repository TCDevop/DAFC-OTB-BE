"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const master_data_module_1 = require("./modules/master-data/master-data.module");
const budget_module_1 = require("./modules/budget/budget.module");
const planning_module_1 = require("./modules/planning/planning.module");
const proposal_module_1 = require("./modules/proposal/proposal.module");
const ai_module_1 = require("./modules/ai/ai.module");
const approval_workflow_module_1 = require("./modules/approval-workflow/approval-workflow.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            master_data_module_1.MasterDataModule,
            budget_module_1.BudgetModule,
            planning_module_1.PlanningModule,
            proposal_module_1.ProposalModule,
            ai_module_1.AiModule,
            approval_workflow_module_1.ApprovalWorkflowModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map