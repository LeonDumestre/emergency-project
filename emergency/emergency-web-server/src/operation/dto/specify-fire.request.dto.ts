import { IsNotEmpty, IsNumber } from "class-validator";

export type SpecifyFire = {
  id: number;
  latitude: number;
  longitude: number;
};

export class SpecifyFireRequestDto implements SpecifyFire {
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
