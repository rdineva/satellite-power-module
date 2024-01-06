import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export abstract class BaseService<T> {
  protected constructor(protected readonly model: Model<T>) { }

  async create(createDto: T): Promise<T> {
    const createdObj = new this.model(createDto);
    return createdObj.save() as T;
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }
}
