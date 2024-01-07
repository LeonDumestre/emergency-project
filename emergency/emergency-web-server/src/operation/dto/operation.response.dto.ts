import { IsDate, IsNumber, IsOptional } from "class-validator";
import { Operation } from "../operation.entity";

export class OperationResponseDto implements Operation {
  @IsNumber()
  id: number;

  @IsDate()
  start: Date;

  @IsDate()
  @IsOptional()
  end?: Date;
}
