import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AlertType, PayloadType } from 'src/types/index.types';

@Schema({ timestamps: true })
export class AlertEvent {
  @Prop({ type: String, enum: Object.values(AlertType) })
  type: AlertType;

  @Prop()
  value: number;

  @Prop({ type: String, enum: Object.values(PayloadType) })
  payloadType: PayloadType;
}

export type AlertEventDocument = Event & Document;
export const AlertEventSchema = SchemaFactory.createForClass(AlertEvent);
