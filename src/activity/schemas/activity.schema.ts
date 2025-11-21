import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActivityDocument = Activity & Document;

@Schema({ timestamps: true })
export class Activity {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Object, default: {} })
  details: Record<string, any>;

  @Prop()
  ipAddress?: string;

  @Prop()
  location?: string;

  @Prop()
  createdAt: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
ActivitySchema.index({ userId: 1, createdAt: -1 });
ActivitySchema.index({ type: 1 });

