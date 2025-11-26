import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './schemas/device.schema';
import { createHash } from 'crypto';

@Injectable()
export class DevicesService {
  constructor(@InjectModel(Device.name) private deviceModel: Model<DeviceDocument>) {}

  generateDeviceId(userAgent: string, ipAddress: string): string {
    const data = `${userAgent}_${ipAddress}`;
    return createHash('sha256').update(data).digest('hex').substring(0, 16);
  }

  async registerDevice(
    userId: string,
    name: string,
    userAgent: string,
    ipAddress: string,
  ): Promise<DeviceDocument> {
    const deviceId = this.generateDeviceId(userAgent, ipAddress);
    
    const existingDevice = await this.deviceModel.findOne({ userId, deviceId });
    if (existingDevice) {
      await this.deviceModel.updateOne(
        { _id: existingDevice._id },
        { lastUsed: new Date() },
      );
      return existingDevice;
    }

    const device = new this.deviceModel({
      userId,
      deviceId,
      name,
      ipAddress,
      lastUsed: new Date(),
    });

    return device.save();
  }

  async getUserDevices(userId: string): Promise<DeviceDocument[]> {
    return this.deviceModel.find({ userId }).sort({ lastUsed: -1 }).exec();
  }

  async removeDevice(userId: string, deviceId: string): Promise<void> {
    await this.deviceModel.deleteOne({ userId, deviceId });
  }

  async trustDevice(userId: string, deviceId: string): Promise<void> {
    await this.deviceModel.updateOne(
      { userId, deviceId },
      { isTrusted: true },
    );
  }
}

