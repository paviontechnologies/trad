import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  async getOverview() {
    return {
      totalPayroll: 5840000,
      processedPayroll: 4995000,
      pendingPayroll: 845000,
      overtime: 340000,
      bonuses: 580000,
      deductions: 490000,
      currency: 'INR',
      currencySymbol: '₹',
      stats: [
        { label: 'Total Employees Paid', value: 108 },
        { label: 'Pending Processing', value: 20 },
        { label: 'Avg Salary', value: '₹54,074' },
        { label: 'Tax Deductions Collected', value: '₹1,62,000' },
      ],
      breakdown: [
        { name: 'Gross Salary', amount: 58000, color: '#6366f1' },
        { name: 'Total Deductions', amount: 4400, color: '#ef4444' },
        { name: 'Net Salary', amount: 53600, color: '#10b981' },
      ],
    };
  }

  async calculate(data: {
    basicSalary: number;
    hra?: number;
    bonus?: number;
    overtime?: number;
    otherDeductions?: number;
  }) {
    const basic = Number(data.basicSalary) || 40000;
    const hra = Number(data.hra) || Math.round(basic * 0.25); // 25% HRA
    const bonus = Number(data.bonus) || 5000;
    const overtime = Number(data.overtime) || 3000;

    const gross = basic + hra + bonus + overtime;

    const pf = Math.round(basic * 0.06); // 6% or 12%
    const tax = Math.round(gross * 0.026); // realistic TDS
    const otherDeductions = Number(data.otherDeductions) || 500;

    const totalDeductions = pf + tax + otherDeductions;
    const net = gross - totalDeductions;

    return {
      basicSalary: basic,
      hra,
      bonus,
      overtime,
      grossSalary: gross,
      pfDeduction: pf,
      taxDeduction: tax,
      otherDeductions,
      totalDeductions,
      netSalary: net,
    };
  }

  async getPayslip(employeeId: string, month = 'October 2026') {
    const employee = await this.prisma.employee.findFirst({
      where: {
        OR: [{ id: employeeId }, { empId: employeeId }],
      },
      include: {
        department: true,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const calc = await this.calculate({ basicSalary: 40000, hra: 10000, bonus: 5000, overtime: 3000, otherDeductions: 500 });

    return {
      company: {
        name: 'PAVION Technologies Pvt Ltd',
        address: 'Level 5, Embassy TechVillage, Outer Ring Road, Bengaluru, Karnataka 560103',
        gstin: '29ABCDE1234F1Z5',
        pan: 'ABCDE1234F',
      },
      employee: {
        empId: employee.empId,
        fullName: employee.fullName,
        designation: employee.designation,
        department: employee.department.name,
        joiningDate: employee.joiningDate,
        bankAccount: '•••• •••• •••• 4912 (HDFC Bank)',
        panNumber: 'ABCDE9876P',
        pfUan: '100928374619',
      },
      period: {
        month: 'October 2026',
        workingDays: 22,
        presentDays: 21,
        paidLeaves: 1,
        lossOfPayDays: 0,
        payDate: '31 Oct 2026',
      },
      earnings: [
        { label: 'Basic Salary', amount: calc.basicSalary },
        { label: 'House Rent Allowance (HRA)', amount: calc.hra },
        { label: 'Performance Bonus', amount: calc.bonus },
        { label: 'Overtime Allowance', amount: calc.overtime },
      ],
      deductions: [
        { label: 'Provident Fund (PF)', amount: calc.pfDeduction },
        { label: 'Tax Deducted at Source (TDS)', amount: calc.taxDeduction },
        { label: 'Professional Tax / Other', amount: calc.otherDeductions },
      ],
      grossSalary: calc.grossSalary,
      totalDeductions: calc.totalDeductions,
      netSalary: calc.netSalary,
      netInWords: 'Fifty-Three Thousand Six Hundred Rupees Only',
    };
  }
}
