import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserPreferences, UserPreferencesDocument } from './schemas/user-preferences.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserPreferences.name) private preferencesModel: Model<UserPreferencesDocument>,
  ) {}

  async findAll(options?: { page?: number; limit?: number }): Promise<{ users: User[]; total: number; page: number; totalPages: number }> {
    const defaultLimit = parseInt(process.env.PAGINATION_DEFAULT_LIMIT || '20', 10);
    const maxLimit = parseInt(process.env.PAGINATION_MAX_LIMIT || '100', 10);
    const page = Math.max(1, options?.page ?? 1);
    const limit = Math.min(maxLimit, Math.max(1, options?.limit ?? defaultLimit));
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.userModel.find().select('-password').skip(skip).limit(limit).sort({ createdAt: -1 }).exec(),
      this.userModel.countDocuments().exec(),
    ]);
    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true }
    ).select('-password').exec();
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return user;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }

  async assignRole(userId: string, role: string): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true },
    ).select('-password').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getPreferences(userId: string): Promise<UserPreferencesDocument> {
    let prefs = await this.preferencesModel.findOne({ userId }).exec();
    if (!prefs) {
      prefs = await this.preferencesModel.create({ userId });
    }
    return prefs;
  }

  async updatePreferences(userId: string, dto: UpdatePreferencesDto): Promise<UserPreferencesDocument> {
    const prefs = await this.preferencesModel.findOneAndUpdate(
      { userId },
      { $set: dto },
      { new: true, upsert: true },
    ).exec();
    return prefs!;
  }

  async setAvatarUrl(userId: string, avatarUrl: string): Promise<{ avatar: string }> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true },
    ).select('avatar').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { avatar: (user as any).avatar };
  }
}
