import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding PAVION database with realistic Indian enterprise demo data...');

  // 1. Organization Settings
  await prisma.organizationSetting.deleteMany();
  await prisma.organizationSetting.create({
    data: {
      companyName: 'PAVION Technologies Pvt Ltd',
      address: 'Level 5, Embassy TechVillage, Outer Ring Road, Bengaluru, Karnataka 560103',
      workingHoursPerDay: 8.5,
      breakDurationMinutes: 60,
      overtimeThresholdHours: 8.5,
      sessionTimeoutMinutes: 30,
      passwordExpiryDays: 90,
      twoFactorAuthRequired: false,
    },
  });

  // 2. Clear old data cleanly
  await prisma.auditLog.deleteMany();
  await prisma.securityAlert.deleteMany();
  await prisma.trade.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.payslip.deleteMany();
  await prisma.payroll.deleteMany();
  await prisma.websiteUsage.deleteMany();
  await prisma.applicationUsage.deleteMany();
  await prisma.activitySession.deleteMany();
  await prisma.task.deleteMany();
  await prisma.leaveBalance.deleteMany();
  await prisma.leaveRequest.deleteMany();
  await prisma.attendanceBreak.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.department.deleteMany();
  await prisma.user.deleteMany();

  // 3. Departments
  const itDept = await prisma.department.create({
    data: { name: 'Information Technology', code: 'IT', headName: 'Vikram Malhotra' },
  });
  const hrDept = await prisma.department.create({
    data: { name: 'Human Resources', code: 'HR', headName: 'Priya Sharma' },
  });
  const finDept = await prisma.department.create({
    data: { name: 'Finance & Accounts', code: 'FIN', headName: 'Sunita Menon' },
  });
  const salesDept = await prisma.department.create({
    data: { name: 'Sales & Marketing', code: 'SLS', headName: 'Rajesh Khanna' },
  });
  const opsDept = await prisma.department.create({
    data: { name: 'Operations', code: 'OPS', headName: 'Kavita Reddy' },
  });
  const tradeDept = await prisma.department.create({
    data: { name: 'Trading & Risk', code: 'TRD', headName: 'Rohan Gupta' },
  });

  const departments = [itDept, hrDept, finDept, salesDept, opsDept, tradeDept];

  // Passwords
  const hashAdmin = await bcrypt.hash('Admin@123', 10);
  const hashHr = await bcrypt.hash('Hr@123', 10);
  const hashManager = await bcrypt.hash('Manager@123', 10);
  const hashEmployee = await bcrypt.hash('Employee@123', 10);
  const hashFinance = await bcrypt.hash('Finance@123', 10);
  const hashTrader = await bcrypt.hash('Trader@123', 10);

  // 4. Demo Users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      passwordHash: hashAdmin,
      fullName: 'Vikram Malhotra',
      role: 'Super Admin',
    },
  });

  const hrUser = await prisma.user.create({
    data: {
      email: 'hr@demo.com',
      passwordHash: hashHr,
      fullName: 'Priya Sharma',
      role: 'HR',
    },
  });

  const managerUser = await prisma.user.create({
    data: {
      email: 'manager@demo.com',
      passwordHash: hashManager,
      fullName: 'Amit Patel',
      role: 'Manager',
    },
  });

  const employeeUser = await prisma.user.create({
    data: {
      email: 'employee@demo.com',
      passwordHash: hashEmployee,
      fullName: 'Rahul Bajediyal',
      role: 'Employee',
    },
  });

  const financeUser = await prisma.user.create({
    data: {
      email: 'finance@demo.com',
      passwordHash: hashFinance,
      fullName: 'Sunita Menon',
      role: 'Finance',
    },
  });

  const traderUser = await prisma.user.create({
    data: {
      email: 'trader@demo.com',
      passwordHash: hashTrader,
      fullName: 'Rohan Gupta',
      role: 'Trader',
    },
  });

  // 5. Featured Employees
  const rahul = await prisma.employee.create({
    data: {
      empId: 'EMP001',
      fullName: 'Rahul Bajediyal',
      email: 'employee@demo.com',
      phone: '+91 98765 43210',
      designation: 'Senior Software Engineer',
      roleName: 'Employee',
      departmentId: itDept.id,
      managerName: 'Amit Patel',
      joiningDate: new Date('2024-01-15'),
      salary: 58000,
      employmentType: 'Full-Time',
      status: 'Active',
      userId: employeeUser.id,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    },
  });

  const amit = await prisma.employee.create({
    data: {
      empId: 'EMP002',
      fullName: 'Amit Patel',
      email: 'manager@demo.com',
      phone: '+91 98765 43211',
      designation: 'Engineering Manager',
      roleName: 'Manager',
      departmentId: itDept.id,
      managerName: 'Vikram Malhotra',
      joiningDate: new Date('2022-03-10'),
      salary: 120000,
      employmentType: 'Full-Time',
      status: 'Active',
      userId: managerUser.id,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    },
  });

  const priya = await prisma.employee.create({
    data: {
      empId: 'EMP003',
      fullName: 'Priya Sharma',
      email: 'hr@demo.com',
      phone: '+91 98765 43212',
      designation: 'Lead HR Specialist',
      roleName: 'HR',
      departmentId: hrDept.id,
      managerName: 'Vikram Malhotra',
      joiningDate: new Date('2023-05-20'),
      salary: 75000,
      employmentType: 'Full-Time',
      status: 'Active',
      userId: hrUser.id,
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    },
  });

  const sunita = await prisma.employee.create({
    data: {
      empId: 'EMP004',
      fullName: 'Sunita Menon',
      email: 'finance@demo.com',
      phone: '+91 98765 43213',
      designation: 'Finance Controller',
      roleName: 'Finance',
      departmentId: finDept.id,
      managerName: 'Vikram Malhotra',
      joiningDate: new Date('2022-11-01'),
      salary: 110000,
      employmentType: 'Full-Time',
      status: 'Active',
      userId: financeUser.id,
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    },
  });

  const rohan = await prisma.employee.create({
    data: {
      empId: 'EMP005',
      fullName: 'Rohan Gupta',
      email: 'trader@demo.com',
      phone: '+91 98765 43214',
      designation: 'Senior Derivatives Trader',
      roleName: 'Trader',
      departmentId: tradeDept.id,
      managerName: 'Vikram Malhotra',
      joiningDate: new Date('2023-08-14'),
      salary: 140000,
      employmentType: 'Full-Time',
      status: 'Active',
      userId: traderUser.id,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    },
  });

  // 6. Generate 45 additional realistic employees
  const names = [
    'Aarav Deshmukh', 'Ananya Iyer', 'Aditya Kulkarni', 'Diya Sengupta', 'Ishaan Bhatt',
    'Neha Chawla', 'Suresh Nair', 'Sneha Joshi', 'Varun Kapoor', 'Pooja Hegde',
    'Manish Tiwari', 'Deepa Pillai', 'Arjun Nambiar', 'Meera Rao', 'Siddharth Roy',
    'Tanvi Saxena', 'Gaurav Aggarwal', 'Divya Sundaram', 'Harsh Vardhan', 'Shreya Mukherjee',
    'Kunal Bansal', 'Ritu Mathur', 'Vivek Dubey', 'Roshni Chopra', 'Alok Verma',
    'Natasha Paul', 'Naveen Reddy', 'Swati Das', 'Tarun Sethi', 'Komal Pandey',
    'Abhishek Jain', 'Shalini Mittal', 'Rohit Singhania', 'Bhavna Chauhan', 'Sanjay Bhatia',
    'Geeta Nanda', 'Pranav Mehra', 'Rashmi Anand', 'Hemant Yadav', 'Richa Ghosh',
    'Chetan Rawat', 'Vandana Kaul', 'Mohit Soni', 'Preeti Grover', 'Yashwant Patil'
  ];

  const designMap = [
    { role: 'Developer', title: 'Full Stack Engineer', dept: itDept },
    { role: 'Developer', title: 'Backend Engineer', dept: itDept },
    { role: 'Developer', title: 'Frontend Specialist', dept: itDept },
    { role: 'QA', title: 'QA Automation Engineer', dept: itDept },
    { role: 'HR', title: 'HR Generalist', dept: hrDept },
    { role: 'HR', title: 'Talent Acquisition Partner', dept: hrDept },
    { role: 'Finance', title: 'Financial Analyst', dept: finDept },
    { role: 'Finance', title: 'Accounts Executive', dept: finDept },
    { role: 'Sales', title: 'Account Executive', dept: salesDept },
    { role: 'Sales', title: 'Business Development Specialist', dept: salesDept },
    { role: 'Operations', title: 'Operations Executive', dept: opsDept },
    { role: 'Trader', title: 'Quant Trading Analyst', dept: tradeDept },
  ];

  const createdEmployees = [rahul, amit, priya, sunita, rohan];

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const item = designMap[i % designMap.length];
    const empNum = (i + 6).toString().padStart(3, '0');
    const isOnline = i % 3 === 0;
    const empStatus = i === 12 ? 'On Leave' : (i === 24 ? 'Absent' : 'Active');

    const emp = await prisma.employee.create({
      data: {
        empId: `EMP${empNum}`,
        fullName: name,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@pavion.demo`,
        phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
        designation: item.title,
        roleName: item.role,
        departmentId: item.dept.id,
        managerName: item.dept.headName,
        joiningDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 25) + 1),
        salary: Math.floor(35000 + Math.random() * 55000),
        employmentType: 'Full-Time',
        status: empStatus,
      },
    });
    createdEmployees.push(emp);
  }

  // 7. Rahul Bajediyal's Detailed Records
  // Attendance
  await prisma.attendance.create({
    data: {
      employeeId: rahul.id,
      date: '2026-10-08',
      checkIn: '09:12',
      checkOut: null,
      workingMinutes: 401, // 6h 41m
      breakMinutes: 45,
      overtimeMinutes: 0,
      status: 'Present',
    },
  });

  // Leave Balances
  await prisma.leaveBalance.create({
    data: {
      employeeId: rahul.id,
      annualTotal: 14,
      annualUsed: 5,
      sickTotal: 10,
      sickUsed: 2,
      casualTotal: 8,
      casualUsed: 1,
    },
  });

  // Pending Leave Request for Demo
  await prisma.leaveRequest.create({
    data: {
      employeeId: rahul.id,
      leaveType: 'Annual',
      startDate: '2026-10-15',
      endDate: '2026-10-17',
      daysCount: 3,
      reason: 'Attending family wedding ceremony in Uttarakhand',
      status: 'PENDING',
    },
  });

  // Approved Leave for History
  await prisma.leaveRequest.create({
    data: {
      employeeId: rahul.id,
      leaveType: 'Casual',
      startDate: '2026-09-12',
      endDate: '2026-09-12',
      daysCount: 1,
      reason: 'Personal errands',
      status: 'APPROVED',
      approvedBy: 'Amit Patel',
      reviewedAt: new Date('2026-09-10'),
    },
  });

  // Activity Session
  await prisma.activitySession.create({
    data: {
      employeeId: rahul.id,
      date: '2026-10-08',
      sessionStart: '09:12',
      activeMinutes: 401, // 6h 41m
      idleMinutes: 41,    // 41m
      productivityScore: 78,
    },
  });

  // Application Usage
  await prisma.applicationUsage.createMany({
    data: [
      { employeeId: rahul.id, date: '2026-10-08', appName: 'VS Code', category: 'Development', durationMinutes: 200, productivityType: 'Productive' },
      { employeeId: rahul.id, date: '2026-10-08', appName: 'Chrome', category: 'Browsing & Research', durationMinutes: 130, productivityType: 'Neutral' },
      { employeeId: rahul.id, date: '2026-10-08', appName: 'Slack', category: 'Communication', durationMinutes: 45, productivityType: 'Productive' },
      { employeeId: rahul.id, date: '2026-10-08', appName: 'YouTube', category: 'Media', durationMinutes: 30, productivityType: 'Non-productive' },
    ],
  });

  // Website Usage
  await prisma.websiteUsage.createMany({
    data: [
      { employeeId: rahul.id, date: '2026-10-08', domain: 'github.com', category: 'Code Collaboration', durationMinutes: 132, productivityType: 'Productive' },
      { employeeId: rahul.id, date: '2026-10-08', domain: 'google.com', category: 'Search & Docs', durationMinutes: 45, productivityType: 'Neutral' },
      { employeeId: rahul.id, date: '2026-10-08', domain: 'youtube.com', category: 'Entertainment', durationMinutes: 30, productivityType: 'Non-productive' },
      { employeeId: rahul.id, date: '2026-10-08', domain: 'facebook.com', category: 'Social Media', durationMinutes: 15, productivityType: 'Non-productive' },
    ],
  });

  // Tasks
  await prisma.task.createMany({
    data: [
      { employeeId: rahul.id, title: 'Refactor Auth middleware for RBAC', priority: 'HIGH', status: 'COMPLETED', dueDate: '2026-10-07' },
      { employeeId: rahul.id, title: 'Integrate Recharts with Productivity Dashboard', priority: 'HIGH', status: 'COMPLETED', dueDate: '2026-10-07' },
      { employeeId: rahul.id, title: 'Optimize PostgreSQL queries for attendance log', priority: 'MEDIUM', status: 'COMPLETED', dueDate: '2026-10-08' },
      { employeeId: rahul.id, title: 'Setup automated CSV export for HR reports', priority: 'MEDIUM', status: 'COMPLETED', dueDate: '2026-10-08' },
      { employeeId: rahul.id, title: 'Create printable payslip PDF template', priority: 'HIGH', status: 'COMPLETED', dueDate: '2026-10-08' },
      { employeeId: rahul.id, title: 'Implement real-time break counter timer', priority: 'MEDIUM', status: 'IN_PROGRESS', dueDate: '2026-10-09' },
      { employeeId: rahul.id, title: 'Add unit tests for payroll salary deductions', priority: 'LOW', status: 'PENDING', dueDate: '2026-10-10' },
      { employeeId: rahul.id, title: 'Review security audit alert webhooks', priority: 'HIGH', status: 'PENDING', dueDate: '2026-10-11' },
    ],
  });

  // Payroll for Rahul
  const payrollRecord = await prisma.payroll.create({
    data: {
      employeeId: rahul.id,
      month: 'October 2026',
      basicSalary: 40000,
      hra: 10000,
      bonus: 5000,
      overtimePay: 3000,
      grossSalary: 58000,
      pfDeduction: 2400,
      taxDeduction: 1500,
      otherDeductions: 500,
      netSalary: 53600,
      status: 'PROCESSED',
    },
  });

  await prisma.payslip.create({
    data: {
      payrollId: payrollRecord.id,
      employeeId: rahul.id,
      payslipNumber: 'PAY-2026-10-001',
      monthYear: 'October 2026',
      grossSalary: 58000,
      netSalary: 53600,
    },
  });

  // 8. Security Alerts
  await prisma.securityAlert.createMany({
    data: [
      {
        title: 'Failed Login Attempt',
        description: 'Rahul Bajediyal - 3 consecutive failed login attempts detected from IP 192.168.1.189',
        alertType: 'FAILED_LOGIN',
        severity: 'HIGH',
        targetUser: 'Rahul Bajediyal',
      },
      {
        title: 'External File Sharing',
        description: 'Finance_Report_Q3.xlsx shared externally to non-whitelisted domain gmail.com',
        alertType: 'EXTERNAL_SHARE',
        severity: 'CRITICAL',
        targetUser: 'Amit Patel',
      },
      {
        title: 'Unauthorized Access Attempt',
        description: 'Restricted Payroll Module accessed outside authorized office IP subnet',
        alertType: 'UNAUTHORIZED_ACCESS',
        severity: 'HIGH',
        targetUser: 'Unknown / VPN',
      },
      {
        title: 'Suspicious Data Export',
        description: 'Bulk Employee Directory (50 records) exported to CSV at 02:14 AM',
        alertType: 'DATA_EXPORT',
        severity: 'MEDIUM',
        targetUser: 'System Backup / Admin',
      },
      {
        title: 'Permission Violation',
        description: 'Trader account attempted to modify HR department leave policies',
        alertType: 'PERMISSION_VIOLATION',
        severity: 'LOW',
        targetUser: 'Rohan Gupta',
      },
    ],
  });

  // 9. Audit Logs
  await prisma.auditLog.createMany({
    data: [
      { userName: 'Rahul Bajediyal', action: 'LOGIN_SUCCESS', module: 'Web Portal', details: 'Authenticated via email/password', ipAddress: '192.168.1.104', device: 'Chrome 128 / macOS', status: 'Success' },
      { userName: 'Amit Patel', action: 'EXPORT_REPORT', module: 'Payroll', details: 'Exported monthly payroll summary', ipAddress: '192.168.1.45', device: 'Safari 18 / macOS', status: 'Success' },
      { userName: 'Rahul Bajediyal', action: 'FAILED_LOGIN', module: 'Web Portal', details: 'Incorrect password attempt (2/3)', ipAddress: '192.168.1.189', device: 'Firefox / Windows', status: 'Failed' },
      { userName: 'Priya Sharma', action: 'LEAVE_APPROVED', module: 'Leave Management', details: 'Approved leave request for EMP008', ipAddress: '192.168.1.22', device: 'Chrome 128 / macOS', status: 'Success' },
      { userName: 'Vikram Malhotra', action: 'PERMISSION_UPDATE', module: 'Users & Roles', details: 'Elevated Finance team privileges', ipAddress: '192.168.1.10', device: 'Edge / macOS', status: 'Success' },
      { userName: 'Rohan Gupta', action: 'TRADE_REQUEST', module: 'Trading', details: 'Submitted Buy order for NIFTY 24500 CE', ipAddress: '192.168.1.88', device: 'Chrome 128 / Linux', status: 'Success' },
      { userName: 'Sunita Menon', action: 'PAYSLIP_GENERATED', module: 'Payroll', details: 'Generated October batch payslips (50)', ipAddress: '192.168.1.66', device: 'Chrome 128 / Windows', status: 'Success' },
      { userName: 'Unknown User', action: 'UNAUTHORIZED_ACCESS', module: 'Security Gateway', details: 'Blocked direct access to /api/admin/secrets', ipAddress: '103.21.244.12', device: 'curl/7.88', status: 'Failed' },
    ],
  });

  // 10. Trades
  await prisma.trade.createMany({
    data: [
      { tradeCode: 'TRD-1001', traderName: 'Rohan Gupta', symbol: 'NIFTY 24500 CE', type: 'BUY', quantity: 500, entryPrice: 142.50, exitPrice: 188.00, pnl: 22750, status: 'APPROVED' },
      { tradeCode: 'TRD-1002', traderName: 'Rohan Gupta', symbol: 'RELIANCE', type: 'BUY', quantity: 250, entryPrice: 2980.00, exitPrice: 3045.00, pnl: 16250, status: 'APPROVED' },
      { tradeCode: 'TRD-1003', traderName: 'Rohan Gupta', symbol: 'TCS', type: 'SELL', quantity: 100, entryPrice: 4220.00, exitPrice: 4180.00, pnl: 4000, status: 'APPROVED' },
      { tradeCode: 'TRD-1004', traderName: 'Aarav Deshmukh', symbol: 'INFY', type: 'BUY', quantity: 400, entryPrice: 1890.00, exitPrice: 1870.00, pnl: -8000, status: 'APPROVED' },
      { tradeCode: 'TRD-1005', traderName: 'Rohan Gupta', symbol: 'HDFCBANK', type: 'BUY', quantity: 300, entryPrice: 1680.00, exitPrice: null, pnl: 3200, status: 'PENDING' },
      { tradeCode: 'TRD-1006', traderName: 'Aditya Kulkarni', symbol: 'ICICIBANK', type: 'BUY', quantity: 350, entryPrice: 1240.00, exitPrice: null, pnl: 1850, status: 'PENDING' },
    ],
  });

  // 11. Notifications
  await prisma.notification.createMany({
    data: [
      { userId: rahul.userId, title: 'Leave Application Received', message: 'Your annual leave request for Oct 15 - Oct 17 is under manager review.', type: 'INFO' },
      { userId: rahul.userId, title: 'October Payslip Available', message: 'Your payslip for October 2026 has been generated. Net Salary: ₹53,600.', type: 'SUCCESS' },
      { userId: adminUser.id, title: 'Security Alert: Failed Login', message: '3 failed attempts recorded for user Rahul Bajediyal from IP 192.168.1.189.', type: 'WARNING' },
      { userId: managerUser.id, title: 'New Leave Approval Needed', message: 'Rahul Bajediyal has requested 3 days of Annual leave.', type: 'INFO' },
    ],
  });

  console.log('✅ PAVION Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
