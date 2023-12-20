import { IsNumber } from "class-validator";
import { Sensor } from "../sensor.entity";

export class SensorResponseDto implements Sensor {
  @IsNumber()
  id: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
