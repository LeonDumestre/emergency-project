import { IsNumber, IsDate, IsEnum, IsArray } from "class-validator";
import { BaseFirefighterResponse } from "src/firefighter/dto/firefighter.response.dto";
import {
  BaseTruckResponse,
  BaseTruckResponseDto,
} from "src/truck/dto/truck.response.dto";
import { Operation, RETURNING, ON_ROAD, ON_SITE } from "../operation.entity";

export type CompleteOperationResponse = Pick<Operation, "id" | "start"> & {
  status: string;
  trucks: BaseTruckResponse[];
  firefighters: BaseFirefighterResponse[];
};

export class CompleteOperationResponseDto implements CompleteOperationResponse {
  @IsNumber()
  id: number;

  @IsDate()
  start: Date;

  @IsEnum([RETURNING, ON_ROAD, ON_SITE])
  status: string;

  @IsArray()
  trucks: BaseTruckResponseDto[];

  @IsArray()
  firefighters: BaseFirefighterResponse[];
}
