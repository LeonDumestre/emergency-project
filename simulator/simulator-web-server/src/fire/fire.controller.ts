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
import { FireRequestDto } from "./dto/fire.request.dto";
import { FireResponseDto } from "./dto/fire.response.dto";

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
  startFire(@Body() fire: FireRequestDto): Promise<FireResponseDto> {
    return this.fireService.startFire(fire);
  }

  @Patch(":id")
  updateFire(@Body() fire: FireRequestDto): Promise<FireResponseDto> {
    return this.fireService.updateFire(fire);
  }

  @Delete()
  @HttpCode(204)
  deleteFire(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.fireService.deleteFire(id);
  }
}
