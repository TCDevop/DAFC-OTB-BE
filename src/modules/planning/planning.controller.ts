import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { PlanningService } from './planning.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard, RequirePermissions } from '../../common/guards/permissions.guard';
import { CreatePlanningHeaderDto, UpdatePlanningDto } from './dto/planning.dto';

@ApiTags('planning')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('planning')
export class PlanningController {
  constructor(private planningService: PlanningService) { }

  // ─── LIST ────────────────────────────────────────────────────────────────

  @Get()
  @RequirePermissions('planning:read')
  @ApiOperation({ summary: 'List planning versions' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 20 })
  async findAll(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    const result = await this.planningService.findAll({
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 20,
    });
    return { success: true, ...result };
  }

  // ─── GET ONE ─────────────────────────────────────────────────────────────

  @Get(':id')
  @RequirePermissions('planning:read')
  @ApiOperation({ summary: 'Get planning header by ID with breakdown' })
  async findOne(@Param('id') id: string) {
    return { success: true, data: await this.planningService.findOne(id) };
  }

  // ─── CREATE ──────────────────────────────────────────────────────────────

  @Post()
  @RequirePermissions('planning:write')
  @ApiOperation({ summary: 'Create new planning header with breakdown' })
  @ApiBody({ type: CreatePlanningHeaderDto })
  async create(@Body() dto: CreatePlanningHeaderDto, @Request() req: any) {
    return { success: true, data: await this.planningService.create(dto, req.user.sub) };
  }

  // ─── UPDATE ──────────────────────────────────────────────────────────────

  @Put(':id')
  @RequirePermissions('planning:write')
  @ApiOperation({ summary: 'Update planning breakdown' })
  @ApiBody({ type: UpdatePlanningDto })
  async update(@Param('id') id: string, @Body() dto: UpdatePlanningDto, @Request() req: any) {
    return { success: true, data: await this.planningService.update(id, dto, req.user.sub) };
  }

  // ─── DELETE ──────────────────────────────────────────────────────────────

  @Delete(':id')
  @RequirePermissions('planning:write')
  @ApiOperation({ summary: 'Delete planning header' })
  async remove(@Param('id') id: string) {
    await this.planningService.remove(id);
    return { success: true, message: 'Planning header deleted' };
  }
  @Post(':id/finalize')
  @RequirePermissions('planning:write')
  @ApiOperation({ summary: 'Finalize a planning version (Status -> FINAL)' })
  async finalize(@Param('id') id: string) {
    return { success: true, data: await this.planningService.finalize(id), message: 'Planning finalized' };
  }
}
