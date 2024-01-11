import { IsNumber, IsPositive } from "class-validator";

export class UpdateIntensityRequestDto {
  @IsNumber()
  @IsPositive()
  intensity: number;
}
