import { Module } from '@nestjs/common';
import { PowerModuleModule } from './power-module/power-module.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    PowerModuleModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
