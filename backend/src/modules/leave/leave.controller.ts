import { Controller, Get, Post, Body, Param, Query, Patch, UseGuards, Request } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('leave')
export class LeaveController {
  constructor(private leaveService: LeaveService) {}

  @Get('requests')
  async getAllRequests(@Query('status') status?: string) {
    return this.leaveService.getAllRequests(status);
  }

  @Get('balances/:employeeId')
  async getBalances(@Param('employeeId') employeeId: string) {
    return this.leaveService.getBalances(employeeId);
  }

  @Get('my-requests/:employeeId')
  async getMyRequests(@Param('employeeId') employeeId: string) {
    return this.leaveService.getMyRequests(employeeId);
  }

  @Post('apply')
  async apply(@Body() data: any) {
    return this.leaveService.apply(data);
  }

  @Patch(':id/approve')
  async approve(@Param('id') id: string, @Body('reviewerName') reviewerName?: string) {
    return this.leaveService.approve(id, reviewerName || 'Amit Patel (Manager)');
  }

  @Patch(':id/reject')
  async reject(@Param('id') id: string, @Body('reviewerName') reviewerName?: string) {
    return this.leaveService.reject(id, reviewerName || 'Amit Patel (Manager)');
  }
}
