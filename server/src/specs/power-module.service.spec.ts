import { Test, TestingModule } from '@nestjs/testing';
import { PowerModuleService } from '../services/power-module.service';
import { PayloadType } from '../types/index.types';
import { NotificationService } from '../services/notification.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PayloadStateService } from '../services/payload-state.service';
import { CommandService } from '../services/command.service';
import { getModelToken } from '@nestjs/mongoose';

jest.mock('../services/notification.service', () => {
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

  const mockModel = jest.fn().mockImplementation((dto) => ({
    ...dto,
    save: jest.fn().mockResolvedValue(dto)
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ScheduleModule.forRoot()],
      providers: [
        PowerModuleService,
        NotificationService,
        PayloadStateService,
        CommandService,
        {
          provide: getModelToken('PayloadState'),
          useValue: mockModel,
        },
        {
          provide: getModelToken('Command'),
          useValue: mockModel,
        },
        {
          provide: getModelToken('AlertEvent'),
          useValue: mockModel,
        },
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
      Camera: { voltage: expect.any(Number), currentDraw: expect.any(Number), connected: expect.any(Boolean) },
      OBC: { voltage: expect.any(Number), currentDraw: expect.any(Number), connected: expect.any(Boolean) }
    };

    const powerModuleState = service.getCurrentState();
    expect(powerModuleState).toEqual(expectedState);
  });

  it('connects obc payload', async () => {
    expect(service.getCurrentState().OBC.connected).toBeTruthy();

    await service.disconnectPayload(PayloadType.OBC)
    expect(service.getCurrentState().OBC.connected).toBeFalsy();

    await service.connectPayload(PayloadType.OBC)
    expect(service.getCurrentState().OBC.connected).toBeTruthy();
    expect(service.getCurrentState().OBC.currentDraw).toBeGreaterThan(0);
  });

  it('disconnects obc payload', async () => {
    expect(service.getCurrentState().OBC.connected).toBeTruthy();

    await service.disconnectPayload(PayloadType.OBC)
    expect(service.getCurrentState().OBC.connected).toBeFalsy();
    expect(service.getCurrentState().OBC.currentDraw).toBe(0);
  });

  it('connects camera payload', async () => {
    expect(service.getCurrentState().Camera.connected).toBeTruthy();

    await service.disconnectPayload(PayloadType.Camera)
    expect(service.getCurrentState().Camera.connected).toBeFalsy();

    await service.connectPayload(PayloadType.Camera)
    expect(service.getCurrentState().Camera.connected).toBeTruthy();
    expect(service.getCurrentState().Camera.currentDraw).toBeGreaterThan(0);
  });

  it('disconnects camera payload', async () => {
    expect(service.getCurrentState().Camera.connected).toBeTruthy();

    await service.disconnectPayload(PayloadType.Camera)
    expect(service.getCurrentState().Camera.connected).toBeFalsy();
    expect(service.getCurrentState().Camera.currentDraw).toBe(0);
  });

  it('should simulate fluctuations every second', async () => {
    await service.simulateFluctuations();
    jest.advanceTimersByTime(1000);

    expect(service.gradualFluctuation).toHaveBeenCalledTimes(2 * Object.keys(service.getCurrentState()).length);

    expect(notificationService.dispatchAlerts).toHaveBeenCalledWith(service.getCurrentState());
  });

  it('payload state changes over time', async () => {
    const beforeState = JSON.parse(JSON.stringify(service.getCurrentState()));
    await service.simulateFluctuations();

    const afterState = service.getCurrentState();
    expect(afterState).not.toEqual(beforeState);

    expect(afterState.Camera.currentDraw).not.toBe(beforeState.Camera.currentDraw);
    expect(afterState.OBC.voltage).not.toBe(beforeState.OBC.voltage);
  });
});
