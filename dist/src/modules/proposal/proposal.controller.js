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
exports.ProposalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const proposal_service_1 = require("./proposal.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const permissions_guard_1 = require("../../common/guards/permissions.guard");
const proposal_dto_1 = require("./dto/proposal.dto");
let ProposalController = class ProposalController {
    constructor(proposalService) {
        this.proposalService = proposalService;
    }
    async findAll(budgetId, planningVersionId, status, page, pageSize) {
        const result = await this.proposalService.findAll({
            budgetId, planningVersionId, status, page, pageSize,
        });
        return { success: true, ...result };
    }
    async getStatistics(budgetId) {
        return { success: true, data: await this.proposalService.getStatistics(budgetId) };
    }
    async findOne(id) {
        return { success: true, data: await this.proposalService.findOne(id) };
    }
    async create(dto, req) {
        return { success: true, data: await this.proposalService.create(dto, req.user.sub) };
    }
    async update(id, dto, req) {
        return { success: true, data: await this.proposalService.update(id, dto, req.user.sub) };
    }
    async addProduct(id, dto, req) {
        return { success: true, data: await this.proposalService.addProduct(id, dto, req.user.sub) };
    }
    async bulkAddProducts(id, dto, req) {
        return { success: true, data: await this.proposalService.bulkAddProducts(id, dto, req.user.sub) };
    }
    async updateProduct(id, productId, dto, req) {
        return { success: true, data: await this.proposalService.updateProduct(id, productId, dto, req.user.sub) };
    }
    async removeProduct(id, productId, req) {
        return { success: true, data: await this.proposalService.removeProduct(id, productId, req.user.sub) };
    }
    async submit(id, req) {
        return { success: true, data: await this.proposalService.submit(id, req.user.sub) };
    }
    async approveLevel1(id, dto, req) {
        return { success: true, data: await this.proposalService.approveLevel1(id, dto, req.user.sub) };
    }
    async approveLevel2(id, dto, req) {
        return { success: true, data: await this.proposalService.approveLevel2(id, dto, req.user.sub) };
    }
    async remove(id) {
        await this.proposalService.remove(id);
        return { success: true, message: 'Proposal deleted' };
    }
};
exports.ProposalController = ProposalController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_guard_1.RequirePermissions)('proposal:read'),
    (0, swagger_1.ApiOperation)({ summary: 'List proposals with filters' }),
    (0, swagger_1.ApiQuery)({ name: 'budgetId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'planningVersionId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['DRAFT', 'SUBMITTED', 'LEVEL1_APPROVED', 'APPROVED', 'REJECTED'] }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, type: Number }),
    __param(0, (0, common_1.Query)('budgetId')),
    __param(1, (0, common_1.Query)('planningVersionId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, permissions_guard_1.RequirePermissions)('proposal:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get proposal statistics' }),
    (0, swagger_1.ApiQuery)({ name: 'budgetId', required: false }),
    __param(0, (0, common_1.Query)('budgetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_guard_1.RequirePermissions)('proposal:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get proposal with products and approvals' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_guard_1.RequirePermissions)('proposal:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new proposal for a budget' }),
    (0, swagger_1.ApiBody)({ type: proposal_dto_1.CreateProposalDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [proposal_dto_1.CreateProposalDto, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, permissions_guard_1.RequirePermissions)('proposal:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Update draft proposal' }),
    (0, swagger_1.ApiBody)({ type: proposal_dto_1.UpdateProposalDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposal_dto_1.UpdateProposalDto, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/products'),
    (0, permissions_guard_1.RequirePermissions)('proposal:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a product (SKU) to the proposal' }),
    (0, swagger_1.ApiBody)({ type: proposal_dto_1.AddProductDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposal_dto_1.AddProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Post)(':id/products/bulk'),
    (0, permissions_guard_1.RequirePermissions)('proposal:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk add multiple products to the proposal' }),
    (0, swagger_1.ApiBody)({ type: proposal_dto_1.BulkAddProductsDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposal_dto_1.BulkAddProductsDto, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "bulkAddProducts", null);
__decorate([
    (0, common_1.Patch)(':id/products/:productId'),
    (0, permissions_guard_1.RequirePermissions)('proposal:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a product quantity or details in the proposal' }),
    (0, swagger_1.ApiBody)({ type: proposal_dto_1.UpdateProductDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('productId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, proposal_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)(':id/products/:productId'),
    (0, permissions_guard_1.RequirePermissions)('proposal:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a product from the proposal' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('productId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "removeProduct", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, permissions_guard_1.RequirePermissions)('proposal:submit'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit proposal for approval (DRAFT → SUBMITTED)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)(':id/approve/level1'),
    (0, permissions_guard_1.RequirePermissions)('proposal:approve_l1'),
    (0, swagger_1.ApiOperation)({ summary: 'Level 1 approval (SUBMITTED → LEVEL1_APPROVED)' }),
    (0, swagger_1.ApiBody)({ type: proposal_dto_1.ApprovalDecisionDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposal_dto_1.ApprovalDecisionDto, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "approveLevel1", null);
__decorate([
    (0, common_1.Post)(':id/approve/level2'),
    (0, permissions_guard_1.RequirePermissions)('proposal:approve_l2'),
    (0, swagger_1.ApiOperation)({ summary: 'Level 2 approval (LEVEL1_APPROVED → APPROVED)' }),
    (0, swagger_1.ApiBody)({ type: proposal_dto_1.ApprovalDecisionDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposal_dto_1.ApprovalDecisionDto, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "approveLevel2", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_guard_1.RequirePermissions)('proposal:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete draft proposal' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "remove", null);
exports.ProposalController = ProposalController = __decorate([
    (0, swagger_1.ApiTags)('proposals'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('proposals'),
    __metadata("design:paramtypes", [proposal_service_1.ProposalService])
], ProposalController);
//# sourceMappingURL=proposal.controller.js.map