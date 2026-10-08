import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { TradingService } from './trading.service';

@Controller('trading')
export class TradingController {
  constructor(private tradingService: TradingService) {}

  @Get('dashboard')
  async getDashboard() {
    return this.tradingService.getDashboard();
  }

  @Get('trades')
  async getTrades() {
    return this.tradingService.getTrades();
  }

  @Post('request')
  async requestTrade(@Body() data: any) {
    return this.tradingService.requestTrade(data);
  }

  @Patch('trades/:id/approve')
  async approveTrade(@Param('id') id: string, @Body('approverName') approverName?: string) {
    return this.tradingService.approveTrade(id, approverName || 'Risk Manager');
  }

  @Patch('trades/:id/reject')
  async rejectTrade(@Param('id') id: string, @Body('approverName') approverName?: string) {
    return this.tradingService.rejectTrade(id, approverName || 'Risk Manager');
  }
}
