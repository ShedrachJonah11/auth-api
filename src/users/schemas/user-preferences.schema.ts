import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserPreferencesDocument = UserPreferences & Document;

@Schema({ timestamps: true })
export class UserPreferences {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ default: 'en' })
  language: string;

  @Prop({ default: 'UTC' })
  timezone: string;

  @Prop({ default: true })
  emailNotifications: boolean;

  @Prop({ default: true })
  pushNotifications: boolean;

  @Prop({ default: true })
  securityAlerts: boolean;

  @Prop({ default: true })
  marketingEmails: boolean;

  @Prop({ default: false })
  twoFactorRequired: boolean;

  @Prop({ default: 'light' })
  theme: string;

  @Prop({ type: Object, default: {} })
  customSettings: Record<string, any>;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserPreferencesSchema = SchemaFactory.createForClass(UserPreferences);

