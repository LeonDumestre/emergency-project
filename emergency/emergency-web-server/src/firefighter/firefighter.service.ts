import { Injectable } from "@nestjs/common";
import { Firefighter } from "./firefighter.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFirefighter } from "./dto/create-firefigther.request.dto";
import {
  FirefighterResponse,
  FirefighterResponseDto,
} from "./dto/firefighter.response.dto";
import { FireStation } from "src/fire-station/fire-station.entity";

@Injectable()
export class FirefighterService {
  constructor(
    @InjectRepository(Firefighter)
    private readonly firefighters: Repository<Firefighter>,
    @InjectRepository(FireStation)
    private readonly fireStations: Repository<FireStation>,
  ) {}

  async getFirefighters(): Promise<FirefighterResponse[]> {
    const firefighters = await this.firefighters.find();
    return firefighters.map(this.mapToFirefighterResponseDto);
  }

  async createFirefighter(
    firefighter: CreateFirefighter,
  ): Promise<FirefighterResponse> {
    const { fireStationId, ...firefighterDetails } = firefighter;
    const fireStation = await this.fireStations.findOne({
      where: { id: fireStationId },
    });
    if (!fireStation) {
      throw new Error(`Fire station #${fireStationId} does not exist`);
    }

    const createdFirefighter = this.firefighters.create({
      ...firefighterDetails,
      fireStation,
    });
    const savedFirefigter = await this.firefighters.save(createdFirefighter);
    return this.mapToFirefighterResponseDto(savedFirefigter);
  }

  private mapToFirefighterResponseDto(
    firefighter: Firefighter,
  ): FirefighterResponse {
    const responseDto = new FirefighterResponseDto();
    responseDto.id = firefighter.id;
    responseDto.name = firefighter.name;
    responseDto.birthDate = firefighter.birthDate;
    responseDto.grade = firefighter.grade;
    return responseDto;
  }
}
