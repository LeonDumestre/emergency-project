import { Module } from "@nestjs/common";
import { SensorController } from "./sensor.controller";
import { SendorService } from "./sensor.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sensor } from "./sensor.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Sensor])],
  controllers: [SensorController],
  providers: [SendorService],
})
export class SensorModule {}
