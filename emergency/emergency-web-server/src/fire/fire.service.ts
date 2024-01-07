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

  getFires(): Promise<Fire[]> {
    return this.fires.find();
  }

  createFire(fire: CreateFire): Promise<Fire> {
    const createdFire = this.fires.create(fire);
    return this.fires.save(createdFire);
  }
}
