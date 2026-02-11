import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseDto<T = any> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiPropertyOptional({ example: 'Operation successful' })
  message?: string;

  @ApiPropertyOptional()
  data?: T;

  @ApiPropertyOptional()
  errors?: any;
}

export class ErrorResponseDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Error message' })
  message: string;

  @ApiPropertyOptional()
  errors?: any;

  @ApiProperty({ example: '2026-02-11T00:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/api/v1/resource' })
  path: string;
}

export class PaginationMetaDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  pageSize: number;

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 5 })
  totalPages: number;
}
