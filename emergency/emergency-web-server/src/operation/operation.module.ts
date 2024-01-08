import { Module } from "@nestjs/common";
import { OperationController } from "./operation.controller";
import { OperationService } from "./operation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Operation } from "./operation.entity";
import { Fire } from "src/fire/fire.entity";
import { Firefighter } from "src/firefighter/firefighter.entity";
import { Truck } from "src/truck/truck.entity";
import { Sensor } from "src/sensor/sensor.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Operation, Fire, Firefighter, Truck, Sensor]),
  ],
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
