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
exports.ApprovalWorkflowController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const approval_workflow_service_1 = require("./approval-workflow.service");
const approval_workflow_dto_1 = require("./dto/approval-workflow.dto");
let ApprovalWorkflowController = class ApprovalWorkflowController {
    constructor(service) {
        this.service = service;
    }
    async findAll(groupBrandId) {
        const data = await this.service.findAll(groupBrandId);
        return { success: true, data };
    }
    async findOne(id) {
        const data = await this.service.findOne(id);
        return { success: true, data };
    }
    async create(dto) {
        const data = await this.service.create(dto);
        return { success: true, data, message: 'Workflow created' };
    }
    async update(id, dto) {
        const data = await this.service.update(id, dto);
        return { success: true, data, message: 'Workflow updated' };
    }
    async delete(id) {
        await this.service.remove(id);
        return { success: true, message: 'Workflow deleted' };
    }
};
exports.ApprovalWorkflowController = ApprovalWorkflowController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all approval workflows' }),
    (0, swagger_1.ApiQuery)({ name: 'groupBrandId', required: false }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('groupBrandId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalWorkflowController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get workflow with levels' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalWorkflowController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new approval workflow' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [approval_workflow_dto_1.CreateApprovalWorkflowDto]),
    __metadata("design:returntype", Promise)
], ApprovalWorkflowController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an approval workflow (replaces levels)' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approval_workflow_dto_1.UpdateApprovalWorkflowDto]),
    __metadata("design:returntype", Promise)
], ApprovalWorkflowController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a workflow' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalWorkflowController.prototype, "delete", null);
exports.ApprovalWorkflowController = ApprovalWorkflowController = __decorate([
    (0, swagger_1.ApiTags)('approvals'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('approval-workflow'),
    __metadata("design:paramtypes", [approval_workflow_service_1.ApprovalWorkflowService])
], ApprovalWorkflowController);
//# sourceMappingURL=approval-workflow.controller.js.map