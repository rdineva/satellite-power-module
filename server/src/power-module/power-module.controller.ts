import { Controller, Get, Post, Param, HttpException, HttpStatus } from '@nestjs/common';
import { PowerModuleService } from './power-module.service';
import { PayloadType } from '../types/index.types';

@Controller('power-module')
export class PowerModuleController {
  constructor(private readonly powerModuleService: PowerModuleService) { }

  @Get('state')
  getCurrentState() {
    try {
      return this.powerModuleService.getCurrentState();
    } catch (error) {
      throw new HttpException('Failed to retrieve power module state', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('connect/:payload')
  connectPayload(@Param('payload') payloadType: PayloadType) {
    try {
      this.powerModuleService.connectPayload(payloadType);
      return { message: `${payloadType} connected` };
    } catch (error) {
      throw new HttpException(`Failed to connect ${payloadType}: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('disconnect/:payload')
  disconnectPayload(@Param('payload') payloadType: PayloadType) {
    try {
      this.powerModuleService.disconnectPayload(payloadType);
      return { message: `${payloadType} disconnected` };
    } catch (error) {
      throw new HttpException(`Failed to disconnect ${payloadType}: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
