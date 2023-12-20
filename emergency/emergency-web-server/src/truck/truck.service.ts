import { Injectable } from "@nestjs/common";
import { Truck } from "./truck.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TruckService {
  constructor(
    @InjectRepository(Truck)
    private readonly trucks: Repository<Truck>,
  ) {}

  getTrucks(): Promise<Truck[]> {
    return this.trucks.find();
  }

  createTruck(truck: Truck): Promise<Truck> {
    const createdTruck = this.trucks.create(truck);
    return this.trucks.save(createdTruck);
  }
}
