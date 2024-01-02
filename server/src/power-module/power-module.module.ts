import { Module } from '@nestjs/common';
import { PowerModuleController } from './power-module.controller';
import { PowerModuleService } from './power-module.service';
import { NotificationService } from '../notification-service/notification.service';

@Module({
  imports: [],
  controllers: [PowerModuleController],
  providers: [PowerModuleService, NotificationService],
})
export class PowerModuleModule { }
