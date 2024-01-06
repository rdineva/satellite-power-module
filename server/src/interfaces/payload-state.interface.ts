import { Document } from 'mongoose';
import { PayloadType } from 'src/types/index.types';

export interface PayloadState extends Document {
  type: PayloadType;
  voltage: number;
  currentDraw: number;
  connected: boolean;
}