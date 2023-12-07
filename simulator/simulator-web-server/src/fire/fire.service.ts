import { Injectable } from "@nestjs/common";
import { CreateFire } from "./dto/create-fire.dto";
import { Fire } from "./fire.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FireService {
  constructor(
    @InjectRepository(Fire)
    private readonly fireRepository: Repository<Fire>,
  ) {}

  getFires(): Promise<Fire[]> {
    return this.fireRepository.find();
  }

  startFire(fire: CreateFire) {
    this.fireRepository.create(fire);
  }

  updateFire() {
    console.log("update fire");
  }

  deleteFire() {
    console.log("delete fire");
  }
}
