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
exports.MasterDataController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const master_data_service_1 = require("./master-data.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let MasterDataController = class MasterDataController {
    constructor(masterDataService) {
        this.masterDataService = masterDataService;
    }
    async getGroupBrands() {
        return { success: true, data: await this.masterDataService.getGroupBrands() };
    }
    async getBrands() {
        return { success: true, data: await this.masterDataService.getBrands() };
    }
    async getStores() {
        return { success: true, data: await this.masterDataService.getStores() };
    }
    async getCollections() {
        return { success: true, data: await this.masterDataService.getCollections() };
    }
    async getGenders() {
        return { success: true, data: await this.masterDataService.getGenders() };
    }
    async getCategories() {
        return { success: true, data: await this.masterDataService.getCategories() };
    }
    async getSeasons() {
        return { success: true, data: this.masterDataService.getSeasonConfig() };
    }
    async getSkuCatalog(productType, brandId, search, page, pageSize) {
        const result = await this.masterDataService.getSkuCatalog({
            productType, brandId, search, page, pageSize,
        });
        return { success: true, ...result };
    }
};
exports.MasterDataController = MasterDataController;
__decorate([
    (0, common_1.Get)('group-brands'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active group brands' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MasterDataController.prototype, "getGroupBrands", null);
__decorate([
    (0, common_1.Get)('brands'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active brands (replaces GROUP_BRANDS constant)' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MasterDataController.prototype, "getBrands", null);
__decorate([
    (0, common_1.Get)('stores'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active stores (replaces STORES constant)' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MasterDataController.prototype, "getStores", null);
__decorate([
    (0, common_1.Get)('collections'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all collections (replaces COLLECTIONS constant)' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MasterDataController.prototype, "getCollections", null);
__decorate([
    (0, common_1.Get)('genders'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all genders' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MasterDataController.prototype, "getGenders", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Get full category hierarchy: Gender → Category → SubCategory' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MasterDataController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('seasons'),
    (0, swagger_1.ApiOperation)({ summary: 'Get season configuration (SS/FW + Pre/Main)' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MasterDataController.prototype, "getSeasons", null);
__decorate([
    (0, common_1.Get)('sku-catalog'),
    (0, swagger_1.ApiOperation)({ summary: 'Search SKU catalog with filters and pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'productType', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'brandId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, type: Number }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('productType')),
    __param(1, (0, common_1.Query)('brandId')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], MasterDataController.prototype, "getSkuCatalog", null);
exports.MasterDataController = MasterDataController = __decorate([
    (0, swagger_1.ApiTags)('master-data'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('master'),
    __metadata("design:paramtypes", [master_data_service_1.MasterDataService])
], MasterDataController);
//# sourceMappingURL=master-data.controller.js.map