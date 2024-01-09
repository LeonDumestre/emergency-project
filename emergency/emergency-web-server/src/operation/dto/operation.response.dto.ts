import { IsDate, IsNumber } from "class-validator";
import { Operation } from "../operation.entity";

export type OperationResponse = Pick<Operation, "id" | "start">;

export class OperationResponseDto implements OperationResponse {
  @IsNumber()
  id: number;

  @IsDate()
  start: Date;
}
