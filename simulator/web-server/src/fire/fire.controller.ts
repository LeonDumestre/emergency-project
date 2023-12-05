import { Controller, Delete, Get, HttpCode, Patch, Post } from "@nestjs/common";
import { Fire } from "./fire.model";
import { FireService } from "./fire.service";

@Controller("fires")
export class FireController {
  constructor(private readonly fireService: FireService) {}

  @Get()
  getFires(): Promise<Fire[]> {
    return this.fireService.getFires();
  }

  @Post()
  @HttpCode(204)
  startFire(): void {
    return this.fireService.startFire();
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
