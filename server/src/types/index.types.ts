export enum PayloadType {
  obc = 'obc',
  camera = 'camera'
};

export interface Payload {
  batteryVoltage: number;
  currentDraw: number;
  connected: boolean;
}

export enum AlertType {
  LowVoltage = 'Low Voltage',
  FullCharge = 'Full Charge',
  HighCurrentDraw = 'High Current Draw'
}