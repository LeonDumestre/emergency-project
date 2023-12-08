import { Injectable } from "@nestjs/common";
import { FireStation } from "./fire-station.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FireStationResponse } from "./dto/fire-station.response.dto";

@Injectable()
export class FireStationService {
  constructor(
    @InjectRepository(FireStation)
    private readonly fireStationRepository: Repository<FireStation>,
  ) {}

  async getFireStations(): Promise<FireStationResponse[]> {
    return this.fireStationRepository.find();
  }
}
