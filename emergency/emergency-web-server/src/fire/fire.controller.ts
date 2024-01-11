import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { FireService } from "./fire.service";
import { CreateFireRequestDto } from "./dto/create-fire.request.dto";
import { FireResponseDto } from "./dto/fire.response.dto";
import { OperationResponseDto } from "src/operation/dto/operation.response.dto";
import { UpdateIntensityRequestDto } from "./dto/update-intensity.request.dto";

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
    return this.fireService.getOperationByFire(id);
  }

  @Post()
  createFire(@Body() fire: CreateFireRequestDto): Promise<FireResponseDto> {
    return this.fireService.createFire(fire);
  }

  @Post(":id/intensity")
  updateIntensity(
    @Param("id", ParseIntPipe) id: number,
    @Body() { intensity }: UpdateIntensityRequestDto,
  ): Promise<FireResponseDto> {
    return this.fireService.updateIntensity(id, intensity);
  }

  @Delete(":id")
  @HttpCode(204)
  deleteFire(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.fireService.deleteFire(id);
  }
}
