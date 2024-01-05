import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PowerModuleController } from './power-module/power-module.controller';
import { NotificationGateway } from './notification/notification.gateway';
import { NotificationService } from './notification/notification.service';
import { PowerModuleService } from './power-module/power-module.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],
  controllers: [PowerModuleController],
  providers: [PowerModuleService, NotificationService, NotificationGateway],
})
export class AppModule { }
