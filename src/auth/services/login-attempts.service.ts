import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/user.schema';

@Injectable()
export class LoginAttemptsService {
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCK_TIME = 30 * 60 * 1000; // 30 minutes

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async recordFailedAttempt(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (!user) return;

    const updates: any = { $inc: { loginAttempts: 1 } };

    // Lock account if max attempts reached
    if (user.loginAttempts + 1 >= this.MAX_LOGIN_ATTEMPTS && !user.lockUntil) {
      updates.$set = { lockUntil: new Date(Date.now() + this.LOCK_TIME) };
    }

    await this.userModel.updateOne({ email }, updates);
  }

  async resetAttempts(email: string): Promise<void> {
    await this.userModel.updateOne(
      { email },
      {
        $set: { loginAttempts: 0 },
        $unset: { lockUntil: 1 },
      },
    );
  }

  async isAccountLocked(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    if (!user || !user.lockUntil) return false;

    // Check if lock has expired
    if (user.lockUntil.getTime() < Date.now()) {
      await this.resetAttempts(email);
      return false;
    }

    return true;
  }

  async getRemainingAttempts(email: string): Promise<number> {
    const user = await this.userModel.findOne({ email });
    if (!user) return 0;
    return Math.max(0, this.MAX_LOGIN_ATTEMPTS - user.loginAttempts);
  }
}

