import { Injectable } from '@nestjs/common';
import { Payload } from '../types/payload.types';

@Injectable()
export class NotificationService {
  checkAndNotify(payloads: Payload[]) {
    payloads.forEach(payload => {
      this.checkForVoltageAlert(payload.batteryVoltage);
      this.checkForCurrentDrawAlert(payload.currentDraw);
    });
  }

  private checkForVoltageAlert(voltage: number) {
    if (voltage < 18) {
      console.log(`Email and MS Teams Notification Sent: Low Voltage Alert {voltage: ${voltage}}`);
    } else if (voltage >= 30) {
      console.log(`MS Teams Notification Sent: Full Charge Alert {voltage: ${voltage}}`);
    }
  }

  private checkForCurrentDrawAlert(current: number) {
    if (current > 3) {
      console.log(`Email Notification Sent: High Current Alert {current: ${current}}`);
    }
  }
}
