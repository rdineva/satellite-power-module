export interface Payload {
  voltage: number;
  currentDraw: number;
  connected: boolean;
}

export enum PayloadType {
  OBC = 'OBC',
  Camera = 'Camera'
}

export interface Payloads {
  [PayloadType.OBC]: Payload;
  [PayloadType.Camera]: Payload;
}

export interface PowerModuleState {
  payloads: Payloads;
  error: string | null;
}

export interface NotificationState {
  notifications: NotificationType[];
  error: string | null;
}

export enum NotificationType {
  LowVoltage = 'Low Voltage',
  FullCharge = 'Full Charge',
  HighCurrentDraw = 'High Current Draw'
}