export enum PayloadType {
  obc = 'obc',
  camera = 'camera'
};

export interface Payload {
  batteryVoltage: number;
  currentDraw: number;
  connected: boolean;
}