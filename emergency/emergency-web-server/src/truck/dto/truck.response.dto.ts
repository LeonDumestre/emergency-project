import { IsDate, IsNumber, IsString } from "class-validator";
import { Truck } from "../truck.entity";
import { TruckType } from "../truck-type.entity";

export type TruckTypeResponse = Omit<TruckType, "trucks">;

export type BaseTruckResponse = Pick<Truck, "plate" | "acquisition"> & {
  type: string;
  capacity: number;
};

export type TruckResponse = BaseTruckResponse & {
  fireStationId: number;
};

export class BaseTruckResponseDto implements BaseTruckResponse {
  @IsString()
  plate: string;

  @IsDate()
  acquisition: Date;

  @IsString()
  type: string;

  @IsNumber()
  capacity: number;
}

export class TruckResponseDto
  extends BaseTruckResponseDto
  implements TruckResponse
{
  @IsNumber()
  fireStationId: number;
}
