export enum PayloadType {
  OBC = 'OBC',
  Camera = 'Camera',
};

export interface Payload {
  batteryVoltage: number;
  currentDraw: number;
  connected: boolean;
}

export enum AlertType {
  LowVoltage = 'Low Voltage',
  FullCharge = 'Full Charge',
  HighCurrentDraw = 'High Current Draw',
}

export enum ChannelType {
  Teams = 'MS Teams',
  Mail = 'Email',
}