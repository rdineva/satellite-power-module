import { Injectable, BadRequestException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MIN_BATTERY_VOLTAGE, MAX_BATTERY_VOLTAGE, MIN_CURRENT_DRAW, MAX_CURRENT_DRAW } from '../constants/constants';
import { NotificationService } from './notification.service';
import { CommandAction, Payload, PayloadType } from '../types/index.types';
import { PayloadStateService } from './payload-state.service';
import { PayloadState } from 'src/interfaces/payload-state.interface';
import { CommandService } from './command.service';
import { Command } from 'src/interfaces/command.interface';

@Injectable()
export class PowerModuleService {
  private payloads: Record<PayloadType, Payload> = {
    [PayloadType.OBC]: { voltage: 20, currentDraw: 1, connected: true },
    [PayloadType.Camera]: { voltage: 20, currentDraw: 1, connected: true }
  };

  constructor(
    private payloadStateService: PayloadStateService,
    private notificationService: NotificationService,
    private commandService: CommandService,
  ) { }

  @Cron(CronExpression.EVERY_SECOND)
  public async simulateFluctuations(): Promise<void> {
    for (const [type, payload] of Object.entries(this.payloads)) {
      if (payload.connected) {
        const oldVoltage = payload.voltage;
        const oldCurrentDraw = payload.currentDraw;

        payload.voltage = this.gradualFluctuation(payload.voltage, MIN_BATTERY_VOLTAGE, MAX_BATTERY_VOLTAGE);
        payload.currentDraw = this.gradualFluctuation(payload.currentDraw, MIN_CURRENT_DRAW, MAX_CURRENT_DRAW);

        if (oldVoltage !== payload.voltage || oldCurrentDraw !== payload.currentDraw) {
          await this.payloadStateService.create({
            type: type as PayloadType,
            voltage: payload.voltage,
            currentDraw: payload.currentDraw,
            connected: payload.connected,
          } as PayloadState);
        }
      }
    }

    this.notificationService.dispatchAlerts(this.payloads);
  }

  public gradualFluctuation(value: number, min: number, max: number): number {
    const delta = Math.random() * 2 - 1;
    const newValue = Math.max(min, Math.min(max, value + delta));
    return Number(newValue.toFixed(1));
  }

  public getCurrentState(): Record<PayloadType, Payload> {
    return this.payloads;
  }

  public async connectPayload(payloadType: PayloadType): Promise<void> {
    this.changePayloadState(payloadType, true, 1, CommandAction.Connect);
  }

  public async disconnectPayload(payloadType: PayloadType): Promise<void> {
    this.changePayloadState(payloadType, false, 0, CommandAction.Disconnect);
  }

  private async changePayloadState(payloadType: PayloadType, connected: boolean, newCurrentDraw: number, action: CommandAction) {
    if (!this.payloads[payloadType]) {
      throw new BadRequestException(`Invalid payload type: ${payloadType}`);
    }

    this.payloads[payloadType].connected = connected;
    this.payloads[payloadType].currentDraw = newCurrentDraw;
    this.notificationService.dispatchAlerts(this.payloads);

    await this.commandService.create({
      action,
      payload: payloadType
    } as Command);
  }
}
