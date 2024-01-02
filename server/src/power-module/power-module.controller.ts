import { Controller, Get, Post, Param } from '@nestjs/common';
import { PowerModuleService } from './power-module.service';
import { PayloadType } from '../types/payload.types';

@Controller('power-module')
export class PowerModuleController {
  constructor(private readonly powerModuleService: PowerModuleService) { }

  @Get('state')
  getCurrentState() {
    return this.powerModuleService.getCurrentState();
  }

  @Post('connect/:payload')
  connectPayload(@Param('payload') payloadType: PayloadType) {
    this.powerModuleService.connectPayload(payloadType);
    return { message: `${payloadType} connected` };
  }

  @Post('disconnect/:payload')
  disconnectPayload(@Param('payload') payloadType: PayloadType) {
    this.powerModuleService.disconnectPayload(payloadType);
    return { message: `${payloadType} disconnected` };
  }
}
