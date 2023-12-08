import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from "class-validator";
import { Fire } from "../fire.entity";

export type CreateFireRequest = Omit<Fire, "id">;

export class CreateFireRequestDto implements CreateFireRequest {
  @IsNotEmpty({ message: "latitude is required" })
  @IsNumber()
  latitude: number;

  @IsNotEmpty({ message: "longitude is required" })
  @IsNumber()
  longitude: number;

  @IsNotEmpty({ message: "intensity is required" })
  @IsInt()
  @IsPositive()
  intensity: number;

  @IsNotEmpty({ message: "triggerAt is required" })
  @IsDateString()
  triggerAt: Date;
}
