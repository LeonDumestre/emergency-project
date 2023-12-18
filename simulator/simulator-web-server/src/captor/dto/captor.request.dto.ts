import { IsNotEmpty, IsNumber } from "class-validator";
import { Captor } from "../captor.entity";

export class CaptorRequestDto implements Captor {
  @IsNotEmpty({ message: "id is required" })
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: "latitude is required" })
  @IsNumber()
  latitude: number;

  @IsNotEmpty({ message: "longitude is required" })
  @IsNumber()
  longitude: number;
}
