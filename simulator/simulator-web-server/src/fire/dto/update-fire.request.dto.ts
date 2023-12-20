import { IsInt, IsNotEmpty, IsPositive } from "class-validator";
import { Fire } from "../fire.entity";

export type UpdateFire = Pick<Fire, "id" | "intensity">;

export class UpdateFireRequestDto implements UpdateFire {
  @IsNotEmpty({ message: "id is required" })
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty({ message: "intensity is required" })
  @IsInt()
  @IsPositive()
  intensity: number;
}
