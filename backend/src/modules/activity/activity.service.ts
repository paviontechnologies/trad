import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async getCurrentSession(employeeId: string) {
    const session = await this.prisma.activitySession.findFirst({
      where: { employeeId },
      orderBy: { date: 'desc' },
      include: {
        employee: {
          select: { fullName: true, empId: true, designation: true, department: true },
        },
      },
    });

    if (!session) {
      return {
        employeeName: 'Rahul Bajediyal',
        loginTime: '09:12 AM',
        currentSession: '07h 22m',
        activeTime: '06h 41m',
        idleTime: '41m',
        activeMinutes: 401,
        idleMinutes: 41,
        productivityScore: 78,
      };
    }

    const hours = Math.floor(session.activeMinutes / 60);
    const mins = session.activeMinutes % 60;
    const idleHours = Math.floor(session.idleMinutes / 60);
    const idleMins = session.idleMinutes % 60;

    return {
      employeeName: session.employee.fullName,
      loginTime: session.sessionStart + ' AM',
      currentSession: '07h 22m',
      activeTime: `${hours}h ${mins}m`,
      idleTime: idleHours > 0 ? `${idleHours}h ${idleMins}m` : `${idleMins}m`,
      activeMinutes: session.activeMinutes,
      idleMinutes: session.idleMinutes,
      productivityScore: session.productivityScore,
    };
  }

  async getAppUsage(employeeId: string) {
    const usages = await this.prisma.applicationUsage.findMany({
      where: { employeeId },
    });

    if (usages.length === 0) {
      return [
        { appName: 'VS Code', duration: '3h 20m', durationMinutes: 200, category: 'Development', status: 'Productive', percentage: 48 },
        { appName: 'Chrome', duration: '2h 10m', durationMinutes: 130, category: 'Browsing & Research', status: 'Neutral', percentage: 31 },
        { appName: 'Slack', duration: '45m', durationMinutes: 45, category: 'Communication', status: 'Productive', percentage: 11 },
        { appName: 'YouTube', duration: '30m', durationMinutes: 30, category: 'Media', status: 'Non-productive', percentage: 7 },
        { appName: 'Terminal', duration: '15m', durationMinutes: 15, category: 'DevOps', status: 'Productive', percentage: 3 },
      ];
    }

    const total = usages.reduce((acc, u) => acc + u.durationMinutes, 0) || 1;
    return usages.map((u) => ({
      appName: u.appName,
      duration: `${Math.floor(u.durationMinutes / 60)}h ${u.durationMinutes % 60}m`,
      durationMinutes: u.durationMinutes,
      category: u.category,
      status: u.productivityType,
      percentage: Math.round((u.durationMinutes / total) * 100),
    }));
  }

  async getWebUsage(employeeId: string) {
    const usages = await this.prisma.websiteUsage.findMany({
      where: { employeeId },
    });

    if (usages.length === 0) {
      return [
        { domain: 'github.com', duration: '2h 12m', durationMinutes: 132, status: 'Productive', percentage: 55 },
        { domain: 'google.com', duration: '45m', durationMinutes: 45, status: 'Neutral', percentage: 19 },
        { domain: 'youtube.com', duration: '30m', durationMinutes: 30, status: 'Non-productive', percentage: 13 },
        { domain: 'facebook.com', duration: '15m', durationMinutes: 15, status: 'Non-productive', percentage: 6 },
        { domain: 'stackoverflow.com', duration: '18m', durationMinutes: 18, status: 'Productive', percentage: 7 },
      ];
    }

    const total = usages.reduce((acc, u) => acc + u.durationMinutes, 0) || 1;
    return usages.map((u) => ({
      domain: u.domain,
      duration: `${Math.floor(u.durationMinutes / 60)}h ${u.durationMinutes % 60}m`,
      durationMinutes: u.durationMinutes,
      status: u.productivityType,
      percentage: Math.round((u.durationMinutes / total) * 100),
    }));
  }

  async getProductivityBreakdown() {
    return {
      distribution: [
        { name: 'Productive', percentage: 72, color: '#10b981' },
        { name: 'Neutral', percentage: 18, color: '#6366f1' },
        { name: 'Non-productive', percentage: 10, color: '#ef4444' },
      ],
      rankings: [
        { name: 'Rahul Bajediyal', empId: 'EMP001', dept: 'IT', activeHours: '6h 41m', idleHours: '41m', score: 94 },
        { name: 'Aarav Deshmukh', empId: 'EMP006', dept: 'IT', activeHours: '6h 30m', idleHours: '50m', score: 91 },
        { name: 'Priya Sharma', empId: 'EMP003', dept: 'HR', activeHours: '6h 15m', idleHours: '55m', score: 89 },
        { name: 'Rohan Gupta', empId: 'EMP005', dept: 'Trading', activeHours: '6h 10m', idleHours: '1h 05m', score: 88 },
        { name: 'Sunita Menon', empId: 'EMP004', dept: 'Finance', activeHours: '5h 55m', idleHours: '1h 10m', score: 85 },
      ],
      departmentScores: [
        { name: 'IT', score: 88, activeAvg: '6.8h' },
        { name: 'Finance', score: 84, activeAvg: '6.4h' },
        { name: 'Trading', score: 82, activeAvg: '6.5h' },
        { name: 'HR', score: 79, activeAvg: '6.1h' },
        { name: 'Operations', score: 76, activeAvg: '5.9h' },
        { name: 'Sales', score: 72, activeAvg: '5.6h' },
      ],
    };
  }
}
