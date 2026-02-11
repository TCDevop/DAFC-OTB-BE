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
const openapi = require("@nestjs/swagger");
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
    async findAll(page, pageSize) {
        const result = await this.planningService.findAll({
            page: page ? Number(page) : 1,
            pageSize: pageSize ? Number(pageSize) : 20,
        });
        return { success: true, ...result };
    }
    async findOne(id) {
        return { success: true, data: await this.planningService.findOne(id) };
    }
    async create(dto, req) {
        return { success: true, data: await this.planningService.create(dto, req.user.sub) };
    }
    async update(id, dto, req) {
        return { success: true, data: await this.planningService.update(id, dto, req.user.sub) };
    }
    async remove(id) {
        await this.planningService.remove(id);
        return { success: true, message: 'Planning header deleted' };
    }
    async finalize(id) {
        return { success: true, data: await this.planningService.finalize(id), message: 'Planning finalized' };
    }
};
exports.PlanningController = PlanningController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_guard_1.RequirePermissions)('planning:read'),
    (0, swagger_1.ApiOperation)({ summary: 'List planning versions' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, type: Number, example: 20 }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_guard_1.RequirePermissions)('planning:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get planning header by ID with breakdown' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_guard_1.RequirePermissions)('planning:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new planning header with breakdown' }),
    (0, swagger_1.ApiBody)({ type: planning_dto_1.CreatePlanningHeaderDto }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [planning_dto_1.CreatePlanningHeaderDto, Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, permissions_guard_1.RequirePermissions)('planning:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Update planning breakdown' }),
    (0, swagger_1.ApiBody)({ type: planning_dto_1.UpdatePlanningDto }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, planning_dto_1.UpdatePlanningDto, Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_guard_1.RequirePermissions)('planning:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete planning header' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/finalize'),
    (0, permissions_guard_1.RequirePermissions)('planning:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Finalize a planning version (Status -> FINAL)' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "finalize", null);
exports.PlanningController = PlanningController = __decorate([
    (0, swagger_1.ApiTags)('planning'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('planning'),
    __metadata("design:paramtypes", [planning_service_1.PlanningService])
], PlanningController);
//# sourceMappingURL=planning.controller.js.map