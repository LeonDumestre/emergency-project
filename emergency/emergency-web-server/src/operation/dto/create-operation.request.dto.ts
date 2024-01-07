import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export type CreateOperation = {
  start: Date;
  fire: number;
  firefighters: number[];
  trucks: string[];
  sensors: number[];
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

  @IsNotEmpty({ message: "sensors ids are required" })
  @IsNumber({}, { each: true })
  sensors: number[];
}
