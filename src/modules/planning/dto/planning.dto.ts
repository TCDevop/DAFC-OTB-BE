import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsArray, ValidateNested, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

// ─── PLANNING COLLECTION ─────────────────────────────────────────────────────

export class PlanningCollectionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  storeId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  collectionId: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  actualBuyPct: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  proposedBuyPct: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  otbProposedAmount: number;
}

// ─── PLANNING GENDER ─────────────────────────────────────────────────────────

export class PlanningGenderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  storeId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  genderId: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  actualBuyPct: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  proposedBuyPct: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  otbProposedAmount: number;
}

// ─── CREATE HEADER ───────────────────────────────────────────────────────────

export class CreatePlanningHeaderDto {
  @ApiProperty({ type: [PlanningCollectionDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PlanningCollectionDto)
  collections?: PlanningCollectionDto[];

  @ApiProperty({ type: [PlanningGenderDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PlanningGenderDto)
  genders?: PlanningGenderDto[];
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export class UpdatePlanningDto {
  @ApiProperty({ type: [PlanningCollectionDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PlanningCollectionDto)
  collections?: PlanningCollectionDto[];

  @ApiProperty({ type: [PlanningGenderDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PlanningGenderDto)
  genders?: PlanningGenderDto[];
}
