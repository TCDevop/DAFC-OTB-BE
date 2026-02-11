import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { BudgetService } from './budget.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard, RequirePermissions } from '../../common/guards/permissions.guard';
import { CreateBudgetDto, UpdateBudgetDto, ApprovalDecisionDto } from './dto/budget.dto';

@ApiTags('budgets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('budgets')
export class BudgetController {
  constructor(private budgetService: BudgetService) { }

  // ─── LIST ────────────────────────────────────────────────────────────────

  @Get()
  @RequirePermissions('budget:read')
  @ApiOperation({ summary: 'List budgets with filters and pagination' })
  @ApiQuery({ name: 'fiscalYear', required: false, type: Number, example: 2026 })
  @ApiQuery({ name: 'brandId', required: false })
  @ApiQuery({ name: 'budgetName', required: false })
  @ApiQuery({ name: 'status', required: false, enum: ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'] })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 20 })
  async findAll(
    @Query('fiscalYear') fiscalYear?: number,
    @Query('brandId') brandId?: string,
    @Query('budgetName') budgetName?: string,
    @Query('status') status?: any,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    const result = await this.budgetService.findAll({
      fiscalYear: fiscalYear ? Number(fiscalYear) : undefined,
      brandId,
      budgetName,
      status,
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 20,
    });
    return { success: true, ...result };
  }

  // ─── STATISTICS ──────────────────────────────────────────────────────────

  @Get('statistics')
  @RequirePermissions('budget:read')
  @ApiOperation({ summary: 'Get budget statistics (total, by status, amounts)' })
  @ApiQuery({ name: 'fiscalYear', required: false, type: Number })
  async getStatistics(@Query('fiscalYear') fiscalYear?: number) {
    return {
      success: true,
      data: await this.budgetService.getStatistics(fiscalYear ? Number(fiscalYear) : undefined),
    };
  }

  // ─── GET ONE ─────────────────────────────────────────────────────────────

  @Get(':id')
  @RequirePermissions('budget:read')
  @ApiOperation({ summary: 'Get budget by ID with allocations' })
  async findOne(@Param('id') id: string) {
    return { success: true, data: await this.budgetService.findOne(id) };
  }

  // ─── CREATE ──────────────────────────────────────────────────────────────

  @Post()
  @RequirePermissions('budget:write')
  @ApiOperation({ summary: 'Create new budget with store allocations' })
  @ApiBody({ type: CreateBudgetDto })
  async create(@Body() dto: CreateBudgetDto, @Request() req: any) {
    return { success: true, data: await this.budgetService.create(dto, req.user.sub) };
  }

  // ─── UPDATE ──────────────────────────────────────────────────────────────

  @Put(':id')
  @RequirePermissions('budget:write')
  @ApiOperation({ summary: 'Update draft budget (only DRAFT status)' })
  @ApiBody({ type: UpdateBudgetDto })
  async update(@Param('id') id: string, @Body() dto: UpdateBudgetDto, @Request() req: any) {
    return { success: true, data: await this.budgetService.update(id, dto, req.user.sub) };
  }

  // ─── SUBMIT ──────────────────────────────────────────────────────────────

  @Post(':id/submit')
  @RequirePermissions('budget:submit')
  @ApiOperation({ summary: 'Submit budget for approval (DRAFT → SUBMITTED)' })
  async submit(@Param('id') id: string, @Request() req: any) {
    return { success: true, data: await this.budgetService.submit(id, req.user.sub) };
  }

  // ─── APPROVE ──────────────────────────────────────────────────────────────

  @Post(':id/approve')
  @RequirePermissions('budget:approve_l1') // Keeping basic approve permission
  @ApiOperation({ summary: 'Approve or Reject budget (SUBMITTED → APPROVED/REJECTED)' })
  @ApiBody({ type: ApprovalDecisionDto })
  async approve(
    @Param('id') id: string,
    @Body() dto: ApprovalDecisionDto,
    @Request() req: any,
  ) {
    return { success: true, data: await this.budgetService.approve(id, dto, req.user.sub) };
  }

  // ─── DELETE ──────────────────────────────────────────────────────────────

  @Delete(':id')
  @RequirePermissions('budget:write')
  @ApiOperation({ summary: 'Delete draft budget (only if no linked data)' })
  async remove(@Param('id') id: string) {
    await this.budgetService.remove(id);
    return { success: true, message: 'Budget deleted' };
  }
}
