import { IsArray, IsObject } from "class-validator";
import { BaseFirefighterResponse } from "src/firefighter/dto/firefighter.response.dto";
import {
  TruckResponse,
  TruckResponseDto,
} from "src/truck/dto/truck.response.dto";
import { Operation } from "../operation.entity";
import { FireResponse, FireResponseDto } from "src/fire/dto/fire.response.dto";
import { OperationResponseDto } from "./operation.response.dto";

export type CompleteOperationResponse = Pick<Operation, "id" | "start"> & {
  status: string;
  fire: FireResponse;
  trucks: TruckResponse[];
  firefighters: BaseFirefighterResponse[];
};

export class CompleteOperationResponseDto
  extends OperationResponseDto
  implements CompleteOperationResponse
{
  @IsObject()
  fire: FireResponseDto;

  @IsArray()
  trucks: TruckResponseDto[];

  @IsArray()
  firefighters: BaseFirefighterResponse[];
}
