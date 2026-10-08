import { Controller, Get, Patch, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get()
  async getSettings() {
    return this.settingsService.getSettings();
  }

  @Patch()
  async updateSettings(@Body() data: any) {
    return this.settingsService.updateSettings(data);
  }
}
