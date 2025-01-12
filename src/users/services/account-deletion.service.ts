import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../user.schema';
import { createWriteStream } from 'fs';
import { join } from 'path';

const GRACE_DAYS = parseInt(process.env.ACCOUNT_DELETION_GRACE_DAYS || '30', 10);

@Injectable()
export class AccountDeletionService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async requestAccountDeletion(userId: string): Promise<{ message: string; scheduledAt: Date }> {
    const scheduledAt = new Date(Date.now() + GRACE_DAYS * 24 * 60 * 60 * 1000);
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { deletionScheduledAt: scheduledAt } },
    );
    return { message: 'Account deletion scheduled', scheduledAt };
  }

  async confirmAccountDeletion(userId: string, password: string): Promise<{ message: string }> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid password');
    }
    await this.deleteAccount(userId);
    return { message: 'Account deleted successfully' };
  }

  async exportUserData(userId: string): Promise<string> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const exportData = {
      profile: {
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      preferences: (user as any).preferences || {},
      exportDate: new Date().toISOString(),
    };

    const filename = `user_export_${userId}_${Date.now()}.json`;
    const filepath = join(process.cwd(), 'exports', filename);

    // Ensure exports directory exists
    const fs = require('fs');
    if (!fs.existsSync(join(process.cwd(), 'exports'))) {
      fs.mkdirSync(join(process.cwd(), 'exports'), { recursive: true });
    }

    fs.writeFileSync(filepath, JSON.stringify(exportData, null, 2));

    return filepath;
  }

  async deleteAccount(userId: string): Promise<void> {
    // Soft delete - mark as deleted
    await this.userModel.updateOne(
      { _id: userId },
      {
        $set: {
          email: `deleted_${Date.now()}@deleted.local`,
          isDeleted: true,
          deletedAt: new Date(),
        },
      },
    );

    // Or hard delete (uncomment if needed)
    // await this.userModel.deleteOne({ _id: userId });
  }
}

