import { Module } from "@nestjs/common";
import { FireStationController } from "./fire-station.controller";
import { FireStationService } from "./fire-station.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FireStation } from "./fire-station.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FireStation])],
  controllers: [FireStationController],
  providers: [FireStationService],
})
export class FireStationModule {}
