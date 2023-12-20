import { Body, Controller, Get, Post } from "@nestjs/common";
import { TruckService } from "./truck.service";
import { CreateTruckRequestDto } from "./dto/create-truck.request.dto";
import { TruckResponseDto } from "./dto/truck.response.dto";

@Controller("trucks")
export class TruckController {
  constructor(private readonly truckService: TruckService) {}

  @Get()
  getTrucks(): Promise<TruckResponseDto[]> {
    return this.truckService.getTrucks();
  }

  @Post()
  createTruck(@Body() truck: CreateTruckRequestDto): Promise<TruckResponseDto> {
    return this.truckService.createTruck(truck);
  }
}
