import { Injectable } from "@nestjs/common";
import { CreateFireRequest } from "./dto/create-fire.request.dto";
import { Fire } from "./fire.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FireService {
  constructor(
    @InjectRepository(Fire)
    private readonly fireRepository: Repository<Fire>,
  ) {}

  async getFires(): Promise<Fire[]> {
    return this.fireRepository.find();
  }

  async startFire(fire: CreateFireRequest): Promise<Fire> {
    const newFire = this.fireRepository.create(fire);
    return this.fireRepository.save(newFire);
  }

  async updateFire(fire: Fire): Promise<Fire> {
    const condition = { where: { id: fire.id } };
    const existingFire = await this.fireRepository.findOne(condition);
    if (!existingFire) throw new Error(`Fire #${fire.id} does not exist`);

    const fireToUpdate = { ...existingFire, ...fire };
    return this.fireRepository.save(fireToUpdate);
  }

  async deleteFire(id: number): Promise<void> {
    const condition = { where: { id } };
    const existingFire = await this.fireRepository.findOne(condition);
    if (!existingFire) throw new Error(`Fire #${id} does not exist`);

    await this.fireRepository.remove(existingFire);
  }
}
