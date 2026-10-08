import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  private getTodayDateString(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  private getCurrentTimeString(): string {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }

  async getTodayStatus(employeeId: string) {
    const todayDate = this.getTodayDateString();
    let record = await this.prisma.attendance.findUnique({
      where: {
        employeeId_date: {
          employeeId,
          date: todayDate,
        },
      },
      include: {
        breaks: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!record) {
      return {
        date: todayDate,
        checkIn: null,
        checkOut: null,
        workingMinutes: 0,
        breakMinutes: 0,
        status: 'Not Checked In',
        isOnBreak: false,
      };
    }

    const latestBreak = record.breaks[0];
    const isOnBreak = latestBreak && !latestBreak.endTime;

    return {
      ...record,
      isOnBreak,
    };
  }

  async checkIn(employeeId: string) {
    const todayDate = this.getTodayDateString();
    const timeNow = this.getCurrentTimeString();

    let record = await this.prisma.attendance.findUnique({
      where: {
        employeeId_date: { employeeId, date: todayDate },
      },
    });

    if (record && record.checkIn) {
      return record;
    }

    return this.prisma.attendance.upsert({
      where: { employeeId_date: { employeeId, date: todayDate } },
      create: {
        employeeId,
        date: todayDate,
        checkIn: timeNow,
        workingMinutes: 0,
        breakMinutes: 0,
        status: 'Present',
      },
      update: {
        checkIn: timeNow,
        status: 'Present',
      },
    });
  }

  async startBreak(employeeId: string) {
    const todayDate = this.getTodayDateString();
    const timeNow = this.getCurrentTimeString();

    const attendance = await this.prisma.attendance.findUnique({
      where: { employeeId_date: { employeeId, date: todayDate } },
      include: { breaks: true },
    });

    if (!attendance) {
      throw new BadRequestException('Must check in before starting a break');
    }

    const openBreak = attendance.breaks.find((b) => !b.endTime);
    if (openBreak) {
      return openBreak;
    }

    return this.prisma.attendanceBreak.create({
      data: {
        attendanceId: attendance.id,
        startTime: timeNow,
      },
    });
  }

  async endBreak(employeeId: string) {
    const todayDate = this.getTodayDateString();
    const timeNow = this.getCurrentTimeString();

    const attendance = await this.prisma.attendance.findUnique({
      where: { employeeId_date: { employeeId, date: todayDate } },
      include: { breaks: { where: { endTime: null } } },
    });

    if (!attendance || attendance.breaks.length === 0) {
      throw new BadRequestException('No active break to end');
    }

    const currentBreak = attendance.breaks[0];
    const updatedBreak = await this.prisma.attendanceBreak.update({
      where: { id: currentBreak.id },
      data: {
        endTime: timeNow,
        durationMins: 45, // default realistic demo increment
      },
    });

    // update attendance total break
    await this.prisma.attendance.update({
      where: { id: attendance.id },
      data: {
        breakMinutes: { increment: 45 },
      },
    });

    return updatedBreak;
  }

  async checkOut(employeeId: string) {
    const todayDate = this.getTodayDateString();
    const timeNow = this.getCurrentTimeString();

    const attendance = await this.prisma.attendance.findUnique({
      where: { employeeId_date: { employeeId, date: todayDate } },
    });

    if (!attendance) {
      throw new BadRequestException('No attendance record found for today');
    }

    return this.prisma.attendance.update({
      where: { id: attendance.id },
      data: {
        checkOut: timeNow,
        workingMinutes: 480, // 8 hours
      },
    });
  }

  async getStats() {
    return {
      totalEmployees: 128,
      presentToday: 112,
      absentToday: 8,
      onLeaveToday: 8,
      currentlyOnline: 74,
      totalWorkingHours: 682,
      pendingPayroll: 845000,
      securityAlerts: 7,
      breakdown: [
        { name: 'Present', value: 112, color: '#10b981' },
        { name: 'Absent', value: 8, color: '#ef4444' },
        { name: 'On Leave', value: 8, color: '#f59e0b' },
      ],
      departments: [
        { name: 'IT', present: 45, total: 48, rate: 93.7 },
        { name: 'HR', present: 11, total: 12, rate: 91.6 },
        { name: 'Finance', present: 18, total: 20, rate: 90.0 },
        { name: 'Sales', present: 22, total: 26, rate: 84.6 },
        { name: 'Operations', present: 12, total: 14, rate: 85.7 },
        { name: 'Trading', present: 4, total: 8, rate: 50.0 },
      ],
    };
  }

  async getHistory(employeeId?: string) {
    const where: any = {};
    if (employeeId) where.employeeId = employeeId;

    return this.prisma.attendance.findMany({
      where,
      include: {
        employee: {
          select: { fullName: true, empId: true, department: true },
        },
      },
      orderBy: { date: 'desc' },
      take: 50,
    });
  }
}
