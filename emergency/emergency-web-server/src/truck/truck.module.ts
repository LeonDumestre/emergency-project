import { Module } from "@nestjs/common";
import { TruckController } from "./truck.controller";
import { TruckService } from "./truck.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Truck } from "./truck.entity";
import { TruckType } from "./truck-type.entity";
import { FireStation } from "src/fire-station/fire-station.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Truck, TruckType, FireStation])],
  controllers: [TruckController],
  providers: [TruckService],
})
export class TruckModule {}
