import { IsDate, IsString } from "class-validator";
import { Truck } from "../truck.entity";

export class TruckResponseDto implements Truck {
  @IsString()
  plate: string;

  @IsDate()
  acquisition: Date;

  @IsString()
  type: string;
}
