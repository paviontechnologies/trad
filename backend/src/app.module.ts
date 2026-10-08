import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { LeaveModule } from './modules/leave/leave.module';
import { ActivityModule } from './modules/activity/activity.module';
import { PayrollModule } from './modules/payroll/payroll.module';
import { SecurityModule } from './modules/security/security.module';
import { TradingModule } from './modules/trading/trading.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SettingsModule } from './modules/settings/settings.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    EmployeesModule,
    AttendanceModule,
    LeaveModule,
    ActivityModule,
    PayrollModule,
    SecurityModule,
    TradingModule,
    ReportsModule,
    SettingsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
