import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebhookDocument = Webhook & Document;

@Schema({ timestamps: true })
export class Webhook {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  event: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 'POST' })
  method: string;

  @Prop({ type: Object, default: {} })
  headers: Record<string, string>;

  @Prop({ type: Object, default: {} })
  secret?: string;

  @Prop()
  lastTriggered?: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const WebhookSchema = SchemaFactory.createForClass(Webhook);

