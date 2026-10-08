'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Employee,
  LeaveRequest,
  LeaveBalance,
  AttendanceRecord,
  SecurityAlert,
  AuditLog,
  Trade,
  NotificationItem,
} from '../types';
import {
  initialEmployees,
  initialLeaveRequests,
  rahulLeaveBalances,
  initialAttendanceRecords,
  initialSecurityAlerts,
  initialAuditLogs,
  initialTrades,
  initialNotifications,
} from './data';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  currentEmployee: Employee | null;
  switchRole: (role: UserRole) => void;
  login: (email: string, pass: string) => boolean;
  logout: () => void;

  // App Data & Real Actions
  employees: Employee[];
  addEmployee: (emp: Partial<Employee>) => void;

  leaveRequests: LeaveRequest[];
  leaveBalances: LeaveBalance;
  applyLeave: (req: Partial<LeaveRequest>) => void;
  approveLeave: (id: string) => void;
  rejectLeave: (id: string) => void;

  attendanceRecords: AttendanceRecord[];
  todayAttendance: {
    checkIn: string | null;
    checkOut: string | null;
    workingTime: string;
    breakTime: string;
    workingMinutes: number;
    breakMinutes: number;
    isCheckedIn: boolean;
    isOnBreak: boolean;
  };
  checkIn: () => void;
  startBreak: () => void;
  endBreak: () => void;
  checkOut: () => void;

  securityAlerts: SecurityAlert[];
  resolveAlert: (id: string) => void;

  auditLogs: AuditLog[];
  addAuditLog: (action: string, module: string, details: string, status?: 'Success' | 'Failed') => void;

  trades: Trade[];
  requestTrade: (symbol: string, type: 'BUY' | 'SELL', quantity: number, price: number) => void;
  approveTrade: (id: string) => void;
  rejectTrade: (id: string) => void;

  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('Super Admin');
  const [user, setUser] = useState<User | null>({
    id: 'user-admin',
    email: 'admin@demo.com',
    fullName: 'Vikram Malhotra',
    role: 'Super Admin',
  });

  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance>(rahulLeaveBalances);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>(initialSecurityAlerts);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [trades, setTrades] = useState<Trade[]>(initialTrades);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Live Attendance for Employee (Rahul Bajediyal)
  const [todayAttendance, setTodayAttendance] = useState({
    checkIn: '09:12 AM',
    checkOut: null as string | null,
    workingTime: '06h 42m',
    breakTime: '00h 45m',
    workingMinutes: 402,
    breakMinutes: 45,
    isCheckedIn: true,
    isOnBreak: false,
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const addAuditLog = (action: string, module: string, details: string, status: 'Success' | 'Failed' = 'Success') => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      userName: user?.fullName || 'Current User',
      action,
      module,
      details,
      ipAddress: '192.168.1.104',
      device: 'Chrome / macOS',
      status,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    let name = 'Vikram Malhotra';
    let email = 'admin@demo.com';

    if (newRole === 'HR') {
      name = 'Priya Sharma';
      email = 'hr@demo.com';
    } else if (newRole === 'Manager') {
      name = 'Amit Patel';
      email = 'manager@demo.com';
    } else if (newRole === 'Employee') {
      name = 'Rahul Bajediyal';
      email = 'employee@demo.com';
    } else if (newRole === 'Finance') {
      name = 'Sunita Menon';
      email = 'finance@demo.com';
    } else if (newRole === 'Trader') {
      name = 'Rohan Gupta';
      email = 'trader@demo.com';
    }

    setUser({
      id: `user-${newRole.toLowerCase()}`,
      email,
      fullName: name,
      role: newRole,
      employeeId: newRole === 'Employee' ? 'emp-1' : undefined,
    });

    showToast(`Switched active view to ${newRole} (${name})`, 'info');
  };

  const login = (email: string, pass: string): boolean => {
    const lowerEmail = email.toLowerCase().trim();
    if (lowerEmail.includes('admin')) {
      switchRole('Super Admin');
    } else if (lowerEmail.includes('hr')) {
      switchRole('HR');
    } else if (lowerEmail.includes('manager')) {
      switchRole('Manager');
    } else if (lowerEmail.includes('employee') || lowerEmail.includes('rahul')) {
      switchRole('Employee');
    } else if (lowerEmail.includes('finance')) {
      switchRole('Finance');
    } else if (lowerEmail.includes('trader')) {
      switchRole('Trader');
    } else {
      switchRole('Super Admin');
    }
    showToast('Login successful! Welcome to PAVION Platform', 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('You have been logged out safely', 'info');
  };

  const addEmployee = (empData: Partial<Employee>) => {
    const newEmp: Employee = {
      id: `emp-${Date.now()}`,
      empId: empData.empId || `EMP0${employees.length + 1}`,
      fullName: empData.fullName || 'New Employee',
      email: empData.email || 'employee@pavion.demo',
      phone: empData.phone || '+91 98000 00000',
      departmentId: empData.departmentId || 'dept-1',
      departmentName: empData.departmentName || 'Information Technology',
      designation: empData.designation || 'Software Engineer',
      roleName: empData.roleName || 'Employee',
      managerName: empData.managerName || 'Amit Patel',
      joiningDate: empData.joiningDate || new Date().toISOString().split('T')[0],
      salary: Number(empData.salary) || 50000,
      employmentType: empData.employmentType || 'Full-Time',
      status: (empData.status as any) || 'Active',
      avatarUrl: empData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    };
    setEmployees((prev) => [newEmp, ...prev]);
    addAuditLog('EMPLOYEE_CREATED', 'Employee Management', `Added new employee ${newEmp.fullName} (${newEmp.empId})`);
    showToast(`Employee ${newEmp.fullName} successfully registered!`, 'success');
  };

  const applyLeave = (req: Partial<LeaveRequest>) => {
    const newLeave: LeaveRequest = {
      id: `leave-${Date.now()}`,
      employeeId: 'emp-1',
      employeeName: 'Rahul Bajediyal',
      empId: 'EMP001',
      departmentName: 'Information Technology',
      leaveType: req.leaveType || 'Annual',
      startDate: req.startDate || '2026-10-20',
      endDate: req.endDate || '2026-10-22',
      daysCount: req.daysCount || 2,
      reason: req.reason || 'Personal leave request',
      attachment: req.attachment,
      status: 'PENDING',
    };
    setLeaveRequests((prev) => [newLeave, ...prev]);
    addAuditLog('LEAVE_APPLIED', 'Leave Management', `Applied for ${newLeave.daysCount} days of ${newLeave.leaveType} leave`);
    showToast(`Leave application submitted for approval!`, 'success');
  };

  const approveLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'APPROVED', approvedBy: `${user?.fullName} (${role})` } : l))
    );
    // Update balance
    setLeaveBalances((prev) => ({
      ...prev,
      annual: { ...prev.annual, used: prev.annual.used + 1, remaining: Math.max(0, prev.annual.remaining - 1) },
    }));
    addAuditLog('LEAVE_APPROVED', 'Leave Management', `Approved leave request #${id}`);
    showToast(`Leave request approved successfully!`, 'success');
  };

  const rejectLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'REJECTED', approvedBy: `${user?.fullName} (${role})` } : l))
    );
    addAuditLog('LEAVE_REJECTED', 'Leave Management', `Rejected leave request #${id}`, 'Failed');
    showToast(`Leave request marked as rejected`, 'error');
  };

  // Punch actions
  const checkIn = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTodayAttendance((prev) => ({
      ...prev,
      checkIn: time,
      checkOut: null,
      isCheckedIn: true,
      isOnBreak: false,
    }));
    addAuditLog('PUNCH_IN', 'Attendance', `Employee checked in at ${time}`);
    showToast(`Checked in successfully at ${time}! Have a productive day.`, 'success');
  };

  const startBreak = () => {
    setTodayAttendance((prev) => ({
      ...prev,
      isOnBreak: true,
    }));
    addAuditLog('BREAK_START', 'Attendance', 'Employee started break');
    showToast(`Break started. Timer is now running.`, 'info');
  };

  const endBreak = () => {
    setTodayAttendance((prev) => ({
      ...prev,
      isOnBreak: false,
      breakMinutes: prev.breakMinutes + 15,
      breakTime: '01h 00m',
    }));
    addAuditLog('BREAK_END', 'Attendance', 'Employee returned from break');
    showToast(`Break ended. Welcome back to work!`, 'success');
  };

  const checkOut = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTodayAttendance((prev) => ({
      ...prev,
      checkOut: time,
      isCheckedIn: false,
      isOnBreak: false,
    }));
    addAuditLog('PUNCH_OUT', 'Attendance', `Employee checked out at ${time}`);
    showToast(`Checked out successfully at ${time}. Great work today!`, 'success');
  };

  const resolveAlert = (id: string) => {
    setSecurityAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isResolved: true } : a))
    );
    addAuditLog('SECURITY_ALERT_RESOLVED', 'Security', `Resolved security incident #${id}`);
    showToast(`Security incident marked as resolved.`, 'success');
  };

  const requestTrade = (symbol: string, type: 'BUY' | 'SELL', quantity: number, price: number) => {
    const newTrade: Trade = {
      id: `trd-${Date.now()}`,
      tradeCode: `TRD-${Math.floor(1000 + Math.random() * 9000)}`,
      traderName: user?.fullName || 'Rohan Gupta',
      symbol,
      type,
      quantity,
      entryPrice: price,
      exitPrice: null,
      pnl: 0,
      status: 'PENDING',
      timestamp: 'Just now',
    };
    setTrades((prev) => [newTrade, ...prev]);
    addAuditLog('TRADE_REQUEST', 'Trading', `Submitted ${type} order for ${quantity} ${symbol}`);
    showToast(`Trade order ${newTrade.tradeCode} submitted for manager approval`, 'success');
  };

  const approveTrade = (id: string) => {
    setTrades((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'APPROVED', pnl: Math.round(t.quantity * 24.5) } : t))
    );
    addAuditLog('TRADE_APPROVED', 'Trading', `Approved trade order #${id}`);
    showToast(`Trade order approved and sent for execution`, 'success');
  };

  const rejectTrade = (id: string) => {
    setTrades((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'REJECTED' } : t))
    );
    addAuditLog('TRADE_REJECTED', 'Trading', `Rejected trade order #${id}`, 'Failed');
    showToast(`Trade order rejected`, 'error');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All notifications marked as read', 'info');
  };

  const currentEmployee = employees.find((e) => e.empId === 'EMP001') || employees[0];

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        currentEmployee,
        switchRole,
        login,
        logout,
        employees,
        addEmployee,
        leaveRequests,
        leaveBalances,
        applyLeave,
        approveLeave,
        rejectLeave,
        attendanceRecords,
        todayAttendance,
        checkIn,
        startBreak,
        endBreak,
        checkOut,
        securityAlerts,
        resolveAlert,
        auditLogs,
        addAuditLog,
        trades,
        requestTrade,
        approveTrade,
        rejectTrade,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        toast,
        showToast,
      }}
    >
      {children}
      {/* Visual Toast Notification Overlay */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md border animate-in slide-in-from-bottom duration-300 font-medium text-sm transition-all"
          style={{
            backgroundColor:
              toast.type === 'success'
                ? '#064e3b'
                : toast.type === 'error'
                ? '#7f1d1d'
                : '#1e293b',
            borderColor:
              toast.type === 'success'
                ? '#10b981'
                : toast.type === 'error'
                ? '#ef4444'
                : '#64748b',
            color: '#f8fafc',
          }}
        >
          <span>{toast.type === 'success' ? '✓' : toast.type === 'error' ? '⚠' : 'ℹ'}</span>
          <span>{toast.message}</span>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
