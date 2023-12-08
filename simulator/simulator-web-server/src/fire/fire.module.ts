import { Module } from "@nestjs/common";
import { FireController } from "./fire.controller";
import { FireService } from "./fire.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fire } from "./fire.entity";
import { SseService } from "src/sse/sse.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Module({
  imports: [TypeOrmModule.forFeature([Fire])],
  controllers: [FireController],
  providers: [FireService, SseService, EventEmitter2],
})
export class FireModule {}
