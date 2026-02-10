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
exports.ApprovalDecisionDto = exports.UpdateProductDto = exports.BulkAddProductsDto = exports.AddProductDto = exports.UpdateProposalDto = exports.CreateProposalDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateProposalDto {
}
exports.CreateProposalDto = CreateProposalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'FER-SS25-REX-Ticket-001' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "ticketName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Budget ID to link this proposal' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "budgetId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Optional planning version to link' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "planningVersionId", void 0);
class UpdateProposalDto {
}
exports.UpdateProposalDto = UpdateProposalDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'FER-SS25-REX-Ticket-001-Updated' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProposalDto.prototype, "ticketName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Link to a different planning version' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProposalDto.prototype, "planningVersionId", void 0);
class AddProductDto {
}
exports.AddProductDto = AddProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SKU Catalog ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddProductDto.prototype, "skuId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Order quantity' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AddProductDto.prototype, "orderQty", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['New', 'Existing', 'VIP'], description: 'Customer target segment' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddProductDto.prototype, "customerTarget", void 0);
class BulkAddProductsDto {
}
exports.BulkAddProductsDto = BulkAddProductsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AddProductDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AddProductDto),
    __metadata("design:type", Array)
], BulkAddProductsDto.prototype, "products", void 0);
class UpdateProductDto {
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 15, description: 'New order quantity' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "orderQty", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['New', 'Existing', 'VIP'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "customerTarget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Sort order for display' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "sortOrder", void 0);
class ApprovalDecisionDto {
}
exports.ApprovalDecisionDto = ApprovalDecisionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['APPROVED', 'REJECTED'] }),
    (0, class_validator_1.IsEnum)(['APPROVED', 'REJECTED']),
    __metadata("design:type", String)
], ApprovalDecisionDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Looks good, approved for ordering' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ApprovalDecisionDto.prototype, "comment", void 0);
//# sourceMappingURL=proposal.dto.js.map