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
exports.ApprovalDecisionDto = exports.UpdateBudgetDto = exports.CreateBudgetDto = exports.BudgetAllocateDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../../../common/enums");
class BudgetAllocateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { storeId: { required: true, type: () => String }, seasonGroupId: { required: true, type: () => String }, seasonId: { required: true, type: () => String }, budgetAmount: { required: true, type: () => Number, minimum: 0 } };
    }
}
exports.BudgetAllocateDto = BudgetAllocateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'store-uuid' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BudgetAllocateDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'season-group-uuid' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BudgetAllocateDto.prototype, "seasonGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'season-uuid' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BudgetAllocateDto.prototype, "seasonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000000000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BudgetAllocateDto.prototype, "budgetAmount", void 0);
class CreateBudgetDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { budgetName: { required: true, type: () => String }, brandId: { required: true, type: () => String }, fiscalYear: { required: true, type: () => Number, minimum: 2020 }, budgetAmount: { required: true, type: () => Number, minimum: 0 }, comment: { required: false, type: () => String }, allocations: { required: true, type: () => [require("./budget.dto").BudgetAllocateDto] } };
    }
}
exports.CreateBudgetDto = CreateBudgetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Budget FER SS 2026' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBudgetDto.prototype, "budgetName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'brand-uuid' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBudgetDto.prototype, "brandId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2026 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(2020),
    __metadata("design:type", Number)
], CreateBudgetDto.prototype, "fiscalYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000000000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBudgetDto.prototype, "budgetAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBudgetDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [BudgetAllocateDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BudgetAllocateDto),
    __metadata("design:type", Array)
], CreateBudgetDto.prototype, "allocations", void 0);
class UpdateBudgetDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { budgetName: { required: false, type: () => String }, budgetAmount: { required: false, type: () => Number }, comment: { required: false, type: () => String }, allocations: { required: false, type: () => [require("./budget.dto").BudgetAllocateDto] } };
    }
}
exports.UpdateBudgetDto = UpdateBudgetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBudgetDto.prototype, "budgetName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateBudgetDto.prototype, "budgetAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBudgetDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [BudgetAllocateDto], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BudgetAllocateDto),
    __metadata("design:type", Array)
], UpdateBudgetDto.prototype, "allocations", void 0);
class ApprovalDecisionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { action: { required: true, type: () => String }, comment: { required: false, type: () => String } };
    }
}
exports.ApprovalDecisionDto = ApprovalDecisionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ApprovalAction, example: 'APPROVED' }),
    (0, class_validator_1.IsEnum)(enums_1.ApprovalAction),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApprovalDecisionDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ApprovalDecisionDto.prototype, "comment", void 0);
//# sourceMappingURL=budget.dto.js.map