import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from './schemas/activity.schema';

@Injectable()
export class ActivityService {
  constructor(@InjectModel(Activity.name) private activityModel: Model<ActivityDocument>) {}

  async recordActivity(
    userId: string,
    type: string,
    description: string,
    details: Record<string, any> = {},
    ipAddress?: string,
  ): Promise<ActivityDocument> {
    const activity = new this.activityModel({
      userId,
      type,
      description,
      details,
      ipAddress,
    });

    return activity.save();
  }

  async getUserActivities(userId: string, limit: number = 50): Promise<ActivityDocument[]> {
    return this.activityModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async getActivitiesByType(type: string, limit: number = 50): Promise<ActivityDocument[]> {
    return this.activityModel
      .find({ type })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }
}

