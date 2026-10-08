import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SecurityService {
  constructor(private prisma: PrismaService) {}

  async getAuditLogs(params: {
    userName?: string;
    action?: string;
    module?: string;
    status?: string;
  }) {
    const { userName, action, module, status } = params;
    const where: any = {};

    if (userName) where.userName = { contains: userName, mode: 'insensitive' };
    if (action) where.action = action;
    if (module) where.module = module;
    if (status) where.status = status;

    return this.prisma.auditLog.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: 100,
    });
  }

  async getSecurityAlerts(severity?: string) {
    const where: any = {};
    if (severity) where.severity = severity;

    return this.prisma.securityAlert.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async resolveAlert(id: string) {
    return this.prisma.securityAlert.update({
      where: { id },
      data: {
        isResolved: true,
        resolvedAt: new Date(),
      },
    });
  }

  async logAudit(data: {
    userName: string;
    action: string;
    module: string;
    details?: string;
    ipAddress?: string;
    device?: string;
    status?: string;
  }) {
    return this.prisma.auditLog.create({
      data: {
        userName: data.userName,
        action: data.action,
        module: data.module,
        details: data.details,
        ipAddress: data.ipAddress || '192.168.1.104',
        device: data.device || 'Chrome / macOS',
        status: data.status || 'Success',
      },
    });
  }
}
