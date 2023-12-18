import { IsDate, IsNumber, IsString } from "class-validator";
import { Firefighter } from "../firefighter.entity";

export class FirefighterResponseDto implements Firefighter {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsDate()
  birthDate: Date;

  @IsString()
  grade: string;

  //@IsNumber()
  //fireStationId: number;
}
