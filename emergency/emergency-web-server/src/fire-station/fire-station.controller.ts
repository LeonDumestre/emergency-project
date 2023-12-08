import { Controller, Get } from "@nestjs/common";
import { FireStationService } from "./fire-station.service";
import { FireStationResponseDto } from "./dto/fire-station.response.dto";

@Controller("fire-stations")
export class FireStationController {
  constructor(private readonly fireStationService: FireStationService) {}

  @Get()
  getFireStations(): Promise<FireStationResponseDto[]> {
    return this.fireStationService.getFireStations();
  }
}
