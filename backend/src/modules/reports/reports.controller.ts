import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('generate')
  async generateReport(@Query('type') type?: string) {
    return this.reportsService.generateReport(type);
  }
}
