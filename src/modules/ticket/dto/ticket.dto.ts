import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApprovalAction } from '../../../common/enums';

export class CreateTicketDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    budgetAllocateId: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    planningHeaderId?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    skuProposalHeaderId?: string;
}

export class ApprovalActionDto {
    @ApiProperty({ enum: ApprovalAction })
    @IsEnum(ApprovalAction)
    @IsNotEmpty()
    action: ApprovalAction;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    comment?: string;
}
