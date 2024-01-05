import { Injectable } from '@nestjs/common';
import { AlertType, ChannelType, Payload } from '../types/index.types';
import { NotificationGateway } from '../notification/notification.gateway';
import { HIGH_CURRENT_DRAW, LOW_VOLTAGE, MAX_BATTERY_VOLTAGE } from 'src/constants/constants';

@Injectable()
export class NotificationService {
  constructor(private notificationGateway: NotificationGateway) { }

  private alerts = new Set<AlertType>();

  dispatchAlerts(payloads: Payload[]) {
    if (!payloads) {
      throw new Error('Invalid payloads data');
    }

    this.alerts.clear();
    payloads.forEach(payload => {
      this.checkForVoltageAlert(payload.batteryVoltage);
      this.checkForCurrentDrawAlert(payload.currentDraw);
    });

    // For testing purposes you can uncomment this code and
    // add any set of alert types to be displayed on the client
    // this.notificationGateway.send([AlertType.FullCharge, AlertType.LowVoltage, AlertType.HighCurrentDraw]);

    this.notificationGateway.send([...this.alerts]);
  }

  private checkForVoltageAlert(voltage: number) {
    if (voltage < LOW_VOLTAGE) {
      this.logAndAddAlert(`Low Voltage Alert {voltage: ${voltage}}`, AlertType.LowVoltage, [ChannelType.Mail, ChannelType.Teams]);
    } else if (voltage >= MAX_BATTERY_VOLTAGE) {
      this.logAndAddAlert(`Full Charge Alert {voltage: ${voltage}}`, AlertType.FullCharge, [ChannelType.Teams]);
    }
  }

  private checkForCurrentDrawAlert(current: number) {
    if (current > HIGH_CURRENT_DRAW) {
      this.logAndAddAlert(`High Current Alert {current: ${current}}`, AlertType.HighCurrentDraw, [ChannelType.Mail]);
    }
  }

  private logAndAddAlert(alertMessage: string, alertType: AlertType, notificationChannels: string[]) {
    const message = `${notificationChannels.join(' and ')} Notification Sent: ${alertMessage}`;
    console.log(message);
    this.alerts.add(alertType);
  }
}
