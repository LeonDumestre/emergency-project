import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { Operation } from "../operation.entity";

export type CreateOperation = Pick<Operation, "start"> & {
  fire: number;
  firefighters: number[];
  trucks: string[];
};

export class CreateOperationRequestDto implements CreateOperation {
  @IsNotEmpty({ message: "start date is required" })
  @IsDateString()
  start: Date;

  @IsNotEmpty({ message: "fire id is required" })
  @IsNumber()
  fire: number;

  @IsNotEmpty({ message: "firefighters ids are required" })
  @IsNumber({}, { each: true })
  firefighters: number[];

  @IsNotEmpty({ message: "trucks plates are required" })
  @IsNumber({}, { each: true })
  trucks: string[];
}
