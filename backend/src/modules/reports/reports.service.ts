import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async generateReport(type = 'attendance', filters: any = {}) {
    if (type === 'attendance') {
      const records = await this.prisma.attendance.findMany({
        include: { employee: { include: { department: true } } },
        take: 30,
        orderBy: { date: 'desc' },
      });
      return {
        type: 'Attendance Report',
        generatedAt: new Date().toISOString(),
        columns: ['Employee ID', 'Name', 'Department', 'Date', 'Check In', 'Check Out', 'Working Hours', 'Status'],
        data: records.map((r) => ({
          'Employee ID': r.employee.empId,
          Name: r.employee.fullName,
          Department: r.employee.department.name,
          Date: r.date,
          'Check In': r.checkIn || '-',
          'Check Out': r.checkOut || '-',
          'Working Hours': `${Math.floor(r.workingMinutes / 60)}h ${r.workingMinutes % 60}m`,
          Status: r.status,
        })),
      };
    }

    if (type === 'productivity') {
      const employees = await this.prisma.employee.findMany({
        include: { department: true },
        take: 30,
      });
      return {
        type: 'Productivity Report',
        generatedAt: new Date().toISOString(),
        columns: ['Employee ID', 'Name', 'Department', 'Active Hours', 'Idle Hours', 'Score', 'Status'],
        data: employees.map((e, idx) => ({
          'Employee ID': e.empId,
          Name: e.fullName,
          Department: e.department.name,
          'Active Hours': '6h 35m',
          'Idle Hours': '45m',
          Score: idx === 0 ? '94%' : `${Math.floor(75 + Math.random() * 20)}%`,
          Status: 'High Performer',
        })),
      };
    }

    if (type === 'payroll') {
      const payrolls = await this.prisma.payroll.findMany({
        include: { employee: { include: { department: true } } },
        take: 30,
      });
      return {
        type: 'Payroll Report',
        generatedAt: new Date().toISOString(),
        columns: ['Employee ID', 'Name', 'Month', 'Basic', 'Gross Salary', 'Deductions', 'Net Salary', 'Status'],
        data: payrolls.map((p) => ({
          'Employee ID': p.employee.empId,
          Name: p.employee.fullName,
          Month: p.month,
          Basic: `₹${p.basicSalary.toLocaleString('en-IN')}`,
          'Gross Salary': `₹${p.grossSalary.toLocaleString('en-IN')}`,
          Deductions: `₹${(p.pfDeduction + p.taxDeduction + p.otherDeductions).toLocaleString('en-IN')}`,
          'Net Salary': `₹${p.netSalary.toLocaleString('en-IN')}`,
          Status: p.status,
        })),
      };
    }

    if (type === 'security') {
      const logs = await this.prisma.auditLog.findMany({
        take: 30,
        orderBy: { timestamp: 'desc' },
      });
      return {
        type: 'Security Audit Report',
        generatedAt: new Date().toISOString(),
        columns: ['Timestamp', 'User', 'Action', 'Module', 'IP Address', 'Device', 'Status'],
        data: logs.map((l) => ({
          Timestamp: l.timestamp.toISOString(),
          User: l.userName,
          Action: l.action,
          Module: l.module,
          'IP Address': l.ipAddress,
          Device: l.device,
          Status: l.status,
        })),
      };
    }

    // Default: Employee Master Report
    const emps = await this.prisma.employee.findMany({
      include: { department: true },
      take: 50,
    });
    return {
      type: 'Employee Master Report',
      generatedAt: new Date().toISOString(),
      columns: ['Employee ID', 'Name', 'Email', 'Department', 'Designation', 'Status', 'Joining Date', 'Manager'],
      data: emps.map((e) => ({
        'Employee ID': e.empId,
        Name: e.fullName,
        Email: e.email,
        Department: e.department.name,
        Designation: e.designation,
        Status: e.status,
        'Joining Date': e.joiningDate.toISOString().split('T')[0],
        Manager: e.managerName || '-',
      })),
    };
  }
}
