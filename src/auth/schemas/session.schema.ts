import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema({ timestamps: true })
export class Session {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true, unique: true })
  sessionId: string;

  @Prop({ required: true })
  token: string;

  @Prop()
  refreshToken?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  ipAddress?: string;

  @Prop()
  userAgent?: string;

  @Prop()
  expiresAt: Date;

  @Prop()
  lastActivity: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

