import { Injectable } from "@nestjs/common";
import { Fire } from "./fire.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFire } from "./dto/create-fire.request.dto";

@Injectable()
export class FireService {
  constructor(
    @InjectRepository(Fire)
    private readonly fires: Repository<Fire>,
  ) {}

  async getFires(): Promise<Fire[]> {
    return this.fires.find();
  }

  async getFire(id: Fire["id"]): Promise<Fire> {
    const existingFire = await this.fires.findOne({ where: { id } });
    if (!existingFire) throw new Error(`Fire #${id} does not exist`);
    return existingFire;
  }

  async startFire(fire: CreateFire): Promise<Fire> {
    const newFire = this.fires.create(fire);

    return this.fires.save(newFire);
  }

  async updateIntensity(id: number, intensity: number): Promise<Fire> {
    const existingFire = await this.getFire(id);

    existingFire.intensity = intensity;
    return this.fires.save(existingFire);
  }

  async deleteFire(id: number): Promise<void> {
    await this.fires.delete(id);
  }

  async deleteAllFires(): Promise<void> {
    await this.fires.clear();
  }
}
