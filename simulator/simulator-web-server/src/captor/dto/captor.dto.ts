import { IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Captor } from "../captor.entity";

export class CaptorDto implements Captor {
  @IsNotEmpty({ message: "Id is required" })
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: "Intensity is required" })
  @IsInt()
  @IsPositive()
  intensity: number;
}
