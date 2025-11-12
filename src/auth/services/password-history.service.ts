import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../../users/user.schema';

@Injectable()
export class PasswordHistoryService {
  private readonly MAX_HISTORY_COUNT = 5;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async addToHistory(userId: string, hashedPassword: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) return;

    let history = user.passwordHistory || [];
    history.push(hashedPassword);

    // Keep only last N passwords
    if (history.length > this.MAX_HISTORY_COUNT) {
      history = history.slice(-this.MAX_HISTORY_COUNT);
    }

    await this.userModel.updateOne(
      { _id: userId },
      {
        $set: {
          passwordHistory: history,
          lastPasswordChange: new Date(),
        },
      },
    );
  }

  async isPasswordInHistory(userId: string, newPassword: string): Promise<boolean> {
    const user = await this.userModel.findById(userId);
    if (!user || !user.passwordHistory || user.passwordHistory.length === 0) {
      return false;
    }

    for (const oldPassword of user.passwordHistory) {
      const isMatch = await bcrypt.compare(newPassword, oldPassword);
      if (isMatch) {
        return true;
      }
    }

    return false;
  }

  async getHistoryCount(userId: string): Promise<number> {
    const user = await this.userModel.findById(userId);
    return user?.passwordHistory?.length || 0;
  }
}

