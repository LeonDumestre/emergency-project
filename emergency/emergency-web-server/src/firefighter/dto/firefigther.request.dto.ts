import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Firefighter } from "../firefighter.entity";

export class CreateFirefighterRequestDto implements Firefighter {
  @IsNotEmpty({ message: "id is required" })
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: "name is required" })
  @IsString()
  name: string;

  @IsNotEmpty({ message: "birth date is required" })
  @IsDateString()
  birthDate: Date;

  @IsNotEmpty({ message: "grade is required" })
  @IsString()
  grade: string;

  //@IsNotEmpty({ message: "fire station id is required" })
  //@IsNumber()
  //fireStationId: number;
}
