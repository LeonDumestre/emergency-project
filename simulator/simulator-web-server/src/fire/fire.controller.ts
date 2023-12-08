import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Sse,
} from "@nestjs/common";
import { FireService } from "./fire.service";
import { Fire } from "./fire.entity";
import { CreateFireRequestDto } from "./dto/create-fire.request.dto";
import { FireDto } from "./dto/fire.dto";
import { SseService } from "src/sse/sse.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Observable, fromEvent, map } from "rxjs";

const NEW_FIRE_EVENT_NAME = "new-fire";

@Controller("fires")
export class FireController {
  constructor(
    private readonly fireService: FireService,
    private readonly sseService: SseService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Sse("sse")
  sse(): Observable<MessageEvent> {
    console.log("sse");
    return fromEvent(this.eventEmitter, NEW_FIRE_EVENT_NAME).pipe(
      map(() => {
        return new MessageEvent("new-fire", { data: "new-fire" });
      }),
    );
  }

  @Get()
  getFires(): Promise<Fire[]> {
    this.sseService.emitEvent(NEW_FIRE_EVENT_NAME);
    return this.fireService.getFires();
  }

  @Post()
  startFire(@Body() fire: CreateFireRequestDto): Promise<Fire> {
    this.sseService.emitEvent(NEW_FIRE_EVENT_NAME);
    return this.fireService.startFire(fire);
  }

  @Patch(":id")
  updateFire(@Body() fire: FireDto): Promise<Fire> {
    return this.fireService.updateFire(fire);
  }

  @Delete()
  @HttpCode(204)
  deleteFire(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.fireService.deleteFire(id);
  }
}
