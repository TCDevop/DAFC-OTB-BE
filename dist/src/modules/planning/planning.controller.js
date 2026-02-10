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
exports.PlanningController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const planning_service_1 = require("./planning.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const permissions_guard_1 = require("../../common/guards/permissions.guard");
const planning_dto_1 = require("./dto/planning.dto");
let PlanningController = class PlanningController {
    constructor(planningService) {
        this.planningService = planningService;
    }
    async findAll(budgetDetailId, budgetId, status, page, pageSize) {
        const result = await this.planningService.findAll({
            budgetDetailId, budgetId, status, page, pageSize,
        });
        return { success: true, ...result };
    }
    async findOne(id) {
        return { success: true, data: await this.planningService.findOne(id) };
    }
    async create(dto, req) {
        return { success: true, data: await this.planningService.create(dto, req.user.sub) };
    }
    async createFromVersion(id, req) {
        return { success: true, data: await this.planningService.createFromVersion(id, req.user.sub) };
    }
    async update(id, dto, req) {
        return { success: true, data: await this.planningService.update(id, dto, req.user.sub) };
    }
    async updateDetail(id, detailId, dto, req) {
        return { success: true, data: await this.planningService.updateDetail(id, detailId, dto, req.user.sub) };
    }
    async submit(id, req) {
        return { success: true, data: await this.planningService.submit(id, req.user.sub) };
    }
    async approveLevel1(id, dto, req) {
        return { success: true, data: await this.planningService.approveLevel1(id, dto, req.user.sub) };
    }
    async approveLevel2(id, dto, req) {
        return { success: true, data: await this.planningService.approveLevel2(id, dto, req.user.sub) };
    }
    async markAsFinal(id, req) {
        return { success: true, data: await this.planningService.markAsFinal(id, req.user.sub) };
    }
    async remove(id) {
        await this.planningService.remove(id);
        return { success: true, message: 'Planning version deleted' };
    }
};
exports.PlanningController = PlanningController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_guard_1.RequirePermissions)('planning:read'),
    (0, swagger_1.ApiOperation)({ summary: 'List planning versions with filters' }),
    (0, swagger_1.ApiQuery)({ name: 'budgetDetailId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'budgetId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['DRAFT', 'SUBMITTED', 'LEVEL1_APPROVED', 'APPROVED', 'REJECTED'] }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, type: Number }),
    __param(0, (0, common_1.Query)('budgetDetailId')),
    __param(1, (0, common_1.Query)('budgetId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_guard_1.RequirePermissions)('planning:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get planning version with details and approvals' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_guard_1.RequirePermissions)('planning:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new planning version for a budget detail' }),
    (0, swagger_1.ApiBody)({ type: planning_dto_1.CreatePlanningDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [planning_dto_1.CreatePlanningDto, Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/copy'),
    (0, permissions_guard_1.RequirePermissions)('planning:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new version by copying an existing one' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "createFromVersion", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, permissions_guard_1.RequirePermissions)('planning:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Update draft planning version' }),
    (0, swagger_1.ApiBody)({ type: planning_dto_1.UpdatePlanningDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, planning_dto_1.UpdatePlanningDto, Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/details/:detailId'),
    (0, permissions_guard_1.RequirePermissions)('planning:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a single planning detail (userBuyPct)' }),
    (0, swagger_1.ApiBody)({ type: planning_dto_1.UpdateDetailDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('detailId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, planning_dto_1.UpdateDetailDto, Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "updateDetail", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, permissions_guard_1.RequirePermissions)('planning:submit'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit planning for approval (DRAFT → SUBMITTED)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)(':id/approve/level1'),
    (0, permissions_guard_1.RequirePermissions)('planning:approve_l1'),
    (0, swagger_1.ApiOperation)({ summary: 'Level 1 approval (SUBMITTED → LEVEL1_APPROVED)' }),
    (0, swagger_1.ApiBody)({ type: planning_dto_1.ApprovalDecisionDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, planning_dto_1.ApprovalDecisionDto, Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "approveLevel1", null);
__decorate([
    (0, common_1.Post)(':id/approve/level2'),
    (0, permissions_guard_1.RequirePermissions)('planning:approve_l2'),
    (0, swagger_1.ApiOperation)({ summary: 'Level 2 approval (LEVEL1_APPROVED → APPROVED)' }),
    (0, swagger_1.ApiBody)({ type: planning_dto_1.ApprovalDecisionDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, planning_dto_1.ApprovalDecisionDto, Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "approveLevel2", null);
__decorate([
    (0, common_1.Post)(':id/final'),
    (0, permissions_guard_1.RequirePermissions)('planning:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark approved planning as final version' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "markAsFinal", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_guard_1.RequirePermissions)('planning:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete draft planning (no linked proposals)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "remove", null);
exports.PlanningController = PlanningController = __decorate([
    (0, swagger_1.ApiTags)('planning'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('planning'),
    __metadata("design:paramtypes", [planning_service_1.PlanningService])
], PlanningController);
//# sourceMappingURL=planning.controller.js.map