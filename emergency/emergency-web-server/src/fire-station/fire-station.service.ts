import { Injectable } from "@nestjs/common";
import { FireStation } from "./fire-station.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFireStation } from "./dto/create-fire-station.request.dto";
import {
  BaseFireStationResponse,
  BaseFireStationResponseDto,
  FireStationResponse,
  FireStationResponseDto,
} from "./dto/fire-station.response.dto";
import { Truck } from "src/truck/truck.entity";
import { BaseTruckResponseDto } from "src/truck/dto/truck.response.dto";
import { BaseFirefighterResponseDto } from "src/firefighter/dto/firefighter.response.dto";
import { Firefighter } from "src/firefighter/firefighter.entity";

@Injectable()
export class FireStationService {
  constructor(
    @InjectRepository(FireStation)
    private readonly fireStations: Repository<FireStation>,
  ) {}

  async getFireStations(): Promise<FireStationResponse[]> {
    const stations = await this.fireStations
      .createQueryBuilder("fireStation")
      .leftJoinAndSelect("fireStation.firefighters", "firefighters")
      .leftJoinAndSelect("fireStation.trucks", "trucks")
      .leftJoinAndSelect("trucks.type", "type")
      .getMany();
    return stations.map(this.mapToFireStationResponseDto);
  }

  async createFireStation(
    fireStation: CreateFireStation,
  ): Promise<BaseFireStationResponse> {
    const createdStation = this.fireStations.create(fireStation);
    const savedStation = await this.fireStations.save(createdStation);
    return this.mapToBaseFireStationResponseDto(savedStation);
  }

  private mapToBaseFireStationResponseDto(
    fireStation: FireStation,
  ): BaseFireStationResponseDto {
    const responseDto = new BaseFireStationResponseDto();
    responseDto.id = fireStation.id;
    responseDto.name = fireStation.name;
    responseDto.latitude = fireStation.latitude;
    responseDto.longitude = fireStation.longitude;
    return responseDto;
  }

  private mapToFireStationResponseDto(
    fireStation: FireStation,
  ): FireStationResponseDto {
    const responseDto = new FireStationResponseDto();
    responseDto.id = fireStation.id;
    responseDto.name = fireStation.name;
    responseDto.latitude = fireStation.latitude;
    responseDto.longitude = fireStation.longitude;
    responseDto.firefighters = fireStation.firefighters.map(
      this.mapToFirefighterResponseDto,
    );
    responseDto.trucks = fireStation.trucks.map(this.mapToTruckResponseDto);
    return responseDto;
  }

  private mapToFirefighterResponseDto(
    firefighter: Firefighter,
  ): BaseFirefighterResponseDto {
    const responseDto = new BaseFirefighterResponseDto();
    responseDto.id = firefighter.id;
    responseDto.name = firefighter.name;
    responseDto.birthDate = firefighter.birthDate;
    responseDto.grade = firefighter.grade;
    return responseDto;
  }

  private mapToTruckResponseDto(truck: Truck): BaseTruckResponseDto {
    const responseDto = new BaseTruckResponseDto();
    responseDto.plate = truck.plate;
    responseDto.acquisition = truck.acquisition;
    responseDto.type = truck.type.name;
    responseDto.capacity = truck.type.capacity;
    return responseDto;
  }
}
