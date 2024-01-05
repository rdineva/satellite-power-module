import { Test, TestingModule } from '@nestjs/testing';
import { PowerModuleService } from './power-module.service';
import { PayloadType } from '../types/index.types';
import { NotificationService } from '../notification/notification.service';
import { ScheduleModule } from '@nestjs/schedule';

jest.mock('../notification/notification.service', () => {
  return {
    NotificationService: jest.fn().mockImplementation(() => {
      return {
        dispatchAlerts: jest.fn(),
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
    jest.spyOn(service, 'gradualFluctuation').mockImplementation((value) => value + 1);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('gets current state and returns data in the correct format', () => {
    const expectedState = {
      Camera: { batteryVoltage: expect.any(Number), currentDraw: expect.any(Number), connected: expect.any(Boolean) },
      OBC: { batteryVoltage: expect.any(Number), currentDraw: expect.any(Number), connected: expect.any(Boolean) }
    };

    const powerModuleState = service.getCurrentState();
    expect(powerModuleState).toEqual(expectedState);
  });

  it('connects obc payload', () => {
    expect(service.getCurrentState().OBC.connected).toBeTruthy();

    service.disconnectPayload(PayloadType.OBC)
    expect(service.getCurrentState().OBC.connected).toBeFalsy();

    service.connectPayload(PayloadType.OBC)
    expect(service.getCurrentState().OBC.connected).toBeTruthy();
    expect(service.getCurrentState().OBC.currentDraw).toBeGreaterThan(0);
  });

  it('disconnects obc payload', () => {
    expect(service.getCurrentState().OBC.connected).toBeTruthy();

    service.disconnectPayload(PayloadType.OBC)
    expect(service.getCurrentState().OBC.connected).toBeFalsy();
    expect(service.getCurrentState().OBC.currentDraw).toBe(0);
  });

  it('connects camera payload', () => {
    expect(service.getCurrentState().Camera.connected).toBeTruthy();

    service.disconnectPayload(PayloadType.Camera)
    expect(service.getCurrentState().Camera.connected).toBeFalsy();

    service.connectPayload(PayloadType.Camera)
    expect(service.getCurrentState().Camera.connected).toBeTruthy();
    expect(service.getCurrentState().Camera.currentDraw).toBeGreaterThan(0);
  });

  it('disconnects camera payload', () => {
    expect(service.getCurrentState().Camera.connected).toBeTruthy();

    service.disconnectPayload(PayloadType.Camera)
    expect(service.getCurrentState().Camera.connected).toBeFalsy();
    expect(service.getCurrentState().Camera.currentDraw).toBe(0);
  });

  it('should simulate fluctuations every second', () => {
    service.simulateFluctuations();
    jest.advanceTimersByTime(1000);

    expect(service.gradualFluctuation).toHaveBeenCalledTimes(2 * Object.keys(service.getCurrentState()).length);

    expect(notificationService.dispatchAlerts).toHaveBeenCalledWith(Object.values(service.getCurrentState()));
  });

  it('payload state changes over time', () => {
    const beforeState = JSON.parse(JSON.stringify(service.getCurrentState()));
    service.simulateFluctuations();

    const afterState = service.getCurrentState();
    expect(afterState).not.toEqual(beforeState);

    expect(afterState.Camera.currentDraw).not.toBe(beforeState.Camera.currentDraw);
    expect(afterState.OBC.batteryVoltage).not.toBe(beforeState.OBC.batteryVoltage);
  });
});
