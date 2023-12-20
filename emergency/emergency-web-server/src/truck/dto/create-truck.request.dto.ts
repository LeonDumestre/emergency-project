import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Truck } from "../truck.entity";

export type CreateTruck = Omit<Truck, "type" | "fireStation"> & {
  type: string;
  fireStationId: number;
};

export class CreateTruckRequestDto implements CreateTruck {
  @IsNotEmpty({ message: "plate is required" })
  @IsString()
  plate: string;

  @IsNotEmpty({ message: "acquisition date is required" })
  @IsDateString()
  acquisition: Date;

  @IsNotEmpty({ message: "truck type is required" })
  @IsString()
  type: string;

  @IsNotEmpty({ message: "fire station id is required" })
  @IsNumber()
  fireStationId: number;
}
