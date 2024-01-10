import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { FireService } from "./fire.service";
import { CreateFireRequestDto } from "./dto/create-fire.request.dto";
import { FireResponseDto } from "./dto/fire.response.dto";
import { OperationResponseDto } from "src/operation/dto/operation.response.dto";

@Controller("fires")
export class FireController {
  constructor(private readonly fireService: FireService) {}

  @Get()
  getFires(): Promise<FireResponseDto[]> {
    return this.fireService.getFires();
  }

  @Get(":id/operation")
  getOperationByFire(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<OperationResponseDto> {
    return this.fireService.getOperation(id);
  }

  @Post()
  createFire(@Body() fire: CreateFireRequestDto): Promise<FireResponseDto> {
    return this.fireService.createFire(fire);
  }
}
