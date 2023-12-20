import { Module } from "@nestjs/common";
import { SensorController } from "./sensor.controller";
import { SensorService } from "./sensor.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sensor } from "./sensor.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Sensor])],
  controllers: [SensorController],
  providers: [SensorService],
})
export class SensorModule {}
