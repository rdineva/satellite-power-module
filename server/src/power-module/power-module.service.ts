import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MIN_BATTERY_VOLTAGE, MAX_BATTERY_VOLTAGE, MIN_CURRENT_DRAW, MAX_CURRENT_DRAW } from '../constants/constants';
import { NotificationService } from '../notification/notification.service';
import { Payload, PayloadType } from '../types/index.types';

@Injectable()
export class PowerModuleService {
  constructor(private notificationService: NotificationService) { }

  private payloads: Record<PayloadType, Payload> = {
    [PayloadType.obc]: {
      batteryVoltage: 20,
      currentDraw: 1,
      connected: true
    },
    [PayloadType.camera]: {
      batteryVoltage: 20,
      currentDraw: 1,
      connected: true
    }
  };

  @Cron(CronExpression.EVERY_SECOND)
  simulateFluctuations(): void {
    Object.keys(this.payloads).forEach(key => {
      const payload = this.payloads[key as PayloadType];

      payload.batteryVoltage = this.gradualFluctuation(
        payload.batteryVoltage,
        MIN_BATTERY_VOLTAGE,
        MAX_BATTERY_VOLTAGE
      );

      if (payload.connected) {
        payload.currentDraw = this.gradualFluctuation(
          payload.currentDraw,
          MIN_CURRENT_DRAW,
          MAX_CURRENT_DRAW
        );
      }
    });

    this.notificationService.dispatchAlerts(Object.values(this.payloads));
  }

  gradualFluctuation(value: number, min: number, max: number): number {
    const delta = Math.random() * 2 + 1;
    const direction = Math.random() > 0.5 ? 1 : -1;
    let result = value + (delta * direction);

    result = Math.max(min, Math.min(max, result));
    return Number(result.toFixed(1));
  }

  getCurrentState() {
    return this.payloads;
  }

  connectPayload(payloadType: PayloadType): void {
    const payload = this.payloads[payloadType];
    if (payload) {
      payload.connected = true;
      payload.currentDraw = 0;
    }

    this.notificationService.dispatchAlerts(Object.values(this.payloads));
  }

  disconnectPayload(payloadType: PayloadType): void {
    const payload = this.payloads[payloadType];
    if (payload) {
      payload.connected = false;
      payload.currentDraw = 0;
    }

    this.notificationService.dispatchAlerts(Object.values(this.payloads));
  }
}
