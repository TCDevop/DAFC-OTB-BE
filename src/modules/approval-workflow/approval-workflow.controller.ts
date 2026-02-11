import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApprovalWorkflowService } from './approval-workflow.service';
import {
  CreateWorkflowStepDto,
  UpdateWorkflowStepDto,
  ReorderStepsDto,
} from './dto/approval-workflow.dto';

@ApiTags('approvals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('approval-workflow')
export class ApprovalWorkflowController {
  constructor(private service: ApprovalWorkflowService) {}

  @Get()
  @ApiOperation({ summary: 'List all workflow steps' })
  async findAll(@Query('brandId') brandId?: string) {
    const data = await this.service.findAll(brandId);
    return { success: true, data };
  }

  @Get('roles')
  @ApiOperation({ summary: 'Get available roles for workflow' })
  async getAvailableRoles() {
    const data = this.service.getAvailableRoles();
    return { success: true, data };
  }

  @Get('brand/:brandId')
  @ApiOperation({ summary: 'Get workflow steps for a brand' })
  async findByBrand(@Param('brandId') brandId: string) {
    const data = await this.service.findByBrand(brandId);
    return { success: true, data };
  }

  @Post()
  @ApiOperation({ summary: 'Create a workflow step' })
  async create(@Body() dto: CreateWorkflowStepDto) {
    const data = await this.service.create(dto);
    return { success: true, data, message: 'Workflow step created' };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a workflow step' })
  async update(@Param('id') id: string, @Body() dto: UpdateWorkflowStepDto) {
    const data = await this.service.update(id, dto);
    return { success: true, data, message: 'Workflow step updated' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workflow step' })
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return { success: true, message: 'Workflow step deleted' };
  }

  @Post('brand/:brandId/reorder')
  @ApiOperation({ summary: 'Reorder workflow steps for a brand' })
  async reorderSteps(@Param('brandId') brandId: string, @Body() dto: ReorderStepsDto) {
    const data = await this.service.reorderSteps(brandId, dto.stepIds);
    return { success: true, data };
  }
}
