import { IsNotEmpty, IsNumber } from "class-validator";
import { Sensor } from "../sensor.entity";

export type CreateSensor = Omit<Sensor, "id">;

export class CreateSensorRequestDto implements CreateSensor {
  @IsNotEmpty({ message: "latitude is required" })
  @IsNumber()
  latitude: number;

  @IsNotEmpty({ message: "longitude is required" })
  @IsNumber()
  longitude: number;
}
