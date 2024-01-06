import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PayloadState } from 'src/interfaces/payload-state.interface';
import { PayloadType } from 'src/types/index.types';
import { BaseService } from './base.service';

@Injectable()
export class PayloadStateService extends BaseService<PayloadState> {
  constructor(@InjectModel('PayloadState') protected readonly payloadModel: Model<PayloadState>) {
    super(payloadModel);
  }

  async findAllByPayloadType(type: PayloadType): Promise<PayloadState[] | null> {
    return this.payloadModel.find({ type }).exec();
  }

  async findLatestByPayloadType(type: PayloadType): Promise<PayloadState | null> {
    return this.payloadModel.findOne({ action: type }).sort({ createdAt: -1 }).exec();
  }
}
