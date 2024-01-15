import { FireResponse, FireResponseDto } from "./fire.response.dto";
import { IsObject } from "class-validator";
import { BaseFirefighterResponse } from "src/firefighter/dto/firefighter.response.dto";
import { CompleteOperationResponse } from "src/operation/dto/complete-operation.response.dto";

type Operation = Omit<CompleteOperationResponse, "fire" | "firefighters"> & {
  firefighters: BaseFirefighterResponse[];
};

export type FireWithOperationResponse = FireResponse & {
  operation: Operation;
};

export class FireWithOperationResponseDto
  extends FireResponseDto
  implements FireWithOperationResponse
{
  @IsObject()
  operation: Operation;
}
