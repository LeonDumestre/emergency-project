import { Body, Controller, Get, Post } from "@nestjs/common";
import { FirefighterService } from "./firefighter.service";
import { CreateFirefighterRequestDto } from "./dto/firefigther.request.dto";
import { FirefighterResponseDto } from "./dto/firefighter.response.dto";

@Controller("firefighters")
export class FirefighterController {
  constructor(private readonly firefighterService: FirefighterService) {}

  @Get()
  getFirefighters(): Promise<FirefighterResponseDto[]> {
    return this.firefighterService.getFirefighters();
  }

  @Post()
  createFirefighter(
    @Body() firefighter: CreateFirefighterRequestDto,
  ): Promise<FirefighterResponseDto> {
    return this.firefighterService.createFirefighter(firefighter);
  }
}
