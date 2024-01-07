import { IsNotEmpty, IsNumber } from "class-validator";
import { Fire } from "../fire.entity";

export type CreateFire = Omit<Fire, "id">;

export class CreateFireRequestDto implements CreateFire {
  @IsNotEmpty({ message: "latitude is required" })
  @IsNumber()
  latitude: number;

  @IsNotEmpty({ message: "longitude is required" })
  @IsNumber()
  longitude: number;
}
