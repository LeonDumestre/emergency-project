import { IsNumber } from "class-validator";
import { Captor } from "../captor.entity";

export class CaptorResponseDto implements Captor {
  @IsNumber()
  id: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
