import { Body, Controller, Get, Post } from "@nestjs/common";
import { FirefighterService } from "./firefighter.service";
import { CreateFirefighterRequestDto } from "./dto/create-firefigther.request.dto";
import { FirefighterResponse } from "./dto/firefighter.response.dto";

@Controller("firefighters")
export class FirefighterController {
  constructor(private readonly firefighterService: FirefighterService) {}

  @Get()
  getFirefighters(): Promise<FirefighterResponse[]> {
    return this.firefighterService.getFirefighters();
  }

  @Post()
  createFirefighter(
    @Body() firefighter: CreateFirefighterRequestDto,
  ): Promise<FirefighterResponse> {
    return this.firefighterService.createFirefighter(firefighter);
  }
}
