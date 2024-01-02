import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MIN_BATTERY_VOLTAGE, MAX_BATTERY_VOLTAGE, MIN_CURRENT_DRAW, MAX_CURRENT_DRAW } from '../constants/constants';
import { NotificationService } from '../notification-service/notification.service';
import { Payload, PayloadType } from '../types/payload.types';

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

  @Cron(CronExpression.EVERY_5_SECONDS)
  simulateFluctuations() {
    Object.keys(this.payloads).forEach(key => {
      const payload = this.payloads[key as PayloadType];

      payload.batteryVoltage = this.randomFluctuation(
        payload.batteryVoltage,
        MIN_BATTERY_VOLTAGE,
        MAX_BATTERY_VOLTAGE
      );

      if (payload.connected) {
        payload.currentDraw = this.randomFluctuation(
          payload.currentDraw,
          MIN_CURRENT_DRAW,
          MAX_CURRENT_DRAW
        );
      }
    });

    this.notificationService.checkAndNotify(Object.values(this.payloads));
  }

  randomFluctuation(value: number, min: number, max: number): number {
    const change = (Math.random() - 0.5) * 2;
    return Math.min(Math.max(value + change, min), max);
  }

  getCurrentState() {
    return this.payloads;
  }

  connectPayload(payloadType: PayloadType) {
    const payload = this.payloads[payloadType];
    if (payload) {
      payload.connected = true;
      payload.currentDraw = 20;
    }
  }

  disconnectPayload(payloadType: PayloadType) {
    const payload = this.payloads[payloadType];
    if (payload) {
      payload.connected = false;
      payload.currentDraw = 0;
    }
  }
}
