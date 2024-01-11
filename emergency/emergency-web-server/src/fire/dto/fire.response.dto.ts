import { IsNumber } from "class-validator";
import { Fire } from "../fire.entity";

export type FireResponse = Pick<
  Fire,
  "id" | "latitude" | "longitude" | "intensity"
>;

export class FireResponseDto implements FireResponse {
  @IsNumber()
  id: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  intensity: number;
}
