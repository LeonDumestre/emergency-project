import { IsDate, IsNumber, IsString } from "class-validator";
import { Firefighter } from "../firefighter.entity";

export type FirefighterResponse = Omit<Firefighter, "fireStation"> & {
  fireStationId: number;
};

export class FirefighterResponseDto implements FirefighterResponse {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsDate()
  birthDate: Date;

  @IsString()
  grade: string;

  @IsNumber()
  fireStationId: number;
}
