import { IsDate, IsNumber, IsOptional } from "class-validator";
import { Operation } from "../operation.entity";

export type OperationResponse = Pick<Operation, "id" | "start" | "end">;

export class OperationResponseDto implements OperationResponse {
  @IsNumber()
  id: number;

  @IsDate()
  start: Date;

  @IsDate()
  @IsOptional()
  end?: Date;
}
