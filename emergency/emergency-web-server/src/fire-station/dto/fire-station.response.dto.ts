import { IsNumber, IsString } from "class-validator";
import { FireStation } from "../fire-station.entity";

export type FireStationResponse = Omit<FireStation, "id_fire_station"> & {
  id: number;
};

export class FireStationResponseDto implements FireStationResponse {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
