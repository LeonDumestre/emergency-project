import { Injectable } from "@nestjs/common";
import { FireStation } from "./fire-station.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFireStation } from "./dto/create-fire-station.request.dto";

@Injectable()
export class FireStationService {
  constructor(
    @InjectRepository(FireStation)
    private readonly fireStationRepository: Repository<FireStation>,
  ) {}

  async getFireStations(): Promise<FireStation[]> {
    return this.fireStationRepository.find();
  }

  async createFireStation(
    fireStation: CreateFireStation,
  ): Promise<FireStation> {
    const createdStation = this.fireStationRepository.create(fireStation);
    return this.fireStationRepository.save(createdStation);
  }
}
