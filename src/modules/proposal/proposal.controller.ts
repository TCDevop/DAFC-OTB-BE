import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ProposalService } from './proposal.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard, RequirePermissions } from '../../common/guards/permissions.guard';
import { CreateSKUProposalHeaderDto, UpdateProposalDto } from './dto/proposal.dto';

@ApiTags('proposals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('proposal')
export class ProposalController {
  constructor(private proposalService: ProposalService) { }

  // ─── LIST ────────────────────────────────────────────────────────────────

  @Get()
  @RequirePermissions('proposal:read')
  @ApiOperation({ summary: 'List SKU proposals' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 20 })
  async findAll(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    const result = await this.proposalService.findAll({
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 20,
    });
    return { success: true, ...result };
  }

  // ─── GET ONE ─────────────────────────────────────────────────────────────

  @Get(':id')
  @RequirePermissions('proposal:read')
  @ApiOperation({ summary: 'Get SKU proposal header by ID' })
  async findOne(@Param('id') id: string) {
    return { success: true, data: await this.proposalService.findOne(id) };
  }

  // ─── CREATE ──────────────────────────────────────────────────────────────

  @Post()
  @RequirePermissions('proposal:write')
  @ApiOperation({ summary: 'Create new SKU proposal header' })
  @ApiBody({ type: CreateSKUProposalHeaderDto })
  async create(@Body() dto: CreateSKUProposalHeaderDto, @Request() req: any) {
    return { success: true, data: await this.proposalService.create(dto, req.user.sub) };
  }

  // ─── UPDATE ──────────────────────────────────────────────────────────────

  @Put(':id')
  @RequirePermissions('proposal:write')
  @ApiOperation({ summary: 'Update SKU proposal header (replaces proposals)' })
  @ApiBody({ type: UpdateProposalDto })
  async update(@Param('id') id: string, @Body() dto: UpdateProposalDto, @Request() req: any) {
    return { success: true, data: await this.proposalService.update(id, dto, req.user.sub) };
  }

  // ─── DELETE ──────────────────────────────────────────────────────────────

  @Delete(':id')
  @RequirePermissions('proposal:write')
  @ApiOperation({ summary: 'Delete SKU proposal header' })
  async remove(@Param('id') id: string) {
    await this.proposalService.remove(id);
    return { success: true, message: 'Proposal deleted' };
  }
  @Post(':id/finalize')
  @RequirePermissions('proposal:write')
  @ApiOperation({ summary: 'Finalize a proposal (Status -> FINAL)' })
  async finalize(@Param('id') id: string) {
    return { success: true, data: await this.proposalService.finalize(id), message: 'Proposal finalized' };
  }
}
