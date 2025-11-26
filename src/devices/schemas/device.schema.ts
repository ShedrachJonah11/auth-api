import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeviceDocument = Device & Document;

@Schema({ timestamps: true })
export class Device {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  type: string;

  @Prop()
  os?: string;

  @Prop()
  browser?: string;

  @Prop()
  ipAddress?: string;

  @Prop({ default: true })
  isTrusted: boolean;

  @Prop()
  lastUsed?: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
DeviceSchema.index({ userId: 1, deviceId: 1 }, { unique: true });

