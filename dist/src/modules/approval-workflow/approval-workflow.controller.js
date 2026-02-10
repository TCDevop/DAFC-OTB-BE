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
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const approval_workflow_service_1 = require("./approval-workflow.service");
let ApprovalWorkflowController = class ApprovalWorkflowController {
    constructor(service) {
        this.service = service;
    }
    async findAll(brandId) {
        const data = await this.service.findAll(brandId);
        return { success: true, data };
    }
    async getAvailableRoles() {
        const data = this.service.getAvailableRoles();
        return { success: true, data };
    }
    async findByBrand(brandId) {
        const data = await this.service.findByBrand(brandId);
        return { success: true, data };
    }
    async create(body) {
        const data = await this.service.create(body);
        return { success: true, data, message: 'Workflow step created' };
    }
    async update(id, body) {
        const data = await this.service.update(id, body);
        return { success: true, data, message: 'Workflow step updated' };
    }
    async delete(id) {
        await this.service.delete(id);
        return { success: true, message: 'Workflow step deleted' };
    }
    async reorderSteps(brandId, stepIds) {
        const data = await this.service.reorderSteps(brandId, stepIds);
        return { success: true, data };
    }
};
exports.ApprovalWorkflowController = ApprovalWorkflowController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('brandId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalWorkflowController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('roles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApprovalWorkflowController.prototype, "getAvailableRoles", null);
__decorate([
    (0, common_1.Get)('brand/:brandId'),
    __param(0, (0, common_1.Param)('brandId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalWorkflowController.prototype, "findByBrand", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApprovalWorkflowController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ApprovalWorkflowController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalWorkflowController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('brand/:brandId/reorder'),
    __param(0, (0, common_1.Param)('brandId')),
    __param(1, (0, common_1.Body)('stepIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ApprovalWorkflowController.prototype, "reorderSteps", null);
exports.ApprovalWorkflowController = ApprovalWorkflowController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('approval-workflow'),
    __metadata("design:paramtypes", [approval_workflow_service_1.ApprovalWorkflowService])
], ApprovalWorkflowController);
//# sourceMappingURL=approval-workflow.controller.js.map