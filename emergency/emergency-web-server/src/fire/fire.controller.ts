import { Body, Controller, Get, Post } from "@nestjs/common";
import { FireService } from "./fire.service";
import { CreateFireRequestDto } from "./dto/create-fire.request.dto";
import { FireResponseDto } from "./dto/fire.response.dto";

@Controller("fires")
export class FireController {
  constructor(private readonly fireService: FireService) {}

  @Get()
  getSensors(): Promise<FireResponseDto[]> {
    return this.fireService.getFires();
  }

  @Post()
  createFire(@Body() fire: CreateFireRequestDto): Promise<FireResponseDto> {
    return this.fireService.createFire(fire);
  }
}
