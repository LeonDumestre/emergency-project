import { Injectable } from "@nestjs/common";
import { Firefighter } from "./firefighter.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FirefighterService {
  constructor(
    @InjectRepository(Firefighter)
    private readonly firefighters: Repository<Firefighter>,
  ) {}

  async getFirefighters(): Promise<Firefighter[]> {
    return this.firefighters.find();
  }

  async createFirefighter(firefighter: Firefighter): Promise<Firefighter> {
    const fireStationId = firefighter.fireStationId;
    const fireStation = await this.firefighters.findOne({
      where: { id: fireStationId },
    });
    if (!fireStation) {
      throw new Error(`Fire station #${fireStationId} does not exist`);
    }

    const createdFirefighter = this.firefighters.create(firefighter);
    return this.firefighters.save(createdFirefighter);
  }
}
