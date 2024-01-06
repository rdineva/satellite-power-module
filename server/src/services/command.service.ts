import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from './base.service';
import { Command } from 'src/interfaces/command.interface';

@Injectable()
export class CommandService extends BaseService<Command> {
  constructor(@InjectModel('Command') protected readonly commandModel: Model<Command>) {
    super(commandModel);
  }
}
