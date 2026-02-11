import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from '@nestjs/swagger';
import { TicketService } from './ticket.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateTicketDto, ApprovalActionDto } from './dto/ticket.dto';

@ApiTags('tickets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketController {
    constructor(private ticketService: TicketService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new approval ticket' })
    @ApiBody({ type: CreateTicketDto })
    async create(@Body() dto: CreateTicketDto, @Request() req: any) {
        return { success: true, data: await this.ticketService.create(req.user.sub, dto) };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get ticket details and logs' })
    async findOne(@Param('id') id: string) {
        return { success: true, data: await this.ticketService.findOne(id) };
    }

    @Post(':id/approve')
    @ApiOperation({ summary: 'Approve or Reject a ticket' })
    @ApiBody({ type: ApprovalActionDto })
    async approve(@Param('id') id: string, @Body() dto: ApprovalActionDto, @Request() req: any) {
        return { success: true, data: await this.ticketService.processApproval(id, req.user.sub, dto) };
    }
}
