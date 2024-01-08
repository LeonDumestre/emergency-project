import { Injectable } from "@nestjs/common";
import { Fire } from "./fire.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFire } from "./dto/create-fire.request.dto";
import { FireResponse } from "./dto/fire.response.dto";

@Injectable()
export class FireService {
  constructor(
    @InjectRepository(Fire)
    private readonly fires: Repository<Fire>,
  ) {}

  getFires(): Promise<FireResponse[]> {
    return this.fires.find();
  }

  createFire(fire: CreateFire): Promise<FireResponse> {
    const createdFire = this.fires.create(fire);
    return this.fires.save(createdFire);
  }
}
