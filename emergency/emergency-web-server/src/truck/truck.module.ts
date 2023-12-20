import { Module } from "@nestjs/common";
import { TruckController } from "./truck.controller";
import { TruckService } from "./truck.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Truck } from "./truck.entity";
import { TruckType } from "./truck-type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Truck, TruckType])],
  controllers: [TruckController],
  providers: [TruckService],
})
export class TruckModule {}
