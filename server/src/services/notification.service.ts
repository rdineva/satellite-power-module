import { Injectable } from '@nestjs/common';
import { AlertType, ChannelType, Payload, PayloadType, Payloads } from '../types/index.types';
import { NotificationGateway } from '../gateways/notification.gateway';
import { HIGH_CURRENT_DRAW, LOW_VOLTAGE, MAX_BATTERY_VOLTAGE } from 'src/constants/constants';
import { AlertEventService } from './alert-event.service';
import { AlertEvent } from 'src/interfaces/alert-event.interface';

@Injectable()
export class NotificationService {
  constructor(
    private notificationGateway: NotificationGateway,
    private alertEventService: AlertEventService,
  ) { }

  public async dispatchAlerts(payloads: Payloads) {
    if (!payloads) {
      throw new Error('Invalid payloads data');
    }

    let allAlertTypes = new Set<AlertType>;
    for (const key of Object.keys(payloads)) {
      const payloadType = key as PayloadType;
      const payload: Payload = payloads[payloadType];

      const voltageAlerts = this.checkForVoltageAlert(payload.voltage);
      const currentDrawAlerts = this.checkForCurrentDrawAlert(payload.currentDraw);

      const allAlerts = [...voltageAlerts, ...currentDrawAlerts];

      for (const { type, value } of allAlerts) {
        await this.alertEventService.create({
          type,
          value,
          payloadType: payloadType
        } as AlertEvent);
        allAlertTypes.add(type);
      }
    }

    this.notificationGateway.send([...allAlertTypes]);
  }

  private checkForVoltageAlert(voltage: number): { type: AlertType, value: number }[] {
    const alerts = [];
    if (voltage < LOW_VOLTAGE) {
      alerts.push({ type: AlertType.LowVoltage, value: voltage });
      this.logAlert(`Low Voltage Alert {voltage: ${voltage}}`, [ChannelType.Mail, ChannelType.Teams]);
    } else if (voltage >= MAX_BATTERY_VOLTAGE) {
      alerts.push({ type: AlertType.FullCharge, value: voltage });
      this.logAlert(`Full Charge Alert {voltage: ${voltage}}`, [ChannelType.Teams]);
    }
    return alerts;
  }

  private checkForCurrentDrawAlert(current: number): { type: AlertType, value: number }[] {
    const alerts = [];
    if (current > HIGH_CURRENT_DRAW) {
      alerts.push({ type: AlertType.HighCurrentDraw, value: current });
      this.logAlert(`High Current Alert {current: ${current}}`, [ChannelType.Mail]);
    }
    return alerts;
  }

  private logAlert(alertMessage: string, notificationChannels: string[]) {
    const message = `${notificationChannels.join(' and ')} Notification Sent: ${alertMessage}`;
    console.log(message);
  }
}
