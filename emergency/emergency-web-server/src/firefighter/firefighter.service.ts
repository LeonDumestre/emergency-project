import { Injectable } from "@nestjs/common";
import { Firefighter } from "./firefighter.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFirefighter } from "./dto/create-firefigther.request.dto";
import {
  BaseFirefighterResponseDto,
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
    const firefighters = await this.firefighters
      .createQueryBuilder("firefighter")
      .leftJoinAndSelect("firefighter.fireStation", "fireStation")
      .getMany();

    return firefighters.map((firefighter) =>
      mapToFirefighterResponseDto(firefighter),
    );
  }

  async createFirefighter(
    firefighter: CreateFirefighter,
  ): Promise<FirefighterResponse> {
    const { fireStationId, ...firefighterDetails } = firefighter;
    const fireStation = await this.fireStations.findOneOrFail({
      where: { id: fireStationId },
    });

    const createdFirefighter = this.firefighters.create({
      ...firefighterDetails,
      fireStation,
    });
    const savedFirefigter = await this.firefighters.save(createdFirefighter);
    return mapToFirefighterResponseDto(savedFirefigter);
  }
}

export function mapToFirefighterResponseDto(
  firefighter: Firefighter,
): FirefighterResponseDto {
  const responseDto = new FirefighterResponseDto();
  responseDto.id = firefighter.id;
  responseDto.name = firefighter.name;
  responseDto.birthDate = firefighter.birthDate;
  responseDto.grade = firefighter.grade;
  responseDto.fireStationId = firefighter.fireStation.id;
  return responseDto;
}

export function mapToBaseFirefighterResponseDto(
  firefighter: Firefighter,
): BaseFirefighterResponseDto {
  const responseDto = new BaseFirefighterResponseDto();
  responseDto.id = firefighter.id;
  responseDto.name = firefighter.name;
  responseDto.birthDate = firefighter.birthDate;
  responseDto.grade = firefighter.grade;
  return responseDto;
}
