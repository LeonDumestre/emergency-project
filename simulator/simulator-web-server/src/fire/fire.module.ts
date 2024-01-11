import { Module } from "@nestjs/common";
import { FireController } from "./fire.controller";
import { FireService } from "./fire.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fire } from "./fire.entity";
import { EventModule } from "src/event/event.module";

@Module({
  imports: [TypeOrmModule.forFeature([Fire]), EventModule],
  controllers: [FireController],
  providers: [FireService],
})
export class FireModule {}
