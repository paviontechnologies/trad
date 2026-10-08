import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) {}

  async apply(data: {
    employeeId: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    daysCount: number;
    reason: string;
    attachment?: string;
  }) {
    const leave = await this.prisma.leaveRequest.create({
      data: {
        employeeId: data.employeeId,
        leaveType: data.leaveType,
        startDate: data.startDate,
        endDate: data.endDate,
        daysCount: Number(data.daysCount) || 1,
        reason: data.reason,
        attachment: data.attachment,
        status: 'PENDING',
      },
      include: {
        employee: true,
      },
    });

    // Create Audit Log
    await this.prisma.auditLog.create({
      data: {
        userName: leave.employee.fullName,
        action: 'LEAVE_APPLIED',
        module: 'Leave Management',
        details: `Applied for ${data.daysCount} day(s) ${data.leaveType} leave`,
        status: 'Success',
      },
    });

    return leave;
  }

  async getBalances(employeeId: string) {
    let balance = await this.prisma.leaveBalance.findUnique({
      where: { employeeId },
    });

    if (!balance) {
      balance = await this.prisma.leaveBalance.create({
        data: {
          employeeId,
          annualTotal: 14,
          annualUsed: 5,
          sickTotal: 10,
          sickUsed: 2,
          casualTotal: 8,
          casualUsed: 1,
        },
      });
    }

    return {
      annual: { total: balance.annualTotal, used: balance.annualUsed, remaining: balance.annualTotal - balance.annualUsed },
      sick: { total: balance.sickTotal, used: balance.sickUsed, remaining: balance.sickTotal - balance.sickUsed },
      casual: { total: balance.casualTotal, used: balance.casualUsed, remaining: balance.casualTotal - balance.casualUsed },
    };
  }

  async getAllRequests(status?: string) {
    const where: any = {};
    if (status) where.status = status;

    return this.prisma.leaveRequest.findMany({
      where,
      include: {
        employee: {
          include: { department: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMyRequests(employeeId: string) {
    return this.prisma.leaveRequest.findMany({
      where: { employeeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approve(id: string, reviewerName = 'Manager') {
    const request = await this.prisma.leaveRequest.findUnique({
      where: { id },
      include: { employee: true },
    });

    if (!request) {
      throw new NotFoundException('Leave request not found');
    }

    const updated = await this.prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'APPROVED',
        approvedBy: reviewerName,
        reviewedAt: new Date(),
      },
    });

    // Update leave balance
    const fieldMap: Record<string, 'annualUsed' | 'sickUsed' | 'casualUsed'> = {
      Annual: 'annualUsed',
      Sick: 'sickUsed',
      Casual: 'casualUsed',
    };
    const field = fieldMap[request.leaveType] || 'casualUsed';

    await this.prisma.leaveBalance.update({
      where: { employeeId: request.employeeId },
      data: {
        [field]: { increment: request.daysCount },
      },
    }).catch(() => null);

    // Audit Log
    await this.prisma.auditLog.create({
      data: {
        userName: reviewerName,
        action: 'LEAVE_APPROVED',
        module: 'Leave Management',
        details: `Approved ${request.leaveType} leave for ${request.employee.fullName}`,
        status: 'Success',
      },
    });

    return updated;
  }

  async reject(id: string, reviewerName = 'Manager') {
    const request = await this.prisma.leaveRequest.findUnique({
      where: { id },
      include: { employee: true },
    });

    if (!request) {
      throw new NotFoundException('Leave request not found');
    }

    const updated = await this.prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'REJECTED',
        approvedBy: reviewerName,
        reviewedAt: new Date(),
      },
    });

    // Audit Log
    await this.prisma.auditLog.create({
      data: {
        userName: reviewerName,
        action: 'LEAVE_REJECTED',
        module: 'Leave Management',
        details: `Rejected ${request.leaveType} leave for ${request.employee.fullName}`,
        status: 'Warning',
      },
    });

    return updated;
  }
}
