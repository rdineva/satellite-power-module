import { Document } from 'mongoose';
import { CommandAction, PayloadType } from 'src/types/index.types';

export interface Command extends Document {
  action: CommandAction;
  payload: PayloadType;
}