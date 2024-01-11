import { FireResponse, FireResponseDto } from "./fire.response.dto";
import { IsObject } from "class-validator";
import { CompleteOperationResponse } from "src/operation/dto/complete-operation.response.dto";

export type FireWithOperationResponse = FireResponse & {
  operation: Omit<CompleteOperationResponse, "fire">;
};

export class FireWithOperationResponseDto
  extends FireResponseDto
  implements FireWithOperationResponse
{
  @IsObject()
  operation: Omit<CompleteOperationResponse, "fire">;
}
