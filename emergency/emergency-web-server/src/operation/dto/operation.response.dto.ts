import { IsDate, IsEnum, IsNumber } from "class-validator";
import {
  RETURNING,
  ON_ROAD,
  ON_SITE,
  Operation,
  FINISHED,
} from "../operation.entity";

export type OperationResponse = Pick<
  Operation,
  "id" | "start" | "returnStart"
> & {
  status: string;
};

export class OperationResponseDto implements OperationResponse {
  @IsNumber()
  id: number;

  @IsDate()
  start: Date;

  @IsEnum([RETURNING, ON_ROAD, ON_SITE, FINISHED])
  status: string;

  @IsDate()
  returnStart?: Date;
}
