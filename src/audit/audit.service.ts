import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument } from './schemas/audit-log.schema';

@Injectable()
export class AuditService {
  constructor(@InjectModel(AuditLog.name) private auditLogModel: Model<AuditLogDocument>) {}

  async log(
    userId: string,
    action: string,
    resource: string,
    metadata: Record<string, any> = {},
    ipAddress?: string,
    userAgent?: string,
    status: string = 'success',
  ): Promise<AuditLogDocument> {
    const auditLog = new this.auditLogModel({
      userId,
      action,
      resource,
      metadata,
      ipAddress,
      userAgent,
      status,
    });

    return auditLog.save();
  }

  async getUserLogs(userId: string, limit: number = 100): Promise<AuditLogDocument[]> {
    return this.auditLogModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async getLogsByAction(action: string, limit: number = 100): Promise<AuditLogDocument[]> {
    return this.auditLogModel
      .find({ action })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }
}

