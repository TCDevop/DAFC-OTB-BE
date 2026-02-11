import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsNotEmpty, IsArray, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

// ─── WORKFLOW LEVEL ──────────────────────────────────────────────────────────

export class WorkflowLevelDto {
  @ApiProperty()
  @IsNumber()
  levelOrder: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  levelName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  approverUserId: string;

  @ApiProperty()
  @IsBoolean()
  isRequired: boolean;
}

// ─── CREATE WORKFLOW ─────────────────────────────────────────────────────────

export class CreateApprovalWorkflowDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  groupBrandId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  workflowName: string;

  @ApiProperty({ type: [WorkflowLevelDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkflowLevelDto)
  levels: WorkflowLevelDto[];
}

// ─── UPDATE WORKFLOW ─────────────────────────────────────────────────────────

export class UpdateApprovalWorkflowDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  workflowName?: string;

  @ApiPropertyOptional({ type: [WorkflowLevelDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WorkflowLevelDto)
  levels?: WorkflowLevelDto[];
}
