import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    search?: string;
    departmentId?: string;
    roleName?: string;
    status?: string;
  }) {
    const { search, departmentId, roleName, status } = params;
    const where: any = {};

    if (departmentId) where.departmentId = departmentId;
    if (roleName) where.roleName = roleName;
    if (status) where.status = status;

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { empId: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { designation: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.employee.findMany({
      where,
      include: {
        department: true,
      },
      orderBy: { empId: 'asc' },
    });
  }

  async findById(id: string) {
    const employee = await this.prisma.employee.findFirst({
      where: {
        OR: [{ id }, { empId: id }],
      },
      include: {
        department: true,
        user: true,
        attendances: {
          orderBy: { date: 'desc' },
          take: 30,
        },
        leaveBalance: true,
        leaveRequests: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        tasks: {
          orderBy: { createdAt: 'desc' },
        },
        activitySessions: {
          orderBy: { date: 'desc' },
          take: 7,
        },
        appUsages: {
          take: 10,
        },
        webUsages: {
          take: 10,
        },
        payrolls: {
          orderBy: { createdAt: 'desc' },
          take: 6,
        },
        payslips: {
          orderBy: { generatedAt: 'desc' },
          take: 6,
        },
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  async create(data: any, operatorName = 'Admin') {
    const department = await this.prisma.department.findUnique({
      where: { id: data.departmentId },
    });

    const employee = await this.prisma.employee.create({
      data: {
        empId: data.empId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        departmentId: data.departmentId,
        designation: data.designation,
        roleName: data.roleName || 'Employee',
        managerName: data.managerName || department?.headName,
        joiningDate: new Date(data.joiningDate || new Date()),
        salary: Number(data.salary) || 45000,
        employmentType: data.employmentType || 'Full-Time',
        status: data.status || 'Active',
        avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      },
      include: {
        department: true,
      },
    });

    // Create default leave balances
    await this.prisma.leaveBalance.create({
      data: {
        employeeId: employee.id,
        annualTotal: 14,
        annualUsed: 0,
        sickTotal: 10,
        sickUsed: 0,
        casualTotal: 8,
        casualUsed: 0,
      },
    });

    // Create audit log
    await this.prisma.auditLog.create({
      data: {
        userName: operatorName,
        action: 'EMPLOYEE_CREATED',
        module: 'Employee Management',
        details: `Created new employee profile for ${employee.fullName} (${employee.empId})`,
        status: 'Success',
      },
    });

    return employee;
  }

  async getDepartments() {
    return this.prisma.department.findMany({
      include: {
        _count: {
          select: { employees: true },
        },
      },
    });
  }
}
