import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Truck } from "../truck.entity";

export class CreateTruckRequestDto implements Truck {
  @IsNotEmpty({ message: "plate is required" })
  @IsString()
  plate: string;

  @IsNotEmpty({ message: "acquisition date is required" })
  @IsDateString()
  acquisition: Date;

  @IsNotEmpty({ message: "truck type is required" })
  @IsString()
  type: string;
}
