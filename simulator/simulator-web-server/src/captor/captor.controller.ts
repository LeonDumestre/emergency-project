import { Body, Controller, Get, Post } from "@nestjs/common";
import { CaptorService } from "./captor.service";
import { CaptorResponseDto } from "./dto/captor.response.dto";
import { CaptorRequestDto } from "./dto/captor.request.dto";

@Controller("captors")
export class CaptorController {
  constructor(private readonly captorService: CaptorService) {}

  @Get()
  getCaptors(): Promise<CaptorResponseDto[]> {
    return this.captorService.getCaptors();
  }

  @Post()
  createCaptor(@Body() captor: CaptorRequestDto): Promise<CaptorResponseDto> {
    return this.captorService.createCaptor(captor);
  }
}
