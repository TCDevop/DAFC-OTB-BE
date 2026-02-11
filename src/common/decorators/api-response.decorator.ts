import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseDto, ErrorResponseDto } from '../dto/response.dto';

export const ApiSuccessResponse = (dataDto?: Type<any>, isArray = false) => {
  const decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = [];

  if (dataDto) {
    decorators.push(ApiExtraModels(ResponseDto, dataDto));
    decorators.push(
      ApiResponse({
        status: 200,
        description: 'Successful operation',
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                success: { type: 'boolean', example: true },
                statusCode: { type: 'number', example: 200 },
                data: isArray
                  ? { type: 'array', items: { $ref: getSchemaPath(dataDto) } }
                  : { $ref: getSchemaPath(dataDto) },
              },
            },
          ],
        },
      }),
    );
  } else {
    decorators.push(
      ApiResponse({
        status: 200,
        description: 'Successful operation',
        schema: {
          properties: {
            success: { type: 'boolean', example: true },
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Operation successful' },
          },
        },
      }),
    );
  }

  return applyDecorators(...decorators);
};

export const ApiCreatedResponse = (dataDto?: Type<any>) => {
  const decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = [];

  if (dataDto) {
    decorators.push(ApiExtraModels(ResponseDto, dataDto));
    decorators.push(
      ApiResponse({
        status: 201,
        description: 'Resource created successfully',
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                success: { type: 'boolean', example: true },
                statusCode: { type: 'number', example: 201 },
                data: { $ref: getSchemaPath(dataDto) },
              },
            },
          ],
        },
      }),
    );
  } else {
    decorators.push(
      ApiResponse({
        status: 201,
        description: 'Resource created successfully',
        schema: {
          properties: {
            success: { type: 'boolean', example: true },
            statusCode: { type: 'number', example: 201 },
            message: { type: 'string', example: 'Created successfully' },
          },
        },
      }),
    );
  }

  return applyDecorators(...decorators);
};

export const ApiBadRequestResponse = (description = 'Bad request') =>
  applyDecorators(
    ApiExtraModels(ErrorResponseDto),
    ApiResponse({
      status: 400,
      description,
      schema: { $ref: getSchemaPath(ErrorResponseDto) },
    }),
  );

export const ApiUnauthorizedResponse = (description = 'Unauthorized') =>
  applyDecorators(
    ApiExtraModels(ErrorResponseDto),
    ApiResponse({
      status: 401,
      description,
      schema: { $ref: getSchemaPath(ErrorResponseDto) },
    }),
  );

export const ApiForbiddenResponse = (description = 'Forbidden') =>
  applyDecorators(
    ApiExtraModels(ErrorResponseDto),
    ApiResponse({
      status: 403,
      description,
      schema: { $ref: getSchemaPath(ErrorResponseDto) },
    }),
  );

export const ApiNotFoundResponse = (description = 'Resource not found') =>
  applyDecorators(
    ApiExtraModels(ErrorResponseDto),
    ApiResponse({
      status: 404,
      description,
      schema: { $ref: getSchemaPath(ErrorResponseDto) },
    }),
  );

export const ApiConflictResponse = (description = 'Conflict') =>
  applyDecorators(
    ApiExtraModels(ErrorResponseDto),
    ApiResponse({
      status: 409,
      description,
      schema: { $ref: getSchemaPath(ErrorResponseDto) },
    }),
  );

export const ApiGlobalErrorResponses = () =>
  applyDecorators(
    ApiBadRequestResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse(),
    ApiNotFoundResponse(),
  );
