import { Module } from "@nestjs/common";
import { SseService } from "./sse.service";

@Module({
  providers: [SseService],
})
export class SseModule {}
