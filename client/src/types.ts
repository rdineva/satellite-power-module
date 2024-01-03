export interface Payload {
  batteryVoltage: number;
  currentDraw: number;
  connected: boolean;
}

export interface PowerModuleState {
  payloads: {
    obc: Payload;
    camera: Payload;
  };
  error: string | null;
}

export enum PayloadType {
  obc = 'obc',
  camera = 'camera'
}