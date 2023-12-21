import { Body, Controller, Get, Post } from "@nestjs/common";
import { SensorService } from "./sensor.service";
import { SensorResponseDto } from "./dto/sensor.response.dto";
import { CreateSensorRequestDto } from "./dto/create-sensor.request.dto";

@Controller("sensors")
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  getSensors(): Promise<SensorResponseDto[]> {
    return this.sensorService.getSensors();
  }

  @Post()
  createSensor(
    @Body() sensor: CreateSensorRequestDto,
  ): Promise<SensorResponseDto> {
    return this.sensorService.createSensor(sensor);
  }
}
