import { Controller, Get, Patch, Post, Body, Param, Query } from '@nestjs/common';
import { SecurityService } from './security.service';

@Controller('security')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  @Get('audit-logs')
  async getAuditLogs(
    @Query('userName') userName?: string,
    @Query('action') action?: string,
    @Query('module') module?: string,
    @Query('status') status?: string,
  ) {
    return this.securityService.getAuditLogs({ userName, action, module, status });
  }

  @Get('alerts')
  async getSecurityAlerts(@Query('severity') severity?: string) {
    return this.securityService.getSecurityAlerts(severity);
  }

  @Patch('alerts/:id/resolve')
  async resolveAlert(@Param('id') id: string) {
    return this.securityService.resolveAlert(id);
  }

  @Post('audit-logs')
  async logAudit(@Body() data: any) {
    return this.securityService.logAudit(data);
  }
}
