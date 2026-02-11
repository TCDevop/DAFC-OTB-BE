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
exports.UpdateApprovalWorkflowDto = exports.CreateApprovalWorkflowDto = exports.WorkflowLevelDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const class_validator_2 = require("class-validator");
class WorkflowLevelDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { levelOrder: { required: true, type: () => Number }, levelName: { required: true, type: () => String }, approverUserId: { required: true, type: () => String }, isRequired: { required: true, type: () => Boolean } };
    }
}
exports.WorkflowLevelDto = WorkflowLevelDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WorkflowLevelDto.prototype, "levelOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WorkflowLevelDto.prototype, "levelName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WorkflowLevelDto.prototype, "approverUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], WorkflowLevelDto.prototype, "isRequired", void 0);
class CreateApprovalWorkflowDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { groupBrandId: { required: true, type: () => String }, workflowName: { required: true, type: () => String }, levels: { required: true, type: () => [require("./approval-workflow.dto").WorkflowLevelDto] } };
    }
}
exports.CreateApprovalWorkflowDto = CreateApprovalWorkflowDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateApprovalWorkflowDto.prototype, "groupBrandId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateApprovalWorkflowDto.prototype, "workflowName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [WorkflowLevelDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_2.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => WorkflowLevelDto),
    __metadata("design:type", Array)
], CreateApprovalWorkflowDto.prototype, "levels", void 0);
class UpdateApprovalWorkflowDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { workflowName: { required: false, type: () => String }, levels: { required: false, type: () => [require("./approval-workflow.dto").WorkflowLevelDto] } };
    }
}
exports.UpdateApprovalWorkflowDto = UpdateApprovalWorkflowDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateApprovalWorkflowDto.prototype, "workflowName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [WorkflowLevelDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_2.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => WorkflowLevelDto),
    __metadata("design:type", Array)
], UpdateApprovalWorkflowDto.prototype, "levels", void 0);
//# sourceMappingURL=approval-workflow.dto.js.map