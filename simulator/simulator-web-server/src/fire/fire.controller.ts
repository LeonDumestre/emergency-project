import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
} from "@nestjs/common";
import { FireService } from "./fire.service";
import { Fire } from "./fire.entity";
import { CreateFireDto } from "./dto/create-fire.dto";

@Controller("fires")
export class FireController {
  constructor(private readonly fireService: FireService) {}

  @Get()
  getFires(): Promise<Fire[]> {
    return this.fireService.getFires();
  }

  @Post()
  @HttpCode(204)
  startFire(@Body() fire: CreateFireDto): void {
    return this.fireService.startFire(fire);
  }

  @Patch()
  @HttpCode(204)
  updateFire(): void {
    return this.fireService.updateFire();
  }

  @Delete()
  @HttpCode(204)
  deleteFire(): void {
    return this.fireService.deleteFire();
  }
}
