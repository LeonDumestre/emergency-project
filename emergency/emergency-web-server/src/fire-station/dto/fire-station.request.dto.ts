import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { FireStation } from "../fire-station.entity";

export class CreateFireStationRequestDto implements FireStation {
  @IsNotEmpty({ message: "id is required" })
  @IsNumber()
  id: number;

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
