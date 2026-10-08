import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PayrollService } from './payroll.service';

@Controller('payroll')
export class PayrollController {
  constructor(private payrollService: PayrollService) {}

  @Get('overview')
  async getOverview() {
    return this.payrollService.getOverview();
  }

  @Post('calculate')
  async calculate(@Body() data: any) {
    return this.payrollService.calculate(data);
  }

  @Get('payslip/:employeeId')
  async getPayslip(
    @Param('employeeId') employeeId: string,
    @Query('month') month?: string,
  ) {
    return this.payrollService.getPayslip(employeeId, month);
  }
}
