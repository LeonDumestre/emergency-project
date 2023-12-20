import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { FireStation } from "../fire-station.entity";

export type CreateFireStation = Omit<FireStation, "id" | "firefighters">;

export class CreateFireStationRequestDto implements CreateFireStation {
  @IsNotEmpty({ message: "name is required" })
  @IsString()
  name: string;

  @IsNotEmpty({ message: "latitude is required" })
  @IsNumber()
  latitude: number;

  @IsNotEmpty({ message: "longitude is required" })
  @IsNumber()
  longitude: number;
}
