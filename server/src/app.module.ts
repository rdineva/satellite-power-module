import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PowerModuleController } from './controllers/power-module.controller';
import { NotificationGateway } from './gateways/notification.gateway';
import { NotificationService } from './services/notification.service';
import { PowerModuleService } from './services/power-module.service';
import { PayloadStateService } from './services/payload-state.service';
import { AlertEventService } from './services/alert-event.service';
import { CommandService } from './services/command.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PayloadStateSchema } from './schemas/payload-state.schema';
import { AlertEventSchema } from './schemas/alert-event.schema';
import { CommandSchema } from './schemas/command.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/satellite-power-module'),
    MongooseModule.forFeature([
      { name: 'PayloadState', schema: PayloadStateSchema },
      { name: 'AlertEvent', schema: AlertEventSchema },
      { name: 'Command', schema: CommandSchema }
    ])
  ],
  controllers: [PowerModuleController],
  providers: [
    PowerModuleService,
    NotificationService,
    NotificationGateway,
    PayloadStateService,
    AlertEventService,
    CommandService,
  ],
})
export class AppModule { }
