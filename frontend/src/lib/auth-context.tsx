'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Employee,
  LeaveRequest,
  LeaveBalance,
  AttendanceRecord,
  BreakLog,
  PunchEvent,
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
    date: string;
    checkIn: string | null;
    checkInDate: string;
    checkOut: string | null;
    checkOutDate: string | null;
    workingTime: string;
    breakTime: string;
    workingMinutes: number;
    breakMinutes: number;
    isCheckedIn: boolean;
    isOnBreak: boolean;
    currentBreakStartTime: string | null;
    currentBreakType: string;
    breaks: BreakLog[];
    events: PunchEvent[];
  };
  checkIn: () => void;
  startBreak: (type?: string) => void;
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
    date: '19 Oct 2026',
    checkIn: '09:12 AM',
    checkInDate: '19 Oct 2026',
    checkOut: null as string | null,
    checkOutDate: null as string | null,
    workingTime: '06h 42m',
    breakTime: '01h 00m',
    workingMinutes: 402,
    breakMinutes: 60,
    isCheckedIn: true,
    isOnBreak: false,
    currentBreakStartTime: null as string | null,
    currentBreakType: 'Lunch Break',
    breaks: [
      {
        id: 'brk-1',
        type: 'Lunch Break',
        startTime: '01:15 PM',
        startDate: '19 Oct 2026',
        endTime: '01:55 PM',
        durationMinutes: 40,
        durationFormatted: '40 mins',
      },
      {
        id: 'brk-2',
        type: 'Tea / Coffee Break',
        startTime: '04:30 PM',
        startDate: '19 Oct 2026',
        endTime: '04:50 PM',
        durationMinutes: 20,
        durationFormatted: '20 mins',
      },
    ] as BreakLog[],
    events: [
      {
        id: 'ev-1',
        type: 'PUNCH_IN',
        label: 'Shift Punch In',
        time: '09:12 AM',
        date: '19 Oct 2026',
        note: 'Biometric Station • On-Time Entry',
      },
      {
        id: 'ev-2',
        type: 'BREAK_START',
        label: 'Started Lunch Break',
        time: '01:15 PM',
        date: '19 Oct 2026',
        note: 'Cafeteria Floor 2',
      },
      {
        id: 'ev-3',
        type: 'BREAK_END',
        label: 'Completed Lunch Break',
        time: '01:55 PM',
        date: '19 Oct 2026',
        note: 'Duration: 40 mins',
      },
      {
        id: 'ev-4',
        type: 'BREAK_START',
        label: 'Started Tea Break',
        time: '04:30 PM',
        date: '19 Oct 2026',
        note: 'Pantry Zone',
      },
      {
        id: 'ev-5',
        type: 'BREAK_END',
        label: 'Completed Tea Break',
        time: '04:50 PM',
        date: '19 Oct 2026',
        note: 'Duration: 20 mins',
      },
    ] as PunchEvent[],
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
    let targetRole: UserRole = 'Super Admin';
    let name = 'Vikram Malhotra';

    if (lowerEmail.includes('hr')) {
      targetRole = 'HR';
      name = 'Priya Sharma';
    } else if (lowerEmail.includes('manager') || lowerEmail.includes('amit')) {
      targetRole = 'Manager';
      name = 'Amit Patel';
    } else if (
      lowerEmail.includes('employee') ||
      lowerEmail.includes('engineer') ||
      lowerEmail.includes('rahul') ||
      lowerEmail.includes('dev')
    ) {
      targetRole = 'Employee';
      name = 'Rahul Bajediyal';
    } else if (lowerEmail.includes('finance') || lowerEmail.includes('sunita')) {
      targetRole = 'Finance';
      name = 'Sunita Menon';
    } else if (lowerEmail.includes('trader') || lowerEmail.includes('rohan')) {
      targetRole = 'Trader';
      name = 'Rohan Gupta';
    } else {
      targetRole = 'Super Admin';
      name = 'Vikram Malhotra';
    }

    setRole(targetRole);
    setUser({
      id: `user-${targetRole.toLowerCase()}`,
      email: lowerEmail,
      fullName: name,
      role: targetRole,
      employeeId: targetRole === 'Employee' ? 'emp-1' : undefined,
    });
    addAuditLog('USER_LOGIN', 'Authentication', `Logged in as ${name} (${targetRole})`);
    showToast(`Welcome back, ${name}! Logged in as ${targetRole}`, 'success');
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
    if (role === 'Employee' || role === 'Trader') {
      showToast('Access Denied: Only Managers and HR can approve leaves', 'error');
      return;
    }
    const reviewerTitle =
      role === 'Manager'
        ? 'Amit Verma (Team Manager)'
        : role === 'HR'
        ? 'Priya Sharma (HR Lead)'
        : 'Vikram Malhotra (Super Admin)';

    setLeaveRequests((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              status: 'APPROVED',
              approvedBy: reviewerTitle,
              reviewedAt: new Date().toISOString().split('T')[0],
            }
          : l
      )
    );
    // Update balance
    setLeaveBalances((prev) => ({
      ...prev,
      annual: { ...prev.annual, used: prev.annual.used + 1, remaining: Math.max(0, prev.annual.remaining - 1) },
    }));
    addAuditLog('LEAVE_APPROVED', 'Leave Management', `Approved leave request #${id} by ${reviewerTitle}`);
    showToast(`Leave request approved by ${reviewerTitle}!`, 'success');
  };

  const rejectLeave = (id: string) => {
    if (role === 'Employee' || role === 'Trader') {
      showToast('Access Denied: Only Managers and HR can reject leaves', 'error');
      return;
    }
    const reviewerTitle =
      role === 'Manager'
        ? 'Amit Verma (Team Manager)'
        : role === 'HR'
        ? 'Priya Sharma (HR Lead)'
        : 'Vikram Malhotra (Super Admin)';

    setLeaveRequests((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              status: 'REJECTED',
              approvedBy: reviewerTitle,
              reviewedAt: new Date().toISOString().split('T')[0],
            }
          : l
      )
    );
    addAuditLog('LEAVE_REJECTED', 'Leave Management', `Rejected leave request #${id} by ${reviewerTitle}`, 'Failed');
    showToast(`Leave request rejected by ${reviewerTitle}`, 'error');
  };

  // Standard 12-hour AM/PM time formatter
  const formatTime12 = (d: Date = new Date()) => {
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Helper to sync live punches with the master attendance data sheet
  const syncAttendanceDataSheet = (
    checkInTime: string | null,
    checkOutTime: string | null,
    breaks: BreakLog[],
    breakMins: number,
    workingMins: number,
    statusOverride?: 'Present' | 'Late' | 'On Break'
  ) => {
    setAttendanceRecords((prev) => {
      const todayDate = '19 Oct 2026';
      const existingIdx = prev.findIndex(
        (r) => (r.employeeId === 'emp-1' || r.empId === 'EMP001') && r.date === todayDate
      );

      const updatedRecord: AttendanceRecord = {
        id: existingIdx >= 0 ? prev[existingIdx].id : 'att-1',
        employeeId: 'emp-1',
        empId: 'EMP001',
        employeeName: 'Rahul Bajediyal',
        department: 'Information Technology',
        date: todayDate,
        checkIn: checkInTime,
        checkOut: checkOutTime,
        workingMinutes: workingMins,
        breakMinutes: breakMins,
        overtimeMinutes: Math.max(0, workingMins - 480),
        status: statusOverride || (checkOutTime ? 'Present' : 'Present'),
        breaksList: breaks,
      };

      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = updatedRecord;
        return next;
      } else {
        return [updatedRecord, ...prev];
      }
    });
  };

  // Punch actions
  const checkIn = () => {
    const time = formatTime12();
    const dateStr = '19 Oct 2026';

    const newEvent: PunchEvent = {
      id: `ev-${Date.now()}`,
      type: 'PUNCH_IN',
      label: 'Shift Punch In',
      time,
      date: dateStr,
      note: 'Biometric Station • Checked In On-Time',
    };

    setTodayAttendance((prev) => {
      syncAttendanceDataSheet(time, null, prev.breaks, prev.breakMinutes, prev.workingMinutes, 'Present');
      return {
        ...prev,
        checkIn: time,
        checkInDate: dateStr,
        checkOut: null,
        checkOutDate: null,
        isCheckedIn: true,
        isOnBreak: false,
        currentBreakStartTime: null,
        events: [newEvent, ...prev.events],
      };
    });
    addAuditLog('PUNCH_IN', 'Attendance', `Employee punched in at ${time} on ${dateStr}`);
    showToast(`Checked in successfully at ${time}! Have a productive day.`, 'success');
  };

  const startBreak = (type: string = 'Tea / Short Break') => {
    const time = formatTime12();
    const dateStr = '19 Oct 2026';
    const breakId = `brk-${Date.now()}`;

    const newBreak: BreakLog = {
      id: breakId,
      type,
      startTime: time,
      startDate: dateStr,
      endTime: null,
      durationMinutes: 0,
      durationFormatted: 'In Progress (Active)',
      startTimestamp: Date.now(),
    };

    const newEvent: PunchEvent = {
      id: `ev-${Date.now()}`,
      type: 'BREAK_START',
      label: `Started ${type}`,
      time,
      date: dateStr,
      note: 'Live break timer active',
    };

    setTodayAttendance((prev) => {
      const updatedBreaks = [newBreak, ...prev.breaks];
      syncAttendanceDataSheet(prev.checkIn, null, updatedBreaks, prev.breakMinutes, prev.workingMinutes, 'Present');
      return {
        ...prev,
        isOnBreak: true,
        currentBreakStartTime: time,
        currentBreakType: type,
        breaks: updatedBreaks,
        events: [newEvent, ...prev.events],
      };
    });

    addAuditLog('BREAK_START', 'Attendance', `Started ${type} at ${time}`);
    showToast(`${type} started at ${time}. Live timer running!`, 'info');
  };

  const endBreak = () => {
    const time = formatTime12();
    const dateStr = '19 Oct 2026';

    setTodayAttendance((prev) => {
      const firstBreak = prev.breaks[0];
      let addedMinutes = 15;
      if (firstBreak && firstBreak.startTimestamp) {
        const diffSec = Math.round((Date.now() - firstBreak.startTimestamp) / 1000);
        addedMinutes = Math.max(1, Math.round(diffSec / 60));
      }

      const updatedBreaks = prev.breaks.map((b, idx) => {
        if (idx === 0 && !b.endTime) {
          return {
            ...b,
            endTime: time,
            durationMinutes: addedMinutes,
            durationFormatted: `${addedMinutes} mins`,
          };
        }
        return b;
      });

      const newEvent: PunchEvent = {
        id: `ev-${Date.now()}`,
        type: 'BREAK_END',
        label: `Ended ${prev.currentBreakType || 'Break'}`,
        time,
        date: dateStr,
        note: `Duration: ${addedMinutes} mins (Returned to work)`,
      };

      const newTotalMinutes = prev.breakMinutes + addedMinutes;
      const hrs = Math.floor(newTotalMinutes / 60);
      const mins = newTotalMinutes % 60;
      const formattedTotal = `${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m`;

      syncAttendanceDataSheet(prev.checkIn, null, updatedBreaks, newTotalMinutes, prev.workingMinutes, 'Present');

      return {
        ...prev,
        isOnBreak: false,
        currentBreakStartTime: null,
        breakMinutes: newTotalMinutes,
        breakTime: formattedTotal,
        breaks: updatedBreaks,
        events: [newEvent, ...prev.events],
      };
    });

    addAuditLog('BREAK_END', 'Attendance', `Returned from break at ${time}`);
    showToast(`Break ended at ${time}. Welcome back to work!`, 'success');
  };

  const checkOut = () => {
    const time = formatTime12();
    const dateStr = '19 Oct 2026';

    const newEvent: PunchEvent = {
      id: `ev-${Date.now()}`,
      type: 'PUNCH_OUT',
      label: 'Shift Punch Out',
      time,
      date: dateStr,
      note: 'Shift completed • Daily records finalized',
    };

    setTodayAttendance((prev) => {
      syncAttendanceDataSheet(prev.checkIn, time, prev.breaks, prev.breakMinutes, prev.workingMinutes, 'Present');
      return {
        ...prev,
        checkOut: time,
        checkOutDate: dateStr,
        isCheckedIn: false,
        isOnBreak: false,
        currentBreakStartTime: null,
        events: [newEvent, ...prev.events],
      };
    });

    addAuditLog('PUNCH_OUT', 'Attendance', `Employee checked out at ${time} on ${dateStr}`);
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
