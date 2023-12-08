import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class SseService {
  constructor(private eventEmitter: EventEmitter2) {}

  emitEvent(eventName: string) {
    console.log("emitEvent");
    this.eventEmitter.emit(eventName);
  }
}
