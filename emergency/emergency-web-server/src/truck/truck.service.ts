import { Injectable } from "@nestjs/common";
import { Truck } from "./truck.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TruckResponse, TruckResponseDto } from "./dto/truck.response.dto";
import { CreateTruck } from "./dto/create-truck.request.dto";
import { TruckType } from "./truck-type.entity";
import { FireStation } from "src/fire-station/fire-station.entity";

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
      .getMany();
    return trucks.map(this.mapToTruckResponseDto);
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
    return this.mapToTruckResponseDto(savedTruck);
  }

  private mapToTruckResponseDto(truck: Truck): TruckResponse {
    const responseDto = new TruckResponseDto();
    responseDto.plate = truck.plate;
    responseDto.acquisition = truck.acquisition;
    responseDto.type = truck.type.name;
    responseDto.capacity = truck.type.capacity;
    return responseDto;
  }

  private async getTruckTypeIfExists(type: string): Promise<TruckType> {
    const truckType = await this.truckTypes.findOne({
      where: { name: type },
    });
    if (!truckType) {
      throw new Error(`Truck type #${type} does not exist`);
    }
    return truckType;
  }

  private async getFireStationIfExists(id: number): Promise<FireStation> {
    const fireStation = await this.fireStations.findOne({
      where: { id },
    });
    if (!fireStation) {
      throw new Error(`Fire station #${id} does not exist`);
    }
    return fireStation;
  }
}
