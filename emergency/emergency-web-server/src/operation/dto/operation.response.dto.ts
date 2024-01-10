import { IsDate, IsEnum, IsNumber } from "class-validator";
import { ON_RETURN, ON_ROAD, ON_SITE, Operation } from "../operation.entity";

export type OperationResponse = Pick<Operation, "id" | "start"> & {
  status: string;
};

export class OperationResponseDto implements OperationResponse {
  @IsNumber()
  id: number;

  @IsDate()
  start: Date;

  @IsEnum([ON_RETURN, ON_ROAD, ON_SITE])
  status: string;
}
