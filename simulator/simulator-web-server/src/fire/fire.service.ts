import { Injectable } from "@nestjs/common";
import { Observable, merge } from "rxjs";
import { Fire } from "./fire.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFire } from "./dto/create-fire.request.dto";
import {
  CREATED,
  DELETED,
  EventService,
  FireEvent,
  UPDATED,
} from "src/event/event.service";

@Injectable()
export class FireService {
  constructor(
    @InjectRepository(Fire)
    private readonly fires: Repository<Fire>,
    private readonly eventService: EventService,
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
    this.eventService.publish({ type: CREATED, data: newFire });

    return this.fires.save(newFire);
  }

  async updateIntensity(id: number, intensity: number): Promise<Fire> {
    const existingFire = await this.getFire(id);
    this.eventService.publish({ type: UPDATED, data: { id, intensity } });

    existingFire.intensity = intensity;
    return this.fires.save(existingFire);
  }

  async deleteFire(id: number): Promise<void> {
    this.eventService.publish({ type: DELETED, data: { id } });
    await this.fires.delete(id);
  }

  async deleteAllFires(): Promise<void> {
    await this.fires.clear();
  }

  inLive(): Observable<FireEvent> {
    const fires = this.eventService.inLive();
    return merge(...[fires]);
  }
}
