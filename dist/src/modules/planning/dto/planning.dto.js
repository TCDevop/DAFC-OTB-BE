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
exports.ApprovalDecisionDto = exports.UpdateDetailDto = exports.UpdatePlanningDto = exports.CreatePlanningDto = exports.PlanningDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PlanningDetailDto {
}
exports.PlanningDetailDto = PlanningDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['collection', 'gender', 'category', 'subCategory'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlanningDetailDto.prototype, "dimensionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PlanningDetailDto.prototype, "collectionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PlanningDetailDto.prototype, "genderId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PlanningDetailDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PlanningDetailDto.prototype, "subCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500000000, description: 'Last season sales value' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PlanningDetailDto.prototype, "lastSeasonSales", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.25, description: 'Last season percentage (0-1)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1),
    __metadata("design:type", Number)
], PlanningDetailDto.prototype, "lastSeasonPct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.30, description: 'System suggested buy percentage' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1),
    __metadata("design:type", Number)
], PlanningDetailDto.prototype, "systemBuyPct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.28, description: 'User adjusted buy percentage' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1),
    __metadata("design:type", Number)
], PlanningDetailDto.prototype, "userBuyPct", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PlanningDetailDto.prototype, "userComment", void 0);
class CreatePlanningDto {
}
exports.CreatePlanningDto = CreatePlanningDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Budget Detail ID (budget per store)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePlanningDto.prototype, "budgetDetailId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Initial Planning' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePlanningDto.prototype, "versionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PlanningDetailDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PlanningDetailDto),
    __metadata("design:type", Array)
], CreatePlanningDto.prototype, "details", void 0);
class UpdatePlanningDto {
}
exports.UpdatePlanningDto = UpdatePlanningDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePlanningDto.prototype, "versionName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [PlanningDetailDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PlanningDetailDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdatePlanningDto.prototype, "details", void 0);
class UpdateDetailDto {
}
exports.UpdateDetailDto = UpdateDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.28, description: 'User adjusted buy percentage' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1),
    __metadata("design:type", Number)
], UpdateDetailDto.prototype, "userBuyPct", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDetailDto.prototype, "userComment", void 0);
class ApprovalDecisionDto {
}
exports.ApprovalDecisionDto = ApprovalDecisionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['APPROVED', 'REJECTED'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApprovalDecisionDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ApprovalDecisionDto.prototype, "comment", void 0);
//# sourceMappingURL=planning.dto.js.map