import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { FireService } from "./fire.service";
import { CreateFireRequestDto } from "./dto/create-fire.request.dto";
import { FireResponseDto } from "./dto/fire.response.dto";
import { UpdateFireRequestDto } from "./dto/update-fire.request.dto";

@Controller("fires")
export class FireController {
  constructor(private readonly fireService: FireService) {}

  @Get()
  getFires(): Promise<FireResponseDto[]> {
    return this.fireService.getFires();
  }

  @Get(":id")
  getFire(@Param("id", ParseIntPipe) id: number): Promise<FireResponseDto[]> {
    return this.fireService.getFire(id);
  }

  @Post()
  startFire(@Body() fire: CreateFireRequestDto): Promise<FireResponseDto> {
    return this.fireService.startFire(fire);
  }

  @Patch(":id")
  updateFire(@Body() fire: UpdateFireRequestDto): Promise<FireResponseDto> {
    return this.fireService.updateFire(fire);
  }

  @Delete()
  @HttpCode(204)
  deleteFire(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.fireService.deleteFire(id);
  }
}
