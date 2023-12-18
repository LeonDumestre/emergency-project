import { Body, Controller, Get, Post } from "@nestjs/common";
import { CaptorService } from "./captor.service";
import { Captor } from "./captor.entity";
import { CaptorDto } from "./dto/captor.dto";

@Controller("captors")
export class CaptorController {
  constructor(private readonly captorService: CaptorService) {}

  @Get()
  getCaptors(): Promise<Captor[]> {
    return this.captorService.getCaptors();
  }

  @Post()
  upsertCaptor(@Body() captor: CaptorDto): Promise<Captor> {
    return this.captorService.upsertCaptor(captor);
  }
}
