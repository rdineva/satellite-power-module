import { Injectable, BadRequestException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MIN_BATTERY_VOLTAGE, MAX_BATTERY_VOLTAGE, MIN_CURRENT_DRAW, MAX_CURRENT_DRAW } from '../constants/constants';
import { NotificationService } from '../notification/notification.service';
import { Payload, PayloadType } from '../types/index.types';

@Injectable()
export class PowerModuleService {
  private payloads: Record<PayloadType, Payload> = {
    [PayloadType.OBC]: { batteryVoltage: 20, currentDraw: 1, connected: true },
    [PayloadType.Camera]: { batteryVoltage: 20, currentDraw: 1, connected: true }
  };

  constructor(private notificationService: NotificationService) { }

  @Cron(CronExpression.EVERY_SECOND)
  public simulateFluctuations(): void {
    Object.values(this.payloads).forEach(payload => {
      if (payload.connected) {
        payload.batteryVoltage = this.gradualFluctuation(payload.batteryVoltage, MIN_BATTERY_VOLTAGE, MAX_BATTERY_VOLTAGE);
        payload.currentDraw = this.gradualFluctuation(payload.currentDraw, MIN_CURRENT_DRAW, MAX_CURRENT_DRAW);
      }
    });

    this.notificationService.dispatchAlerts(Object.values(this.payloads));
  }

  public gradualFluctuation(value: number, min: number, max: number): number {
    const delta = Math.random() * 2 - 1;
    const newValue = Math.max(min, Math.min(max, value + delta));
    return Number(newValue.toFixed(1));
  }

  public getCurrentState(): Record<PayloadType, Payload> {
    return this.payloads;
  }

  public connectPayload(payloadType: PayloadType): void {
    if (!this.payloads[payloadType]) {
      throw new BadRequestException(`Invalid payload type: ${payloadType}`);
    }

    this.payloads[payloadType].connected = true;
    this.payloads[payloadType].currentDraw = 1;
    this.notificationService.dispatchAlerts(Object.values(this.payloads));
  }

  public disconnectPayload(payloadType: PayloadType): void {
    if (!this.payloads[payloadType]) {
      throw new BadRequestException(`Invalid payload type: ${payloadType}`);
    }

    this.payloads[payloadType].connected = false;
    this.payloads[payloadType].currentDraw = 0;
    this.notificationService.dispatchAlerts(Object.values(this.payloads));
  }
}
