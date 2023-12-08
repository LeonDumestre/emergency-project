import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from "class-validator";
import { Fire } from "../fire.entity";

export class FireDto implements Fire {
  @IsNotEmpty({ message: "Id is required" })
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: "Latitude is required" })
  @IsNumber()
  latitude: number;

  @IsNotEmpty({ message: "Longitude is required" })
  @IsNumber()
  longitude: number;

  @IsNotEmpty({ message: "Intensity is required" })
  @IsInt()
  @IsPositive()
  intensity: number;

  @IsNotEmpty({ message: "TriggerAt is required" })
  @IsDate()
  triggerAt: Date;
}
