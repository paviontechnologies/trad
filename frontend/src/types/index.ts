export type UserRole =
  | 'Super Admin'
  | 'Management'
  | 'HR'
  | 'Finance'
  | 'Manager'
  | 'Trader'
  | 'Employee';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  employeeId?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headName?: string;
  employeeCount?: number;
}

export interface Employee {
  id: string;
  empId: string;
  fullName: string;
  email: string;
  phone?: string;
  departmentId: string;
  departmentName?: string;
  designation: string;
  roleName: string;
  managerName?: string;
  joiningDate: string;
  salary: number;
  employmentType: string;
  status: 'Active' | 'On Leave' | 'Absent' | 'Inactive';
  avatarUrl?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName?: string;
  empId?: string;
  department?: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  workingMinutes: number;
  breakMinutes: number;
  overtimeMinutes: number;
  status: 'Present' | 'Absent' | 'Half Day' | 'On Leave' | 'Late';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  empId: string;
  departmentName: string;
  leaveType: 'Annual' | 'Sick' | 'Casual' | 'Maternity' | 'Unpaid';
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  attachment?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedBy?: string;
  reviewedAt?: string;
}

export interface LeaveBalance {
  annual: { total: number; used: number; remaining: number };
  sick: { total: number; used: number; remaining: number };
  casual: { total: number; used: number; remaining: number };
}

export interface AppUsage {
  appName: string;
  category: string;
  duration: string;
  durationMinutes: number;
  status: 'Productive' | 'Neutral' | 'Non-productive';
  percentage: number;
}

export interface WebUsage {
  domain: string;
  category?: string;
  duration: string;
  durationMinutes: number;
  status: 'Productive' | 'Neutral' | 'Non-productive';
  percentage: number;
}

export interface ActivitySession {
  employeeName: string;
  loginTime: string;
  currentSession: string;
  activeTime: string;
  idleTime: string;
  activeMinutes: number;
  idleMinutes: number;
  productivityScore: number;
}

export interface AuditLog {
  id: string;
  userName: string;
  action: string;
  module: string;
  details?: string;
  ipAddress: string;
  device: string;
  status: 'Success' | 'Failed' | 'Warning';
  timestamp: string;
}

export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  alertType: 'FAILED_LOGIN' | 'EXTERNAL_SHARE' | 'UNAUTHORIZED_ACCESS' | 'DATA_EXPORT' | 'PERMISSION_VIOLATION';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  targetUser?: string;
  isResolved: boolean;
  createdAt: string;
}

export interface Trade {
  id: string;
  tradeCode: string;
  traderName: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  entryPrice: number;
  exitPrice?: number | null;
  pnl: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  isRead: boolean;
  createdAt: string;
}
