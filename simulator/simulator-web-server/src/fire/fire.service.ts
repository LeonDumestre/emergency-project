import { Injectable } from "@nestjs/common";
import { Fire } from "./fire.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFire } from "./dto/create-fire.request.dto";
import { UpdateFire } from "./dto/update-fire.request.dto";

@Injectable()
export class FireService {
  constructor(
    @InjectRepository(Fire)
    private readonly fires: Repository<Fire>,
  ) {}

  async getFires(): Promise<Fire[]> {
    return this.fires.find();
  }

  async getFire(id: Fire["id"]): Promise<Fire[]> {
    return this.fires.find({ where: { id } });
  }

  async startFire(fire: CreateFire): Promise<Fire> {
    const newFire = this.fires.create(fire);
    return this.fires.save(newFire);
  }

  async updateFire(fire: UpdateFire): Promise<Fire> {
    const condition = { where: { id: fire.id } };
    const existingFire = await this.fires.findOne(condition);
    if (!existingFire) throw new Error(`Fire #${fire.id} does not exist`);

    const fireToUpdate = { ...existingFire, ...fire };
    return this.fires.save(fireToUpdate);
  }

  async deleteFire(id: number): Promise<void> {
    const condition = { where: { id } };
    const existingFire = await this.fires.findOne(condition);
    if (!existingFire) throw new Error(`Fire #${id} does not exist`);

    await this.fires.remove(existingFire);
  }
}
