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
    const payload = { email: user.email, sub: user._id, role: user.role };
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

    const payload = { email: user.email, sub: user._id, role: user.role };
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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }
}
