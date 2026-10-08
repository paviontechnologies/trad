import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Get('stats')
  async getStats() {
    return this.attendanceService.getStats();
  }

  @Get('history')
  async getHistory(@Query('employeeId') employeeId?: string) {
    return this.attendanceService.getHistory(employeeId);
  }

  @Get('today/:employeeId')
  async getTodayStatus(@Param('employeeId') employeeId: string) {
    return this.attendanceService.getTodayStatus(employeeId);
  }

  @Post('check-in')
  async checkIn(@Body('employeeId') employeeId: string) {
    return this.attendanceService.checkIn(employeeId);
  }

  @Post('break/start')
  async startBreak(@Body('employeeId') employeeId: string) {
    return this.attendanceService.startBreak(employeeId);
  }

  @Post('break/end')
  async endBreak(@Body('employeeId') employeeId: string) {
    return this.attendanceService.endBreak(employeeId);
  }

  @Post('check-out')
  async checkOut(@Body('employeeId') employeeId: string) {
    return this.attendanceService.checkOut(employeeId);
  }
}
