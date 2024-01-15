import { IsArray, IsDate, IsObject, IsOptional } from "class-validator";
import {
  FirefighterResponse,
  FirefighterResponseDto,
} from "src/firefighter/dto/firefighter.response.dto";
import {
  TruckResponse,
  TruckResponseDto,
} from "src/truck/dto/truck.response.dto";
import { Operation } from "../operation.entity";
import { FireResponse, FireResponseDto } from "src/fire/dto/fire.response.dto";
import { OperationResponseDto } from "./operation.response.dto";

export type CompleteOperationResponse = Pick<Operation, "id" | "start"> & {
  status: string;
  fire?: FireResponse;
  returnStart?: Date;
  trucks: TruckResponse[];
  firefighters: FirefighterResponse[];
};

export class CompleteOperationResponseDto
  extends OperationResponseDto
  implements CompleteOperationResponse
{
  @IsObject()
  @IsOptional()
  fire?: FireResponseDto;

  @IsDate()
  @IsOptional()
  returnStart?: Date;

  @IsArray()
  trucks: TruckResponseDto[];

  @IsArray()
  firefighters: FirefighterResponseDto[];
}
