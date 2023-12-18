import { Body, Controller, Get, Post } from "@nestjs/common";
import { FireStationService } from "./fire-station.service";
import { FireStationResponseDto } from "./dto/fire-station.response.dto";
import { CreateFireStationRequestDto } from "./dto/fire-station.request.dto";

@Controller("fire-stations")
export class FireStationController {
  constructor(private readonly fireStationService: FireStationService) {}

  @Get()
  getFireStations(): Promise<FireStationResponseDto[]> {
    return this.fireStationService.getFireStations();
  }

  @Post()
  createFireStation(
    @Body() fireStation: CreateFireStationRequestDto,
  ): Promise<FireStationResponseDto> {
    return this.fireStationService.createFireStation(fireStation);
  }
}
