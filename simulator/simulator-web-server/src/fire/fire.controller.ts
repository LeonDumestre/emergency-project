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
import { Fire } from "./fire.entity";
import { CreateFireRequestDto } from "./dto/create-fire.request.dto";
import { FireDto } from "./dto/fire.dto";

@Controller("fires")
export class FireController {
  constructor(private readonly fireService: FireService) {}

  @Get()
  getFires(): Promise<Fire[]> {
    return this.fireService.getFires();
  }

  @Get(":id")
  getFire(@Param("id", ParseIntPipe) id: number): Promise<Fire[]> {
    return this.fireService.getFire(id);
  }

  @Post()
  startFire(@Body() fire: CreateFireRequestDto): Promise<Fire> {
    return this.fireService.startFire(fire);
  }

  @Patch(":id")
  updateFire(@Body() fire: FireDto): Promise<Fire> {
    return this.fireService.updateFire(fire);
  }

  @Delete()
  @HttpCode(204)
  deleteFire(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.fireService.deleteFire(id);
  }
}
