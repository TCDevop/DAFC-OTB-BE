import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsArray, ValidateNested, IsOptional, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApprovalAction } from '../../../common/enums';

// ─── SKU ALLOCATE ────────────────────────────────────────────────────────────

export class SKUAllocateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  storeId: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  quantity: number;
}

// ─── PROPOSAL SIZING ─────────────────────────────────────────────────────────

export class ProposalSizingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subcategorySizeId: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Min(1)
  sizingChoice?: number; // 1, 2, 3

  @ApiProperty()
  @IsNumber()
  @Min(0)
  proposalQuantity: number;
}

// ─── SKU PROPOSAL ────────────────────────────────────────────────────────────

export class SKUProposalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customerTarget: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  unitCost: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  srp: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Min(1)
  selectedSizingChoice?: number; // 1, 2, 3

  @ApiProperty({ type: [SKUAllocateDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SKUAllocateDto)
  allocates: SKUAllocateDto[];

  @ApiProperty({ type: [ProposalSizingDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProposalSizingDto)
  sizings?: ProposalSizingDto[];
}

// ─── CREATE HEADER ───────────────────────────────────────────────────────────

export class CreateSKUProposalHeaderDto {
  @ApiProperty({ type: [SKUProposalDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SKUProposalDto)
  proposals: SKUProposalDto[];
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export class UpdateProposalDto {
  @ApiProperty({ type: [SKUProposalDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SKUProposalDto)
  proposals?: SKUProposalDto[];
}

// ─── APPROVE ─────────────────────────────────────────────────────────────────

export class ApprovalDecisionDto {
  @ApiProperty({ enum: ApprovalAction, example: 'APPROVED' })
  @IsEnum(ApprovalAction)
  @IsNotEmpty()
  action: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  comment?: string;
}
