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
import { CreateFireDto } from "./dto/create-fire.dto";
import { FireDto } from "./dto/fire.dto";

@Controller("fires")
export class FireController {
  constructor(private readonly fireService: FireService) {}

  @Get()
  getFires(): Promise<Fire[]> {
    return this.fireService.getFires();
  }

  @Post()
  startFire(@Body() fire: CreateFireDto): Promise<Fire> {
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
