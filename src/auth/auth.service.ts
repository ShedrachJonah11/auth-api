import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, role } = registerDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new this.userModel({
      email,
      password: hashedPassword,
      name,
      role: role || 'user',
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
    const { email, password } = loginDto;
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

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken) as { email: string; sub: string; role: string };
      const user = await this.userModel.findById(payload.sub);
      
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload = { email: user.email, sub: user._id.toString(), role: user.role };
      const newToken = this.jwtService.sign(newPayload);
      const newRefreshToken = this.jwtService.sign(newPayload, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });

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
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user.toObject();
      return result as Omit<UserDocument, 'password'>;
    }
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
