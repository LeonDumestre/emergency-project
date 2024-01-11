import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export type AskReinforcement = {
  truckType: string;
  quantity: number;
};

export class AskReinforcementRequestDto implements AskReinforcement {
  @IsNotEmpty({ message: "truck type is required" })
  @IsString()
  truckType: string;

  @IsNotEmpty({ message: "quantity is required" })
  @IsNumber()
  quantity: number;
}
