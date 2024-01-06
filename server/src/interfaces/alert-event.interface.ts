import { Document } from 'mongoose';
import { AlertType, PayloadType } from 'src/types/index.types';

export interface AlertEvent extends Document {
  type: AlertType;
  value: number;
  payloadType: PayloadType;
}