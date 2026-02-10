"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalWorkflowModule = void 0;
const common_1 = require("@nestjs/common");
const approval_workflow_controller_1 = require("./approval-workflow.controller");
const approval_workflow_service_1 = require("./approval-workflow.service");
let ApprovalWorkflowModule = class ApprovalWorkflowModule {
};
exports.ApprovalWorkflowModule = ApprovalWorkflowModule;
exports.ApprovalWorkflowModule = ApprovalWorkflowModule = __decorate([
    (0, common_1.Module)({
        controllers: [approval_workflow_controller_1.ApprovalWorkflowController],
        providers: [approval_workflow_service_1.ApprovalWorkflowService],
        exports: [approval_workflow_service_1.ApprovalWorkflowService],
    })
], ApprovalWorkflowModule);
//# sourceMappingURL=approval-workflow.module.js.map