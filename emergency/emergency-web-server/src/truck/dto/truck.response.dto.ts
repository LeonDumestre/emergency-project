import { IsDate, IsNumber, IsString } from "class-validator";
import { Truck } from "../truck.entity";
import { TruckType } from "../truck-type.entity";

export type TruckTypeResponse = Omit<TruckType, "trucks">;

export type TruckResponse = Omit<Truck, "type" | "fireStation"> & {
  type: string;
  capacity: number;
  fireStationId: number;
};

export class TruckResponseDto implements TruckResponse {
  @IsString()
  plate: string;

  @IsDate()
  acquisition: Date;

  @IsString()
  type: string;

  @IsNumber()
  capacity: number;

  @IsNumber()
  fireStationId: number;
}
