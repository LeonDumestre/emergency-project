import { IsNumber } from "class-validator";
import { Fire } from "../fire.entity";

export type FireResponse = Pick<Fire, "id" | "latitude" | "longitude">;

export class FireResponseDto implements FireResponse {
  @IsNumber()
  id: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
