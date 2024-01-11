import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Sse,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { FireService } from "./fire.service";
import { CreateFireRequestDto } from "./dto/create-fire.request.dto";
import { FireResponseDto } from "./dto/fire.response.dto";
import { UpdateIntensityRequestDto } from "./dto/update-intensity.request.dto";
import { FireEvent } from "src/event/event.service";

@Controller("fires")
export class FireController {
  constructor(private readonly fireService: FireService) {}

  @Get()
  getFires(): Promise<FireResponseDto[]> {
    return this.fireService.getFires();
  }

  @Get(":id")
  getFire(@Param("id", ParseIntPipe) id: number): Promise<FireResponseDto> {
    return this.fireService.getFire(id);
  }

  @Post()
  startFire(@Body() fire: CreateFireRequestDto): Promise<FireResponseDto> {
    return this.fireService.startFire(fire);
  }

  @Post(":id/intensity")
  updateIntensity(
    @Param("id", ParseIntPipe) id: number,
    @Body() { intensity }: UpdateIntensityRequestDto,
  ): Promise<FireResponseDto> {
    return this.fireService.updateIntensity(id, intensity);
  }

  @Delete()
  @HttpCode(204)
  deleteFire(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.fireService.deleteFire(id);
  }

  @Delete("all")
  @HttpCode(204)
  deleteAllFires(): Promise<void> {
    return this.fireService.deleteAllFires();
  }

  @Sse("live")
  liveFires(): Observable<FireEvent> {
    return this.fireService.inLive();
  }
}
