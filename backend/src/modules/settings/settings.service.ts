import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings() {
    let setting = await this.prisma.organizationSetting.findFirst();
    if (!setting) {
      setting = await this.prisma.organizationSetting.create({
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
    }
    return setting;
  }

  async updateSettings(data: any) {
    const setting = await this.getSettings();
    return this.prisma.organizationSetting.update({
      where: { id: setting.id },
      data,
    });
  }
}
