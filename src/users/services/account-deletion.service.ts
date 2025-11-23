import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user.schema';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class AccountDeletionService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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

