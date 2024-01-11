import { OperationResponse } from "src/operation/dto/operation.response.dto";
import { FireResponse, FireResponseDto } from "./fire.response.dto";
import { IsObject } from "class-validator";

export type FireWithOperationResponse = FireResponse & {
  operation: OperationResponse;
};

export class FireWithOperationResponseDto
  extends FireResponseDto
  implements FireWithOperationResponse
{
  @IsObject()
  operation: OperationResponse;
}
