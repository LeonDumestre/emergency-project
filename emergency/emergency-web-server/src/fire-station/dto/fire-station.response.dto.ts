import { IsNumber, IsString } from "class-validator";
import { FireStation } from "../fire-station.entity";

export class FireStationResponseDto implements FireStation {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
