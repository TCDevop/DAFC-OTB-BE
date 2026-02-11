import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { TicketModule } from '../ticket/ticket.module';

@Module({
  imports: [PrismaModule, TicketModule],
  controllers: [BudgetController],
  providers: [BudgetService],
  exports: [BudgetService],
})
export class BudgetModule { }
