import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<User[]> {
    const cacheKey = 'users:all';
    const cachedUsers = await this.cacheManager.get<User[]>(cacheKey);
    
    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await this.userModel.find().select('-password').exec();
    await this.cacheManager.set(cacheKey, users, 300); // Cache for 5 minutes
    
    return users;
  }

  async findOne(id: string): Promise<User> {
    const cacheKey = `user:${id}`;
    const cachedUser = await this.cacheManager.get<User>(cacheKey);
    
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.userModel.findById(id).select('-password').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.cacheManager.set(cacheKey, user, 300); // Cache for 5 minutes
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password')
      .exec();
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Invalidate cache
    await this.cacheManager.del(`user:${id}`);
    await this.cacheManager.del('users:all');
    
    return user;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }

    // Invalidate cache
    await this.cacheManager.del(`user:${id}`);
    await this.cacheManager.del('users:all');
  }

  async getProfile(id: string): Promise<User> {
    return this.findOne(id);
  }
}
