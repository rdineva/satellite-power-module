import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlertEvent } from 'src/interfaces/alert-event.interface';
import { BaseService } from './base.service';

@Injectable()
export class AlertEventService extends BaseService<AlertEvent> {
  constructor(@InjectModel('AlertEvent') protected readonly alertEventModel: Model<AlertEvent>) {
    super(alertEventModel);
  }

  async findAllByType(eventType: AlertEvent): Promise<AlertEvent[] | null> {
    return this.alertEventModel.find({ eventType }).exec();
  }
}
