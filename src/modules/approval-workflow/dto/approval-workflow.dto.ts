import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsNotEmpty, IsArray } from 'class-validator';

export class CreateWorkflowStepDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brandId: string;

  @ApiProperty()
  @IsNumber()
  stepNumber: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roleName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  roleCode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateWorkflowStepDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  stepNumber?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  roleName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  roleCode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}

export class ReorderStepsDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  stepIds: string[];
}
