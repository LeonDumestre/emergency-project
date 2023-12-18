import { Module } from "@nestjs/common";
import { FirefighterController } from "./firefighter.controller";
import { FirefighterService } from "./firefighter.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Firefighter } from "./firefighter.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Firefighter])],
  controllers: [FirefighterController],
  providers: [FirefighterService],
})
export class FirefighterModule {}
