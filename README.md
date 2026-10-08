# PAVION — Employee Monitoring & Business Management Platform (MVP)

A unified enterprise workforce management, telemetry monitoring, payroll, security auditing, and operations platform. Built for high-impact client demonstrations with authentic interactive workflows.

---

## 🚀 Quick Start (Running Locally)

### 1. Install Dependencies
```bash
# Install root and workspace dependencies
npm run install:all
```

### 2. Configure Environment
```bash
cp .env.example .env
cp .env.example backend/.env
cp .env.example frontend/.env.local
```

### 3. Database Migration & Realistic Seeding
```bash
# Generate Prisma Client & push schema to database
npm run db:generate
npm run db:push

# Seed database with 50+ realistic Indian employees, departments, telemetry & audit logs
npm run seed
```

### 4. Start Development Servers
```bash
# Starts both Backend (Port 4000) and Frontend (Port 3000) simultaneously
npm run dev
```

- **Frontend Portal**: [http://localhost:3000](http://localhost:3000)
- **Backend API & Swagger**: [http://localhost:4000/api](http://localhost:4000/api)

---

## 👥 Demo Presentation Accounts (1-Click Login Ready)

The login screen includes **1-Click Quick Fill buttons** for effortless client demonstrations:

| Role | Email | Password | Primary Showcase Purpose |
|---|---|---|---|
| **Super Admin** | `admin@demo.com` | `Admin@123` | Executive 8-KPI dashboard, audit trail, security threat alerts |
| **HR Specialist** | `hr@demo.com` | `Hr@123` | Workforce directory, attendance records, leave approvals |
| **Team Manager** | `manager@demo.com` | `Manager@123` | Team telemetry, overtime approvals, trade request approval |
| **Employee** | `employee@demo.com` | `Employee@123` | Personalized self-service portal, live clock in/out, payslips |
| **Finance Controller**| `finance@demo.com` | `Finance@123` | Payroll calculations, gross-to-net deductions, payslip PDF |
| **Trader** | `trader@demo.com` | `Trader@123` | Institutional order book, P&L curves, trade submissions |

> **Pro-Tip during Client Demo**: Use the **"Demo View" pill** in the top navigation bar to switch between roles instantly without logging out!

---

## 🎬 10-Step Client Demo Sequence

Follow this sequence for the most impactful client presentation:

1. **Step 1 — Login Screen**: Show enterprise branding, 2FA hardware preview, and click the **Super Admin** 1-click button.
2. **Step 2 — Central Executive Dashboard**: Point to top 8 KPI cards (128 total employees, 112 present, 74 active online, ₹8,45,000 pending payroll, 7 security alerts). Highlight the interactive Attendance Donut and Department Performance charts.
3. **Step 3 — Employee Management**: Navigate to **Employees**. Search for "Rahul", filter by Department ("IT"). Click **View** on **Rahul Bajediyal (EMP001)**.
4. **Step 4 — Rahul's Showcase Profile**: Walk through the 7 tabs:
   - *Overview*: 78% productivity, 6h 41m active time.
   - *Attendance*: Monthly ledger with biometric stamps.
   - *Activity*: VS Code (3h 20m), Chrome (2h 10m), Slack (45m), YouTube (30m).
   - *Tasks*: Interactive sprint task checklist.
   - *Leave*: Leave balance cards (Annual 9/14, Sick 8/10, Casual 7/8).
   - *Payroll*: Salary breakdown.
5. **Step 5 — Attendance & Punch Station**: Switch to **Attendance**. Demonstrate the live Punch Station: click **Start Break**, observe timer, then click **End Break**.
6. **Step 6 — Leave Management & Approval**: Switch to **Leave**. Demonstrate the manager queue: click **Approve** on Rahul's wedding leave request, watch status change to *Approved* with celebratory feedback.
7. **Step 7 — Payroll Management**: Open **Payroll**. Move the sliders in the **Gross-to-Net Salary Calculator** (Basic ₹40k + HRA ₹10k + Bonus ₹5k + OT ₹3k = Gross ₹58k minus PF/TDS = Net ₹53,600).
8. **Step 8 — Official Payslip PDF**: Click **Generate Payslip** and show the official letterhead with company stamp, PAN, PF UAN, and download action.
9. **Step 9 — Security Threat Center**: Navigate to **Security**. Show the 3 critical threat alerts (3 failed login attempts by Rahul, External sharing of `Finance_Report.xlsx`, Unauthorized payroll access). Click **Acknowledge & Resolve**.
10. **Step 10 — Employee Portal & Trading**: Use the top role switcher to toggle to **Employee (Rahul)**. Point to the personalized greeting *"Good Morning Rahul 👋"*, today's working time, and quick actions. Then switch to **Trader** to demo the institutional order book and P&L charts!

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 14+ (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Recharts.
- **Backend**: NestJS 10, TypeScript, Prisma ORM, Passport JWT Authentication, RBAC Guards.
- **Database**: PostgreSQL (Prisma schema with 20 relational entities).
- **Timezone & Currency**: Asia/Kolkata (IST), Indian Rupee (INR ₹).

---

## 📂 Project Architecture

```
trading/
├── backend/                   # NestJS API Server (Port 4000)
│   ├── prisma/
│   │   ├── schema.prisma      # 20 relational enterprise entities
│   │   └── seed.ts            # Realistic 50+ Indian employee seed dataset
│   └── src/
│       ├── modules/auth/      # JWT, Bcrypt, Role-Based Access Control
│       ├── modules/employees/ # Directory, Profiles, Departments
│       ├── modules/attendance/# Punch In/Out, Breaks, Overtime, History
│       ├── modules/leave/     # Requests, Balances, Approval Queue
│       ├── modules/activity/  # Telemetry, App/Web usage, Productivity
│       ├── modules/payroll/   # Salary calculators, Payslips
│       ├── modules/security/  # Threat alerts, Immutable audit trails
│       ├── modules/trading/   # Institutional trade executions, P&L
│       ├── modules/reports/   # Multi-format CSV/Excel/PDF exports
│       └── modules/settings/  # Org branding, Biometric & Tax policies
│
└── frontend/                  # Next.js 14 UI (Port 3000)
    └── src/
        ├── app/               # App Router pages (Dashboard, Employees, etc.)
        ├── components/layout/ # Enterprise Sidebar, Top Navigation Header
        ├── lib/auth-context/  # Live state & 1-click role switcher
        └── lib/data.ts        # Resilient client-side demo dataset
```
