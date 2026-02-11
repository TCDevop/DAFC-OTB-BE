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
exports.ApprovalDecisionDto = exports.UpdateProposalDto = exports.CreateSKUProposalHeaderDto = exports.SKUProposalDto = exports.ProposalSizingDto = exports.SKUAllocateDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../../../common/enums");
class SKUAllocateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { storeId: { required: true, type: () => String }, quantity: { required: true, type: () => Number, minimum: 0 } };
    }
}
exports.SKUAllocateDto = SKUAllocateDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SKUAllocateDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SKUAllocateDto.prototype, "quantity", void 0);
class ProposalSizingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { subcategorySizeId: { required: true, type: () => String }, sizingChoice: { required: false, type: () => Number, minimum: 0 }, proposalQuantity: { required: true, type: () => Number, minimum: 0 } };
    }
}
exports.ProposalSizingDto = ProposalSizingDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProposalSizingDto.prototype, "subcategorySizeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ProposalSizingDto.prototype, "sizingChoice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProposalSizingDto.prototype, "proposalQuantity", void 0);
class SKUProposalDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { productId: { required: true, type: () => String }, customerTarget: { required: true, type: () => String }, unitCost: { required: true, type: () => Number, minimum: 0 }, srp: { required: true, type: () => Number, minimum: 0 }, selectedSizingChoice: { required: false, type: () => Number, minimum: 1 }, allocates: { required: true, type: () => [require("./proposal.dto").SKUAllocateDto] }, sizings: { required: false, type: () => [require("./proposal.dto").ProposalSizingDto] } };
    }
}
exports.SKUProposalDto = SKUProposalDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SKUProposalDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SKUProposalDto.prototype, "customerTarget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SKUProposalDto.prototype, "unitCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SKUProposalDto.prototype, "srp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], SKUProposalDto.prototype, "selectedSizingChoice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SKUAllocateDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SKUAllocateDto),
    __metadata("design:type", Array)
], SKUProposalDto.prototype, "allocates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ProposalSizingDto], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProposalSizingDto),
    __metadata("design:type", Array)
], SKUProposalDto.prototype, "sizings", void 0);
class CreateSKUProposalHeaderDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { proposals: { required: true, type: () => [require("./proposal.dto").SKUProposalDto] } };
    }
}
exports.CreateSKUProposalHeaderDto = CreateSKUProposalHeaderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SKUProposalDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SKUProposalDto),
    __metadata("design:type", Array)
], CreateSKUProposalHeaderDto.prototype, "proposals", void 0);
class UpdateProposalDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { proposals: { required: false, type: () => [require("./proposal.dto").SKUProposalDto] } };
    }
}
exports.UpdateProposalDto = UpdateProposalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SKUProposalDto], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SKUProposalDto),
    __metadata("design:type", Array)
], UpdateProposalDto.prototype, "proposals", void 0);
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
//# sourceMappingURL=proposal.dto.js.map