import { Module } from "@nestjs/common";
import { EventService } from "./event.service";

@Module({
  providers: [
    {
      provide: EventService,
      useFactory: () => EventService.init(),
    },
  ],
  exports: [EventService],
})
export class EventModule {}
