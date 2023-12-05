import { Controller, Delete, HttpCode, Patch, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("fire")
  @HttpCode(204)
  startFire(): void {
    return this.appService.startFire();
  }

  @Patch("fire")
  @HttpCode(204)
  updateFire(): void {
    return this.appService.updateFire();
  }

  @Delete("fire")
  @HttpCode(204)
  deleteFire(): void {
    return this.appService.deleteFire();
  }
}
