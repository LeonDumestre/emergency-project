import { Injectable } from "@nestjs/common";
import { Truck } from "./truck.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  BaseTruckResponseDto,
  TruckResponse,
  TruckResponseDto,
} from "./dto/truck.response.dto";
import { CreateTruck } from "./dto/create-truck.request.dto";
import { TruckType } from "./truck-type.entity";
import { FireStation } from "src/fire-station/fire-station.entity";
import { mapToFireStationResponseDto } from "src/fire-station/fire-station.service";

@Injectable()
export class TruckService {
  constructor(
    @InjectRepository(Truck)
    private readonly trucks: Repository<Truck>,
    @InjectRepository(TruckType)
    private readonly truckTypes: Repository<TruckType>,
    @InjectRepository(FireStation)
    private readonly fireStations: Repository<FireStation>,
  ) {}

  async getTrucks(): Promise<TruckResponse[]> {
    const trucks = await this.trucks
      .createQueryBuilder("truck")
      .leftJoinAndSelect("truck.type", "type")
      .leftJoinAndSelect("truck.fireStation", "fireStation")
      .getMany();

    return trucks.map((truck) => mapToTruckResponseDto(truck));
  }

  async createTruck(truck: CreateTruck): Promise<TruckResponse> {
    const { type, fireStationId, ...truckDetails } = truck;
    const truckType = await this.getTruckTypeIfExists(type);
    const fireStation = await this.getFireStationIfExists(fireStationId);

    const createdTruck = this.trucks.create({
      ...truckDetails,
      type: truckType,
      fireStation,
    });

    const savedTruck = await this.trucks.save(createdTruck);
    return mapToTruckResponseDto(savedTruck);
  }

  private async getTruckTypeIfExists(type: string): Promise<TruckType> {
    const truckType = await this.truckTypes.findOneOrFail({
      where: { name: type },
    });
    return truckType;
  }

  private async getFireStationIfExists(id: number): Promise<FireStation> {
    const fireStation = await this.fireStations.findOneOrFail({
      where: { id },
    });
    return fireStation;
  }
}

export function mapToBaseTruckResponseDto(truck: Truck): BaseTruckResponseDto {
  const responseDto = new TruckResponseDto();
  responseDto.plate = truck.plate;
  responseDto.acquisition = truck.acquisition;
  responseDto.type = truck.type.name;
  responseDto.capacity = truck.type.capacity;
  return responseDto;
}

export function mapToTruckResponseDto(truck: Truck): TruckResponseDto {
  const responseDto = new TruckResponseDto();
  responseDto.plate = truck.plate;
  responseDto.acquisition = truck.acquisition;
  responseDto.type = truck.type.name;
  responseDto.capacity = truck.type.capacity;
  responseDto.fireStation = mapToFireStationResponseDto(truck.fireStation);
  return responseDto;
}
