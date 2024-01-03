import { Test, TestingModule } from '@nestjs/testing';
import { PowerModuleService } from './power-module.service';
import { PayloadType } from '../types/payload.types';
import { NotificationService } from '../notification-service/notification.service';
import { ScheduleModule } from '@nestjs/schedule';

jest.mock('../notification-service/notification.service', () => {
  return {
    NotificationService: jest.fn().mockImplementation(() => {
      return {
        checkAndNotify: jest.fn(),
      };
    }),
  };
});

jest.useFakeTimers();

describe('PowerModuleService', () => {
  let service: PowerModuleService;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ScheduleModule.forRoot()],
      providers: [
        PowerModuleService,
        NotificationService,
      ],
    }).compile();

    service = module.get<PowerModuleService>(PowerModuleService);
    notificationService = module.get<NotificationService>(NotificationService);
    jest.spyOn(service, 'randomFluctuation').mockImplementation((value) => value + 1);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('gets current state and returns data in the correct format', () => {
    const expectedState = {
      camera: { batteryVoltage: expect.any(Number), currentDraw: expect.any(Number), connected: expect.any(Boolean) },
      obc: { batteryVoltage: expect.any(Number), currentDraw: expect.any(Number), connected: expect.any(Boolean) }
    };

    const powerModuleState = service.getCurrentState();
    expect(powerModuleState).toEqual(expectedState);
  });

  it('connects obc payload', () => {
    expect(service.getCurrentState().obc.connected).toBeTruthy();

    service.disconnectPayload(PayloadType.obc)
    expect(service.getCurrentState().obc.connected).toBeFalsy();

    service.connectPayload(PayloadType.obc)
    expect(service.getCurrentState().obc.connected).toBeTruthy();
    expect(service.getCurrentState().obc.currentDraw).toBeGreaterThan(0);
  });

  it('disconnects obc payload', () => {
    expect(service.getCurrentState().obc.connected).toBeTruthy();

    service.disconnectPayload(PayloadType.obc)
    expect(service.getCurrentState().obc.connected).toBeFalsy();
    expect(service.getCurrentState().obc.currentDraw).toBe(0);
  });

  it('connects camera payload', () => {
    expect(service.getCurrentState().camera.connected).toBeTruthy();

    service.disconnectPayload(PayloadType.camera)
    expect(service.getCurrentState().camera.connected).toBeFalsy();

    service.connectPayload(PayloadType.camera)
    expect(service.getCurrentState().camera.connected).toBeTruthy();
    expect(service.getCurrentState().camera.currentDraw).toBeGreaterThan(0);
  });

  it('disconnects camera payload', () => {
    expect(service.getCurrentState().camera.connected).toBeTruthy();

    service.disconnectPayload(PayloadType.camera)
    expect(service.getCurrentState().camera.connected).toBeFalsy();
    expect(service.getCurrentState().camera.currentDraw).toBe(0);
  });

  it('should simulate fluctuations every 5 seconds', () => {
    service.simulateFluctuations();
    jest.advanceTimersByTime(5000);

    expect(service.randomFluctuation).toHaveBeenCalledTimes(2 * Object.keys(service.getCurrentState()).length);

    expect(notificationService.checkAndNotify).toHaveBeenCalledWith(Object.values(service.getCurrentState()));
  });

  it('payload state changes over time', () => {
    const beforeState = JSON.parse(JSON.stringify(service.getCurrentState()));
    service.simulateFluctuations();

    const afterState = service.getCurrentState();
    expect(afterState).not.toEqual(beforeState);

    expect(afterState.camera.currentDraw).not.toBe(beforeState.camera.currentDraw);
    expect(afterState.obc.batteryVoltage).not.toBe(beforeState.obc.batteryVoltage);
  });
});