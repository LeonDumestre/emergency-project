import { IsDate, IsObject, IsString } from "class-validator";
import { Truck } from "../truck.entity";
import { TruckType } from "../truck-type.entity";

export type TruckTypeResponse = Omit<TruckType, "trucks">;

export type TruckResponse = Omit<Truck, "type"> & {
  type: TruckTypeResponse;
};

export class TruckResponseDto implements TruckResponse {
  @IsString()
  plate: string;

  @IsDate()
  acquisition: Date;

  @IsObject()
  type: TruckTypeResponse;
}

export class TruckTypeResponseDto implements TruckTypeResponse {
  @IsString()
  type: string;

  @IsString()
  capacity: Date;
}
