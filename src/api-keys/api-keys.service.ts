import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomBytes } from 'crypto';
import { ApiKey, ApiKeyDocument } from './schemas/api-key.schema';

@Injectable()
export class ApiKeysService {
  constructor(@InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKeyDocument>) {}

  async createApiKey(userId: string, name: string, permissions: string[] = []): Promise<ApiKeyDocument> {
    const key = this.generateApiKey();
    const apiKey = new this.apiKeyModel({
      key,
      userId,
      name,
      permissions,
    });
    return apiKey.save();
  }

  async findApiKey(key: string): Promise<ApiKeyDocument | null> {
    return this.apiKeyModel.findOne({ key, isActive: true }).exec();
  }

  async getUserApiKeys(userId: string): Promise<ApiKeyDocument[]> {
    return this.apiKeyModel.find({ userId, isActive: true }).exec();
  }

  async revokeApiKey(keyId: string, userId: string): Promise<void> {
    await this.apiKeyModel.updateOne(
      { _id: keyId, userId },
      { isActive: false },
    );
  }

  async updateLastUsed(key: string): Promise<void> {
    await this.apiKeyModel.updateOne({ key }, { lastUsed: new Date() });
  }

  private generateApiKey(): string {
    const prefix = 'ak_';
    const randomPart = randomBytes(32).toString('hex');
    return `${prefix}${randomPart}`;
  }
}

