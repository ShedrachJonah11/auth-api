import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { hashPassword, comparePassword } from './utils/bcrypt.helper';
import { generateOpaqueToken } from './utils/token.helper';
import { isLocked, nextLockUntil, getLockoutConfig } from './utils/lockout.helper';
import { normalizeEmail } from './utils/normalize-email';
import { AccountLockedException } from '../common/exceptions/auth.exceptions';
import { User, UserDocument } from '../users/user.schema';
import { TwoFactorService } from './services/two-factor.service';
import { SessionService } from './services/session.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as crypto from 'crypto';
import { JwtPayload } from '../common/types';

const VERIFICATION_EXPIRY_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService {
  private readonly refreshTokenBlacklist = new Set<string>();

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private twoFactorService: TwoFactorService,
    private sessionService: SessionService,
  ) {}

  async register(registerDto: RegisterDto) {
    if (process.env.ALLOW_REGISTRATION === 'false') {
      throw new ConflictException('Registration is currently disabled');
    }
    const { password, name, role } = registerDto;
    const email = normalizeEmail(registerDto.email);

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await hashPassword(password);

    // Create user
    const defaultRole = process.env.DEFAULT_USER_ROLE || 'user';
    const user = new this.userModel({
      email,
      password: hashedPassword,
      name,
      role: role || defaultRole,
    });

    await user.save();

    // Generate JWT token
    const payload = { email: user.email, sub: user._id.toString(), role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const { password } = loginDto;
    const email = normalizeEmail(loginDto.email);
    const user = await this.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id.toString(), role: user.role };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
      refreshToken,
    };
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    // Constant-ish response time to avoid email-existence leak via timing.
    await new Promise((r) => setTimeout(r, 50 + Math.floor(Math.random() * 50)));
    const normalized = normalizeEmail(email);
    const user = await this.userModel.findOne({ email: normalized });
    if (!user) {
      return { message: 'If the email exists, a reset link will be sent' };
    }
    const expiryMinutes = parseInt(process.env.PASSWORD_RESET_EXPIRY_MINUTES || '60', 10);
    const token = generateOpaqueToken();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + expiryMinutes * 60 * 1000);
    await user.save();
    return { message: 'If the email exists, a reset link will be sent' };
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ emailVerificationToken: token });
    if (!user) {
      throw new UnauthorizedException('Invalid verification token');
    }
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();
    return { message: 'Email verified successfully' };
  }

  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    const normalized = normalizeEmail(email);
    const user = await this.userModel.findOne({ email: normalized });
    if (!user) {
      return { message: 'If the email exists, a verification link will be sent' };
    }
    if (user.isEmailVerified) {
      return { message: 'Email is already verified' };
    }
    const token = generateOpaqueToken();
    user.emailVerificationToken = token;
    await user.save();
    return { message: 'If the email exists, a verification link will be sent' };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const user = await this.userModel.findOne({
      resetPasswordToken: dto.token,
      resetPasswordExpires: { $gt: new Date() },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }
    user.password = await hashPassword(dto.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return { message: 'Password reset successfully' };
  }

  async generate2FASecret(userId: string): Promise<{ secret: string; qrCodeUrl: string }> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { secret, qrCodeUrl } = this.twoFactorService.generateSecret(user.email);
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { twoFactorSecret: secret } },
    );
    return { secret, qrCodeUrl };
  }

  async enable2FA(userId: string, token: string): Promise<{ message: string }> {
    const user = await this.userModel.findById(userId);
    if (!user || !user.twoFactorSecret) {
      throw new UnauthorizedException('Generate a secret first via POST /auth/2fa/setup');
    }
    const valid = this.twoFactorService.verifyToken(user.twoFactorSecret, token);
    if (!valid) {
      throw new UnauthorizedException('Invalid TOTP token');
    }
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { isTwoFactorEnabled: true } },
    );
    return { message: '2FA enabled successfully' };
  }

  async disable2FA(userId: string): Promise<{ message: string }> {
    await this.userModel.updateOne(
      { _id: userId },
      { $unset: { twoFactorSecret: 1 }, $set: { isTwoFactorEnabled: false } },
    );
    return { message: '2FA disabled successfully' };
  }

  async getUserSessions(userId: string) {
    return this.sessionService.findUserSessions(userId);
  }

  async revokeSession(userId: string, sessionId: string): Promise<void> {
    const sessions = await this.sessionService.findUserSessions(userId);
    const owns = sessions.some((s) => s.sessionId === sessionId);
    if (!owns) {
      throw new UnauthorizedException('Session not found');
    }
    await this.sessionService.revokeSession(sessionId);
  }

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<{ message: string }> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const valid = await comparePassword(dto.currentPassword, user.password);
    if (!valid) {
      throw new UnauthorizedException('Current password is incorrect');
    }
    user.password = await hashPassword(dto.newPassword);
    await user.save();
    return { message: 'Password changed successfully' };
  }

  async logout(refreshToken: string): Promise<{ message: string }> {
    if (refreshToken) {
      this.refreshTokenBlacklist.add(refreshToken);
    }
    return { message: 'Logged out successfully' };
  }

  async refreshToken(refreshToken: string) {
    if (this.refreshTokenBlacklist.has(refreshToken)) {
      throw new UnauthorizedException('Token has been revoked');
    }
    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshToken);
      const user = await this.userModel.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload = { email: user.email, sub: user._id.toString(), role: user.role };
      const newToken = this.jwtService.sign(newPayload);
      const newRefreshToken = this.jwtService.sign(newPayload, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });

      this.refreshTokenBlacklist.add(refreshToken);
      return {
        token: newToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async validateUser(email: string, password: string): Promise<Omit<UserDocument, 'password'> | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    if (isLocked(user.lockUntil)) {
      throw new AccountLockedException();
    }
    if (await comparePassword(password, user.password)) {
      if (user.loginAttempts > 0 || user.lockUntil) {
        await this.userModel.updateOne({ _id: user._id }, { $set: { loginAttempts: 0 }, $unset: { lockUntil: 1 } });
      }
      const { password: _, ...result } = user.toObject();
      return result as Omit<UserDocument, 'password'>;
    }
    const { maxAttempts } = getLockoutConfig();
    const attempts = (user.loginAttempts || 0) + 1;
    const update: Record<string, unknown> = { loginAttempts: attempts };
    if (attempts >= maxAttempts) {
      update.lockUntil = nextLockUntil();
    }
    await this.userModel.updateOne({ _id: user._id }, { $set: update });
    return null;
  }

  async validateUserById(userId: string): Promise<Omit<UserDocument, 'password'> | null> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      return null;
    }
    const { password: _, ...result } = user.toObject();
    return result as Omit<UserDocument, 'password'>;
  }

  async findOrCreateOAuthUser(profile: {
    email: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    picture?: string;
    avatar?: string;
  }): Promise<UserDocument> {
    let user = await this.userModel.findOne({ email: profile.email });

    if (!user) {
      // Create new user from OAuth profile
      const name = profile.name || `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.email.split('@')[0];
      // Generate a random password for OAuth users (they won't use it for login)
      const randomPassword = await bcrypt.hash(Math.random().toString(36) + Date.now().toString(), 10);
      user = new this.userModel({
        email: profile.email,
        name,
        password: randomPassword, // OAuth users have a random password (not used for login)
        isEmailVerified: true, // OAuth emails are pre-verified
        role: 'user',
        avatar: profile.picture || profile.avatar,
      });
      await user.save();
    } else {
      // Update avatar if provided and different
      if ((profile.picture || profile.avatar) && user.avatar !== (profile.picture || profile.avatar)) {
        user.avatar = profile.picture || profile.avatar;
        await user.save();
      }
    }

    return user;
  }

  async generateTokenForUser(user: UserDocument) {
    const payload = { email: user.email, sub: user._id.toString(), role: user.role };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
      token,
      refreshToken,
    };
  }
}
