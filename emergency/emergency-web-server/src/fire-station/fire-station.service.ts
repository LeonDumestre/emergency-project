import { Injectable } from "@nestjs/common";
import { FireStation } from "./fire-station.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFireStation } from "./dto/create-fire-station.request.dto";
import {
  FireStationResponse,
  FireStationResponseDto,
} from "./dto/fire-station.response.dto";

@Injectable()
export class FireStationService {
  constructor(
    @InjectRepository(FireStation)
    private readonly fireStations: Repository<FireStation>,
  ) {}

  async getFireStations(): Promise<FireStationResponse[]> {
    const fireStations = await this.fireStations
      .createQueryBuilder("fireStation")
      .leftJoinAndSelect("fireStation.firefighters", "firefighters")
      .leftJoinAndSelect("fireStation.trucks", "trucks")
      .leftJoinAndSelect("trucks.type", "type")
      .getMany();

    return fireStations.map((fireStation) =>
      mapToFireStationResponseDto(fireStation),
    );
  }

  async createFireStation(
    fireStation: CreateFireStation,
  ): Promise<FireStationResponse> {
    const createdStation = this.fireStations.create(fireStation);
    const savedStation = await this.fireStations.save(createdStation);
    return mapToFireStationResponseDto(savedStation);
  }
}

function mapToFireStationResponseDto(
  fireStation: FireStation,
): FireStationResponseDto {
  const responseDto = new FireStationResponseDto();
  responseDto.id = fireStation.id;
  responseDto.name = fireStation.name;
  responseDto.latitude = fireStation.latitude;
  responseDto.longitude = fireStation.longitude;
  return responseDto;
}
