import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CommandAction, PayloadType } from 'src/types/index.types';

@Schema({ timestamps: true })
export class Command {
  @Prop({ type: String, enum: Object.values(CommandAction) })
  action: CommandAction;

  @Prop({ type: String, enum: Object.values(PayloadType) })
  payload: PayloadType;
}

export type CommandDocument = Command & Document;
export const CommandSchema = SchemaFactory.createForClass(Command);
