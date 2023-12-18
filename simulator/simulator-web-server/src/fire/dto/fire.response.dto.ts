import { IsDate, IsInt, IsNumber, IsPositive } from "class-validator";
import { Fire } from "../fire.entity";

export class FireResponseDto implements Fire {
  @IsNumber()
  id: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsInt()
  @IsPositive()
  intensity: number;

  @IsDate()
  triggerAt: Date;
}
