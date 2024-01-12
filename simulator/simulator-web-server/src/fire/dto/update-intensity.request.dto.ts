import { IsNumber } from "class-validator";

export class UpdateIntensityRequestDto {
  @IsNumber()
  intensity: number;
}
