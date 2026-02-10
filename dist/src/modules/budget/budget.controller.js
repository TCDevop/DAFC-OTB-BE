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
exports.BudgetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const budget_service_1 = require("./budget.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const permissions_guard_1 = require("../../common/guards/permissions.guard");
const budget_dto_1 = require("./dto/budget.dto");
let BudgetController = class BudgetController {
    constructor(budgetService) {
        this.budgetService = budgetService;
    }
    async findAll(fiscalYear, groupBrandId, seasonGroupId, status, page, pageSize) {
        const result = await this.budgetService.findAll({
            fiscalYear: fiscalYear ? Number(fiscalYear) : undefined,
            groupBrandId,
            seasonGroupId,
            status,
            page: page ? Number(page) : 1,
            pageSize: pageSize ? Number(pageSize) : 20,
        });
        return { success: true, ...result };
    }
    async getStatistics(fiscalYear) {
        return {
            success: true,
            data: await this.budgetService.getStatistics(fiscalYear ? Number(fiscalYear) : undefined),
        };
    }
    async findOne(id) {
        return { success: true, data: await this.budgetService.findOne(id) };
    }
    async create(dto, req) {
        return { success: true, data: await this.budgetService.create(dto, req.user.sub) };
    }
    async update(id, dto, req) {
        return { success: true, data: await this.budgetService.update(id, dto, req.user.sub) };
    }
    async submit(id, req) {
        return { success: true, data: await this.budgetService.submit(id, req.user.sub) };
    }
    async approveLevel1(id, dto, req) {
        return { success: true, data: await this.budgetService.approveLevel1(id, dto, req.user.sub) };
    }
    async approveLevel2(id, dto, req) {
        return { success: true, data: await this.budgetService.approveLevel2(id, dto, req.user.sub) };
    }
    async remove(id) {
        await this.budgetService.remove(id);
        return { success: true, message: 'Budget deleted' };
    }
};
exports.BudgetController = BudgetController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_guard_1.RequirePermissions)('budget:read'),
    (0, swagger_1.ApiOperation)({ summary: 'List budgets with filters and pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'fiscalYear', required: false, type: Number, example: 2025 }),
    (0, swagger_1.ApiQuery)({ name: 'groupBrandId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'seasonGroupId', required: false, enum: ['SS', 'FW'] }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['DRAFT', 'SUBMITTED', 'LEVEL1_APPROVED', 'APPROVED', 'REJECTED'] }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, type: Number, example: 20 }),
    __param(0, (0, common_1.Query)('fiscalYear')),
    __param(1, (0, common_1.Query)('groupBrandId')),
    __param(2, (0, common_1.Query)('seasonGroupId')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('page')),
    __param(5, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, permissions_guard_1.RequirePermissions)('budget:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get budget statistics (total, by status, amounts)' }),
    (0, swagger_1.ApiQuery)({ name: 'fiscalYear', required: false, type: Number }),
    __param(0, (0, common_1.Query)('fiscalYear')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_guard_1.RequirePermissions)('budget:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get budget by ID with details and approval history' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_guard_1.RequirePermissions)('budget:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new budget with store allocations' }),
    (0, swagger_1.ApiBody)({ type: budget_dto_1.CreateBudgetDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [budget_dto_1.CreateBudgetDto, Object]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, permissions_guard_1.RequirePermissions)('budget:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Update draft budget (only DRAFT status)' }),
    (0, swagger_1.ApiBody)({ type: budget_dto_1.UpdateBudgetDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, budget_dto_1.UpdateBudgetDto, Object]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, permissions_guard_1.RequirePermissions)('budget:submit'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit budget for approval (DRAFT → SUBMITTED)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)(':id/approve/level1'),
    (0, permissions_guard_1.RequirePermissions)('budget:approve_l1'),
    (0, swagger_1.ApiOperation)({ summary: 'Level 1 approval (SUBMITTED → LEVEL1_APPROVED or REJECTED)' }),
    (0, swagger_1.ApiBody)({ type: budget_dto_1.ApprovalDecisionDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, budget_dto_1.ApprovalDecisionDto, Object]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "approveLevel1", null);
__decorate([
    (0, common_1.Post)(':id/approve/level2'),
    (0, permissions_guard_1.RequirePermissions)('budget:approve_l2'),
    (0, swagger_1.ApiOperation)({ summary: 'Level 2 approval (LEVEL1_APPROVED → APPROVED or REJECTED)' }),
    (0, swagger_1.ApiBody)({ type: budget_dto_1.ApprovalDecisionDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, budget_dto_1.ApprovalDecisionDto, Object]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "approveLevel2", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_guard_1.RequirePermissions)('budget:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete draft budget (only if no linked planning)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "remove", null);
exports.BudgetController = BudgetController = __decorate([
    (0, swagger_1.ApiTags)('budgets'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('budgets'),
    __metadata("design:paramtypes", [budget_service_1.BudgetService])
], BudgetController);
//# sourceMappingURL=budget.controller.js.map