import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { User } from '../users/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userModel.findOne({ email: registerDto.email });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    
    const user = new this.userModel({
      ...registerDto,
      password: hashedPassword,
      emailVerificationToken,
      isEmailVerified: false,
    });

    await user.save();
    
    // In a real application, you would send an email here
    console.log(`Email verification token for ${user.email}: ${emailVerificationToken}`);
    
    const { password, emailVerificationToken: token, ...result } = user.toObject();
    return result;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userModel.findOne({ email: forgotPasswordDto.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    // In a real application, you would send an email here
    console.log(`Password reset token for ${user.email}: ${resetToken}`);
    
    return {
      message: 'Password reset token sent to your email',
      resetToken, // Only for development/testing
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userModel.findOne({
      resetPasswordToken: resetPasswordDto.token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return {
      message: 'Password reset successfully',
    };
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const user = await this.userModel.findOne({
      emailVerificationToken: verifyEmailDto.token,
    });

    if (!user) {
      throw new BadRequestException('Invalid verification token');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email already verified');
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    return {
      message: 'Email verified successfully',
    };
  }

  async resendVerificationEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email already verified');
    }

    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = emailVerificationToken;
    await user.save();

    // In a real application, you would send an email here
    console.log(`New email verification token for ${user.email}: ${emailVerificationToken}`);

    return {
      message: 'Verification email sent',
      emailVerificationToken, // Only for development/testing
    };
  }
}
