"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGlobalErrorResponses = exports.ApiConflictResponse = exports.ApiNotFoundResponse = exports.ApiForbiddenResponse = exports.ApiUnauthorizedResponse = exports.ApiBadRequestResponse = exports.ApiCreatedResponse = exports.ApiSuccessResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../dto/response.dto");
const ApiSuccessResponse = (dataDto, isArray = false) => {
    const decorators = [];
    if (dataDto) {
        decorators.push((0, swagger_1.ApiExtraModels)(response_dto_1.ResponseDto, dataDto));
        decorators.push((0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Successful operation',
            schema: {
                allOf: [
                    { $ref: (0, swagger_1.getSchemaPath)(response_dto_1.ResponseDto) },
                    {
                        properties: {
                            success: { type: 'boolean', example: true },
                            statusCode: { type: 'number', example: 200 },
                            data: isArray
                                ? { type: 'array', items: { $ref: (0, swagger_1.getSchemaPath)(dataDto) } }
                                : { $ref: (0, swagger_1.getSchemaPath)(dataDto) },
                        },
                    },
                ],
            },
        }));
    }
    else {
        decorators.push((0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Successful operation',
            schema: {
                properties: {
                    success: { type: 'boolean', example: true },
                    statusCode: { type: 'number', example: 200 },
                    message: { type: 'string', example: 'Operation successful' },
                },
            },
        }));
    }
    return (0, common_1.applyDecorators)(...decorators);
};
exports.ApiSuccessResponse = ApiSuccessResponse;
const ApiCreatedResponse = (dataDto) => {
    const decorators = [];
    if (dataDto) {
        decorators.push((0, swagger_1.ApiExtraModels)(response_dto_1.ResponseDto, dataDto));
        decorators.push((0, swagger_1.ApiResponse)({
            status: 201,
            description: 'Resource created successfully',
            schema: {
                allOf: [
                    { $ref: (0, swagger_1.getSchemaPath)(response_dto_1.ResponseDto) },
                    {
                        properties: {
                            success: { type: 'boolean', example: true },
                            statusCode: { type: 'number', example: 201 },
                            data: { $ref: (0, swagger_1.getSchemaPath)(dataDto) },
                        },
                    },
                ],
            },
        }));
    }
    else {
        decorators.push((0, swagger_1.ApiResponse)({
            status: 201,
            description: 'Resource created successfully',
            schema: {
                properties: {
                    success: { type: 'boolean', example: true },
                    statusCode: { type: 'number', example: 201 },
                    message: { type: 'string', example: 'Created successfully' },
                },
            },
        }));
    }
    return (0, common_1.applyDecorators)(...decorators);
};
exports.ApiCreatedResponse = ApiCreatedResponse;
const ApiBadRequestResponse = (description = 'Bad request') => (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(response_dto_1.ErrorResponseDto), (0, swagger_1.ApiResponse)({
    status: 400,
    description,
    schema: { $ref: (0, swagger_1.getSchemaPath)(response_dto_1.ErrorResponseDto) },
}));
exports.ApiBadRequestResponse = ApiBadRequestResponse;
const ApiUnauthorizedResponse = (description = 'Unauthorized') => (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(response_dto_1.ErrorResponseDto), (0, swagger_1.ApiResponse)({
    status: 401,
    description,
    schema: { $ref: (0, swagger_1.getSchemaPath)(response_dto_1.ErrorResponseDto) },
}));
exports.ApiUnauthorizedResponse = ApiUnauthorizedResponse;
const ApiForbiddenResponse = (description = 'Forbidden') => (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(response_dto_1.ErrorResponseDto), (0, swagger_1.ApiResponse)({
    status: 403,
    description,
    schema: { $ref: (0, swagger_1.getSchemaPath)(response_dto_1.ErrorResponseDto) },
}));
exports.ApiForbiddenResponse = ApiForbiddenResponse;
const ApiNotFoundResponse = (description = 'Resource not found') => (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(response_dto_1.ErrorResponseDto), (0, swagger_1.ApiResponse)({
    status: 404,
    description,
    schema: { $ref: (0, swagger_1.getSchemaPath)(response_dto_1.ErrorResponseDto) },
}));
exports.ApiNotFoundResponse = ApiNotFoundResponse;
const ApiConflictResponse = (description = 'Conflict') => (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(response_dto_1.ErrorResponseDto), (0, swagger_1.ApiResponse)({
    status: 409,
    description,
    schema: { $ref: (0, swagger_1.getSchemaPath)(response_dto_1.ErrorResponseDto) },
}));
exports.ApiConflictResponse = ApiConflictResponse;
const ApiGlobalErrorResponses = () => (0, common_1.applyDecorators)((0, exports.ApiBadRequestResponse)(), (0, exports.ApiUnauthorizedResponse)(), (0, exports.ApiForbiddenResponse)(), (0, exports.ApiNotFoundResponse)());
exports.ApiGlobalErrorResponses = ApiGlobalErrorResponses;
//# sourceMappingURL=api-response.decorator.js.map