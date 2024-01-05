import { Injectable } from '@nestjs/common';
import { AlertType, Payload } from '../types/index.types';
import { NotificationGateway } from '../notification/notification.gateway';

@Injectable()
export class NotificationService {
  constructor(private notificationGateway: NotificationGateway) { }

  private alerts = new Set<AlertType>();

  dispatchAlerts(payloads: Payload[]) {
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
    if (voltage < 18) {
      const message = `Low Voltage Alert {voltage: ${voltage}}`;
      console.log(`Email and MS Teams Notification Sent: ${message}`);

      this.alerts.add(AlertType.LowVoltage);
    } else if (voltage >= 30) {
      const message = `Full Charge Alert {voltage: ${voltage}}`;
      console.log(`MS Teams Notification Sent: ${message}`);

      this.alerts.add(AlertType.FullCharge);
    }
  }

  private checkForCurrentDrawAlert(current: number) {
    if (current > 3) {
      const message = `High Current Alert {current: ${current}}`;
      console.log(`Email Notification Sent: ${message}`);

      this.alerts.add(AlertType.HighCurrentDraw);
    }
  }
}
