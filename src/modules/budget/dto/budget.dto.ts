import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsArray, ValidateNested, IsOptional, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { BudgetStatus, ApprovalAction } from '../../../common/enums';

// ─── BUDGET ALLOCATE ─────────────────────────────────────────────────────────

export class BudgetAllocateDto {
  @ApiProperty({ example: 'store-uuid' })
  @IsString()
  @IsNotEmpty()
  storeId: string;

  @ApiProperty({ example: 'season-group-uuid' })
  @IsString()
  @IsNotEmpty()
  seasonGroupId: string;

  @ApiProperty({ example: 'season-uuid' })
  @IsString()
  @IsNotEmpty()
  seasonId: string;

  @ApiProperty({ example: 1000000000 })
  @IsNumber()
  @Min(0)
  budgetAmount: number;
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export class CreateBudgetDto {
  @ApiProperty({ example: 'Budget FER SS 2026' })
  @IsString()
  @IsNotEmpty()
  budgetName: string;

  @ApiProperty({ example: 'brand-uuid' })
  @IsString()
  @IsNotEmpty()
  brandId: string;

  @ApiProperty({ example: 2026 })
  @IsNumber()
  @Min(2020)
  fiscalYear: number;

  @ApiProperty({ example: 5000000000 })
  @IsNumber()
  @Min(0)
  budgetAmount: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ type: [BudgetAllocateDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BudgetAllocateDto)
  allocations: BudgetAllocateDto[];
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export class UpdateBudgetDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  budgetName?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  budgetAmount?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ type: [BudgetAllocateDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BudgetAllocateDto)
  allocations?: BudgetAllocateDto[];
}

// ─── APPROVE ─────────────────────────────────────────────────────────────────

export class ApprovalDecisionDto {
  @ApiProperty({ enum: ApprovalAction, example: 'APPROVED' })
  @IsEnum(ApprovalAction)
  @IsNotEmpty()
  action: string; // 'APPROVED' | 'REJECTED'

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  comment?: string;
}
