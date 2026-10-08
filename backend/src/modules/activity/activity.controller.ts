import { Controller, Get, Param } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get('session/:employeeId')
  async getCurrentSession(@Param('employeeId') employeeId: string) {
    return this.activityService.getCurrentSession(employeeId);
  }

  @Get('apps/:employeeId')
  async getAppUsage(@Param('employeeId') employeeId: string) {
    return this.activityService.getAppUsage(employeeId);
  }

  @Get('websites/:employeeId')
  async getWebUsage(@Param('employeeId') employeeId: string) {
    return this.activityService.getWebUsage(employeeId);
  }

  @Get('productivity')
  async getProductivityBreakdown() {
    return this.activityService.getProductivityBreakdown();
  }
}
