import { Module } from "@nestjs/common";
import { FirefighterController } from "./firefighter.controller";
import { FirefighterService } from "./firefighter.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Firefighter } from "./firefighter.entity";
import { FireStation } from "src/fire-station/fire-station.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Firefighter, FireStation])],
  controllers: [FirefighterController],
  providers: [FirefighterService],
  exports: [FirefighterService],
})
export class FirefighterModule {}
