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
exports.ApprovalActionDto = exports.CreateTicketDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../common/enums");
class CreateTicketDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { budgetAllocateId: { required: true, type: () => String }, planningHeaderId: { required: false, type: () => String }, skuProposalHeaderId: { required: false, type: () => String } };
    }
}
exports.CreateTicketDto = CreateTicketDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "budgetAllocateId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "planningHeaderId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "skuProposalHeaderId", void 0);
class ApprovalActionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { action: { required: true, type: () => Object }, comment: { required: false, type: () => String } };
    }
}
exports.ApprovalActionDto = ApprovalActionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ApprovalAction }),
    (0, class_validator_1.IsEnum)(enums_1.ApprovalAction),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApprovalActionDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ApprovalActionDto.prototype, "comment", void 0);
//# sourceMappingURL=ticket.dto.js.map