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
exports.ApprovalDecisionDto = exports.UpdateBudgetDto = exports.CreateBudgetDto = exports.BudgetDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class BudgetDetailDto {
}
exports.BudgetDetailDto = BudgetDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'store_id_123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BudgetDetailDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000000000, description: 'Budget amount in VND' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BudgetDetailDto.prototype, "budgetAmount", void 0);
class CreateBudgetDto {
}
exports.CreateBudgetDto = CreateBudgetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'brand_id_fer', description: 'Group Brand ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBudgetDto.prototype, "groupBrandId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SS', enum: ['SS', 'FW'], description: 'Season Group' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBudgetDto.prototype, "seasonGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'pre', enum: ['pre', 'main'], description: 'Season Type' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBudgetDto.prototype, "seasonType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2025 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBudgetDto.prototype, "fiscalYear", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Q1 budget for Ferragamo' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBudgetDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [BudgetDetailDto], description: 'Store allocations' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BudgetDetailDto),
    __metadata("design:type", Array)
], CreateBudgetDto.prototype, "details", void 0);
class UpdateBudgetDto {
}
exports.UpdateBudgetDto = UpdateBudgetDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Updated comment' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBudgetDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [BudgetDetailDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BudgetDetailDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateBudgetDto.prototype, "details", void 0);
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
    (0, swagger_1.ApiPropertyOptional)({ example: 'Approved with minor adjustments' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ApprovalDecisionDto.prototype, "comment", void 0);
//# sourceMappingURL=budget.dto.js.map