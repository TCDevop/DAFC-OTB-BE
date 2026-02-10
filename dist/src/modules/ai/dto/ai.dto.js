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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAlertsQueryDto = exports.CompareSizeCurveDto = exports.CalculateSizeCurveDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CalculateSizeCurveDto {
}
exports.CalculateSizeCurveDto = CalculateSizeCurveDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Category / product type', example: 'W OUTERWEAR' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CalculateSizeCurveDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Store ID', example: 'store-rex-id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CalculateSizeCurveDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total order quantity', example: 100 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CalculateSizeCurveDto.prototype, "totalOrderQty", void 0);
class CompareSizeCurveDto {
}
exports.CompareSizeCurveDto = CompareSizeCurveDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SKU ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompareSizeCurveDto.prototype, "skuId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Store ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompareSizeCurveDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User sizing input — map of sizeCode → quantity',
        example: { '0002': 10, '0004': 30, '0006': 35, '0008': 25 },
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CompareSizeCurveDto.prototype, "userSizing", void 0);
class GetAlertsQueryDto {
}
exports.GetAlertsQueryDto = GetAlertsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by budget ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetAlertsQueryDto.prototype, "budgetId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Only unread alerts', default: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAlertsQueryDto.prototype, "unreadOnly", void 0);
//# sourceMappingURL=ai.dto.js.map