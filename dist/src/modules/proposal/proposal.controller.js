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
const openapi = require("@nestjs/swagger");
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
    async findAll(page, pageSize) {
        const result = await this.proposalService.findAll({
            page: page ? Number(page) : 1,
            pageSize: pageSize ? Number(pageSize) : 20,
        });
        return { success: true, ...result };
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
    async remove(id) {
        await this.proposalService.remove(id);
        return { success: true, message: 'Proposal deleted' };
    }
    async finalize(id) {
        return { success: true, data: await this.proposalService.finalize(id), message: 'Proposal finalized' };
    }
};
exports.ProposalController = ProposalController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_guard_1.RequirePermissions)('proposal:read'),
    (0, swagger_1.ApiOperation)({ summary: 'List SKU proposals' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, type: Number, example: 20 }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_guard_1.RequirePermissions)('proposal:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get SKU proposal header by ID' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_guard_1.RequirePermissions)('proposal:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new SKU proposal header' }),
    (0, swagger_1.ApiBody)({ type: proposal_dto_1.CreateSKUProposalHeaderDto }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [proposal_dto_1.CreateSKUProposalHeaderDto, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, permissions_guard_1.RequirePermissions)('proposal:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Update SKU proposal header (replaces proposals)' }),
    (0, swagger_1.ApiBody)({ type: proposal_dto_1.UpdateProposalDto }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposal_dto_1.UpdateProposalDto, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_guard_1.RequirePermissions)('proposal:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete SKU proposal header' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/finalize'),
    (0, permissions_guard_1.RequirePermissions)('proposal:write'),
    (0, swagger_1.ApiOperation)({ summary: 'Finalize a proposal (Status -> FINAL)' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "finalize", null);
exports.ProposalController = ProposalController = __decorate([
    (0, swagger_1.ApiTags)('proposals'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('proposal'),
    __metadata("design:paramtypes", [proposal_service_1.ProposalService])
], ProposalController);
//# sourceMappingURL=proposal.controller.js.map