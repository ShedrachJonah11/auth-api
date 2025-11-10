import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from '../schemas/session.schema';

@Injectable()
export class SessionService {
  constructor(@InjectModel(Session.name) private sessionModel: Model<SessionDocument>) {}

  async createSession(
    userId: string,
    token: string,
    refreshToken: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<SessionDocument> {
    const sessionId = this.generateSessionId();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const session = new this.sessionModel({
      userId,
      sessionId,
      token,
      refreshToken,
      ipAddress,
      userAgent,
      expiresAt,
      lastActivity: new Date(),
    });

    return session.save();
  }

  async findSession(sessionId: string): Promise<SessionDocument | null> {
    return this.sessionModel.findOne({ sessionId, isActive: true }).exec();
  }

  async findUserSessions(userId: string): Promise<SessionDocument[]> {
    return this.sessionModel.find({ userId, isActive: true }).exec();
  }

  async revokeSession(sessionId: string): Promise<void> {
    await this.sessionModel.updateOne({ sessionId }, { isActive: false });
  }

  async revokeAllUserSessions(userId: string): Promise<void> {
    await this.sessionModel.updateMany({ userId }, { isActive: false });
  }

  async updateLastActivity(sessionId: string): Promise<void> {
    await this.sessionModel.updateOne({ sessionId }, { lastActivity: new Date() });
  }

  async cleanupExpiredSessions(): Promise<number> {
    const result = await this.sessionModel.deleteMany({
      expiresAt: { $lt: new Date() },
    });
    return result.deletedCount || 0;
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }
}

