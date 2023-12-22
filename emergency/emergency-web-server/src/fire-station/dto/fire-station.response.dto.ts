import { IsArray, IsNumber, IsString } from "class-validator";
import { FireStation } from "../fire-station.entity";
import { BaseFirefighterResponseDto } from "src/firefighter/dto/firefighter.response.dto";
import { BaseTruckResponseDto } from "src/truck/dto/truck.response.dto";

export type BaseFireStationResponse = Omit<
  FireStation,
  "firefighters" | "trucks"
>;

export type FireStationResponse = BaseFireStationResponse & {
  firefighters: BaseFirefighterResponseDto[];
  trucks: BaseTruckResponseDto[];
};

export class BaseFireStationResponseDto implements BaseFireStationResponse {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

export class FireStationResponseDto
  extends BaseFireStationResponseDto
  implements FireStationResponse
{
  @IsArray()
  firefighters: BaseFirefighterResponseDto[];

  @IsArray()
  trucks: BaseTruckResponseDto[];
}
