import { Injectable } from "@nestjs/common";
import { FireStation } from "./fire-station.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FireStationService {
  constructor(
    @InjectRepository(FireStation)
    private readonly fireStations: Repository<FireStation>,
  ) {}

  async getFireStations(): Promise<FireStation[]> {
    return this.fireStations.find();
  }

  async createFireStation(fireStation: FireStation): Promise<FireStation> {
    const createdStation = this.fireStations.create(fireStation);
    return this.fireStations.save(createdStation);
  }
}
