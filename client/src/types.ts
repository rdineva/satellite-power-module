export interface Payload {
  batteryVoltage: number;
  currentDraw: number;
  connected: boolean;
}

export interface Payloads {
  [PayloadType.obc]: Payload;
  [PayloadType.camera]: Payload;
}

export interface PowerModuleState {
  payloads: Payloads;
  error: string | null;
}

export enum PayloadType {
  obc = 'obc',
  camera = 'camera'
}