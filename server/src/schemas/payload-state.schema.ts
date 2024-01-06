import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MAX_BATTERY_VOLTAGE, MAX_CURRENT_DRAW, MIN_BATTERY_VOLTAGE, MIN_CURRENT_DRAW } from 'src/constants/constants';
import { PayloadType } from 'src/types/index.types';

@Schema({ timestamps: true })
export class PayloadState {
  @Prop({ type: String, enum: Object.values(PayloadType) })
  type: PayloadType;

  @Prop({ type: Number, min: MIN_BATTERY_VOLTAGE, max: MAX_BATTERY_VOLTAGE })
  voltage: number;

  @Prop({ type: Number, min: MIN_CURRENT_DRAW, max: MAX_CURRENT_DRAW })
  currentDraw: number;

  @Prop()
  connected: boolean;
}

export type PayloadStateDocument = PayloadState & Document;

export const PayloadStateSchema = SchemaFactory.createForClass(PayloadState);
