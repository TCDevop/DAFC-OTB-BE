import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApprovalWorkflowService } from './approval-workflow.service';
import { CreateApprovalWorkflowDto, UpdateApprovalWorkflowDto } from './dto/approval-workflow.dto';

@ApiTags('approvals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('approval-workflow')
export class ApprovalWorkflowController {
  constructor(private service: ApprovalWorkflowService) { }

  @Get()
  @ApiOperation({ summary: 'List all approval workflows' })
  @ApiQuery({ name: 'groupBrandId', required: false })
  async findAll(@Query('groupBrandId') groupBrandId?: string) {
    const data = await this.service.findAll(groupBrandId);
    return { success: true, data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get workflow with levels' })
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    return { success: true, data };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new approval workflow' })
  async create(@Body() dto: CreateApprovalWorkflowDto) {
    const data = await this.service.create(dto);
    return { success: true, data, message: 'Workflow created' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an approval workflow (replaces levels)' })
  async update(@Param('id') id: string, @Body() dto: UpdateApprovalWorkflowDto) {
    const data = await this.service.update(id, dto);
    return { success: true, data, message: 'Workflow updated' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workflow' })
  async delete(@Param('id') id: string) {
    await this.service.remove(id);
    return { success: true, message: 'Workflow deleted' };
  }
}
