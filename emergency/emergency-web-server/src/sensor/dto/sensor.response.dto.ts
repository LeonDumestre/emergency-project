import { IsNumber } from "class-validator";
import { Sensor } from "../sensor.entity";

export type SensorResponse = Pick<Sensor, "id" | "latitude" | "longitude">;

export class SensorResponseDto implements SensorResponse {
  @IsNumber()
  id: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
