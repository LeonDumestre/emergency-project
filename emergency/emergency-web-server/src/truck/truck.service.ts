import { Injectable } from "@nestjs/common";
import { Truck } from "./truck.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  TruckResponse,
  TruckResponseDto,
  TruckTypeResponse,
  TruckTypeResponseDto,
} from "./dto/truck.response.dto";
import { CreateTruck } from "./dto/create-truck.request.dto";
import { TruckType } from "./truck-type.entity";

@Injectable()
export class TruckService {
  constructor(
    @InjectRepository(Truck)
    private readonly trucks: Repository<Truck>,
    @InjectRepository(TruckType)
    private readonly truckTypes: Repository<TruckType>,
  ) {}

  async getTrucks(): Promise<TruckResponse[]> {
    const trucks = await this.trucks.find();
    return trucks.map(this.mapToTruckResponseDto);
  }

  async createTruck(truck: CreateTruck): Promise<TruckResponse> {
    const { type, ...truckDetails } = truck;
    const truckType = await this.truckTypes.findOne({
      where: { type },
    });
    if (!truckType) {
      throw new Error(`Truck type #${type} does not exist`);
    }

    const createdTruck = this.trucks.create({
      ...truckDetails,
      type: truckType,
    });
    const savedTruck = await this.trucks.save(createdTruck);
    return this.mapToTruckResponseDto(savedTruck);
  }

  private mapToTruckResponseDto(truck: Truck): TruckResponse {
    const responseDto = new TruckResponseDto();
    responseDto.plate = truck.plate;
    responseDto.acquisition = truck.acquisition;
    responseDto.type = this.mapToTruckTypeResponseDto(truck.type);
    return responseDto;
  }

  private mapToTruckTypeResponseDto(truckType: TruckType): TruckTypeResponse {
    const responseDto = new TruckTypeResponseDto();
    responseDto.type = truckType.type;
    responseDto.capacity = truckType.capacity;
    return responseDto;
  }
}
