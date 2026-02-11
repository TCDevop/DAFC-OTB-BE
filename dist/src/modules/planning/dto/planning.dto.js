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
exports.UpdatePlanningDto = exports.CreatePlanningHeaderDto = exports.PlanningGenderDto = exports.PlanningCollectionDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PlanningCollectionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { storeId: { required: true, type: () => String }, collectionId: { required: true, type: () => String }, actualBuyPct: { required: true, type: () => Number, minimum: 0 }, proposedBuyPct: { required: true, type: () => Number, minimum: 0 }, otbProposedAmount: { required: true, type: () => Number, minimum: 0 } };
    }
}
exports.PlanningCollectionDto = PlanningCollectionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PlanningCollectionDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PlanningCollectionDto.prototype, "collectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PlanningCollectionDto.prototype, "actualBuyPct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PlanningCollectionDto.prototype, "proposedBuyPct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PlanningCollectionDto.prototype, "otbProposedAmount", void 0);
class PlanningGenderDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { storeId: { required: true, type: () => String }, genderId: { required: true, type: () => String }, actualBuyPct: { required: true, type: () => Number, minimum: 0 }, proposedBuyPct: { required: true, type: () => Number, minimum: 0 }, otbProposedAmount: { required: true, type: () => Number, minimum: 0 } };
    }
}
exports.PlanningGenderDto = PlanningGenderDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PlanningGenderDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PlanningGenderDto.prototype, "genderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PlanningGenderDto.prototype, "actualBuyPct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PlanningGenderDto.prototype, "proposedBuyPct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PlanningGenderDto.prototype, "otbProposedAmount", void 0);
class CreatePlanningHeaderDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { collections: { required: false, type: () => [require("./planning.dto").PlanningCollectionDto] }, genders: { required: false, type: () => [require("./planning.dto").PlanningGenderDto] } };
    }
}
exports.CreatePlanningHeaderDto = CreatePlanningHeaderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PlanningCollectionDto], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PlanningCollectionDto),
    __metadata("design:type", Array)
], CreatePlanningHeaderDto.prototype, "collections", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PlanningGenderDto], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PlanningGenderDto),
    __metadata("design:type", Array)
], CreatePlanningHeaderDto.prototype, "genders", void 0);
class UpdatePlanningDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { collections: { required: false, type: () => [require("./planning.dto").PlanningCollectionDto] }, genders: { required: false, type: () => [require("./planning.dto").PlanningGenderDto] } };
    }
}
exports.UpdatePlanningDto = UpdatePlanningDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PlanningCollectionDto], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PlanningCollectionDto),
    __metadata("design:type", Array)
], UpdatePlanningDto.prototype, "collections", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PlanningGenderDto], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PlanningGenderDto),
    __metadata("design:type", Array)
], UpdatePlanningDto.prototype, "genders", void 0);
//# sourceMappingURL=planning.dto.js.map