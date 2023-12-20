import { Body, Controller, Get, Post } from "@nestjs/common";
import { SendorService } from "./sensor.service";
import { CreateSensorRequestDto } from "./dto/create-sensor.request.dto";
import { Sensor } from "./sensor.entity";

@Controller("sensors")
export class SensorController {
  constructor(private readonly sensorService: SendorService) {}

  @Get()
  getSensors(): Promise<Sensor[]> {
    return this.sensorService.getSensors();
  }

  @Post()
  createSensor(@Body() sensor: CreateSensorRequestDto): Promise<Sensor> {
    return this.sensorService.createFirefighter(sensor);
  }
}
