import { Injectable } from "@nestjs/common";
import { Captor } from "./captor.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CaptorService {
  constructor(
    @InjectRepository(Captor)
    private readonly captors: Repository<Captor>,
  ) {}

  async getCaptors(): Promise<Captor[]> {
    return this.captors.find();
  }

  async upsertCaptor(captor: Captor): Promise<Captor> {
    const newCaptor = this.captors.create(captor);
    return this.captors.save(newCaptor);
  }
}
