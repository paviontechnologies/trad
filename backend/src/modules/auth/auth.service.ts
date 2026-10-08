import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { employee: true },
    });
    if (!user) {
      // Record failed login audit log
      await this.prisma.auditLog.create({
        data: {
          userName: email,
          action: 'FAILED_LOGIN',
          module: 'Auth',
          details: `User with email ${email} not found`,
          status: 'Failed',
        },
      });
      return null;
    }
    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      // Record failed login audit log
      await this.prisma.auditLog.create({
        data: {
          userId: user.id,
          userName: user.fullName,
          action: 'FAILED_LOGIN',
          module: 'Auth',
          details: 'Incorrect password entered',
          status: 'Failed',
        },
      });
      return null;
    }
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    // Record successful login audit log
    await this.prisma.auditLog.create({
      data: {
        userId: user.id,
        userName: user.fullName,
        action: 'LOGIN_SUCCESS',
        module: 'Auth',
        details: `Logged in with role: ${user.role}`,
        status: 'Success',
      },
    });

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        employee: user.employee,
      },
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        employee: {
          include: { department: true },
        },
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { passwordHash, ...result } = user;
    return result;
  }
}
