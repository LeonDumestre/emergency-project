import { IsNotEmpty, IsString } from "class-validator";

export type AskReinforcement = {
  truckType: string;
};

export class AskReinforcementRequestDto implements AskReinforcement {
  @IsNotEmpty({ message: "truck type is required" })
  @IsString()
  truckType: string;
}
