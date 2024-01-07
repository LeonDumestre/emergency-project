import { IsNumber } from "class-validator";
import { Fire } from "../fire.entity";

export class FireResponseDto implements Fire {
  @IsNumber()
  id: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
