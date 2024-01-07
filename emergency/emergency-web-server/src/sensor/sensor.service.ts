import { Injectable } from "@nestjs/common";
import { Sensor } from "./sensor.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSensor } from "./dto/create-sensor.request.dto";

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensors: Repository<Sensor>,
  ) {}

  getSensors(): Promise<Sensor[]> {
    return this.sensors.find();
  }

  createSensor(sensor: CreateSensor): Promise<Sensor> {
    const createdSensor = this.sensors.create(sensor);
    return this.sensors.save(createdSensor);
  }
}
