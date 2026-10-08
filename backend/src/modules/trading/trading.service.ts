import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TradingService {
  constructor(private prisma: PrismaService) {}

  async getDashboard() {
    return {
      totalTrades: 184,
      winningTrades: 132,
      losingTrades: 52,
      winRate: 71.7,
      netPnl: 245800,
      todayTrades: 14,
      todayPnl: 34500,
      riskExposure: 410000,
      currency: 'INR',
      currencySymbol: '₹',
      recentPerformance: [
        { day: 'Mon', pnl: 42000 },
        { day: 'Tue', pnl: -12500 },
        { day: 'Wed', pnl: 68400 },
        { day: 'Thu', pnl: 55200 },
        { day: 'Fri', pnl: 92700 },
      ],
    };
  }

  async getTrades() {
    return this.prisma.trade.findMany({
      orderBy: { timestamp: 'desc' },
    });
  }

  async requestTrade(data: {
    traderName: string;
    symbol: string;
    type: string;
    quantity: number;
    entryPrice: number;
  }) {
    const tradeCode = `TRD-${Math.floor(1000 + Math.random() * 9000)}`;
    const trade = await this.prisma.trade.create({
      data: {
        tradeCode,
        traderName: data.traderName,
        symbol: data.symbol,
        type: data.type,
        quantity: Number(data.quantity),
        entryPrice: Number(data.entryPrice),
        status: 'PENDING',
        pnl: 0,
      },
    });

    // Audit Log
    await this.prisma.auditLog.create({
      data: {
        userName: data.traderName,
        action: 'TRADE_REQUEST',
        module: 'Trading',
        details: `Requested ${data.type} order for ${data.quantity} qty of ${data.symbol}`,
        status: 'Success',
      },
    });

    return trade;
  }

  async approveTrade(id: string, approverName = 'Manager') {
    const trade = await this.prisma.trade.findUnique({ where: { id } });
    if (!trade) {
      throw new NotFoundException('Trade not found');
    }

    const updated = await this.prisma.trade.update({
      where: { id },
      data: {
        status: 'APPROVED',
        pnl: Math.round(trade.quantity * (trade.entryPrice * 0.05)), // demo simulated profit
      },
    });

    // Audit Log
    await this.prisma.auditLog.create({
      data: {
        userName: approverName,
        action: 'TRADE_APPROVED',
        module: 'Trading',
        details: `Approved trade ${trade.tradeCode} (${trade.symbol})`,
        status: 'Success',
      },
    });

    return updated;
  }

  async rejectTrade(id: string, approverName = 'Manager') {
    const trade = await this.prisma.trade.findUnique({ where: { id } });
    if (!trade) {
      throw new NotFoundException('Trade not found');
    }

    const updated = await this.prisma.trade.update({
      where: { id },
      data: {
        status: 'REJECTED',
      },
    });

    // Audit Log
    await this.prisma.auditLog.create({
      data: {
        userName: approverName,
        action: 'TRADE_REJECTED',
        module: 'Trading',
        details: `Rejected trade ${trade.tradeCode} due to risk exposure limit`,
        status: 'Warning',
      },
    });

    return updated;
  }
}
