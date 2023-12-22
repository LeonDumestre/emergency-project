import { IsDate, IsNumber, IsString } from "class-validator";
import { Firefighter } from "../firefighter.entity";

type BaseFirefighterResponse = Omit<Firefighter, "fireStation">;

export type FirefighterResponse = BaseFirefighterResponse & {
  fireStationId: number;
};

export class BaseFirefighterResponseDto implements BaseFirefighterResponse {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsDate()
  birthDate: Date;

  @IsString()
  grade: string;
}

export class FirefighterResponseDto
  extends BaseFirefighterResponseDto
  implements FirefighterResponse
{
  @IsNumber()
  fireStationId: number;
}
