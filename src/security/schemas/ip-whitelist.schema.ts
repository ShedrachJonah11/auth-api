import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IpWhitelistDocument = IpWhitelist & Document;

@Schema({ timestamps: true })
export class IpWhitelist {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  ipAddress: string;

  @Prop()
  description?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const IpWhitelistSchema = SchemaFactory.createForClass(IpWhitelist);
IpWhitelistSchema.index({ userId: 1, ipAddress: 1 }, { unique: true });

