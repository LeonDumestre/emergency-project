import { Injectable } from "@nestjs/common";
import { Operation } from "./operation.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOperation } from "./dto/create-operation.request.dto";
import { Fire } from "src/fire/fire.entity";
import { Firefighter } from "src/firefighter/firefighter.entity";
import { Sensor } from "src/sensor/sensor.entity";
import { Truck } from "src/truck/truck.entity";
import { OperationResponse } from "./dto/operation.response.dto";
import { AskReinforcement } from "./dto/ask-reinforcement.request.dto";
import { SpecifyFire } from "./dto/specify-fire.request.dto";

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Operation)
    private readonly operations: Repository<Operation>,
    @InjectRepository(Fire)
    private readonly fires: Repository<Fire>,
    @InjectRepository(Firefighter)
    private readonly firefighters: Repository<Firefighter>,
    @InjectRepository(Sensor)
    private readonly sensors: Repository<Sensor>,
    @InjectRepository(Truck)
    private readonly trucks: Repository<Truck>,
  ) {}

  getOperations(): Promise<OperationResponse[]> {
    return this.operations.find();
  }

  async createOperation(
    operation: CreateOperation,
  ): Promise<OperationResponse> {
    await this.checkFire(operation.fire);

    operation.firefighters.map(async (firefighterId) => {
      await this.checkFirefighter(firefighterId);
    });

    operation.sensors.map(async (sensorId) => {
      await this.checkSensor(sensorId);
    });

    operation.trucks.map(async (truckPlate) => {
      await this.checkTruck(truckPlate);
    });

    throw new Error("Method not implemented.");
    //const createdFirefighter = this.operations.create(operation);
    //return this.operations.save(createdFirefighter);
  }

  start(id: number): Promise<OperationResponse> {
    throw new Error("Method not implemented.");
  }

  askReinforcements(
    id: number,
    reinforcements: AskReinforcement[],
  ): Promise<OperationResponse> {
    throw new Error("Method not implemented.");
  }

  specifyFires(id: number, fires: SpecifyFire[]): Promise<OperationResponse> {
    throw new Error("Method not implemented.");
  }

  end(id: number): Promise<OperationResponse> {
    throw new Error("Method not implemented.");
  }

  cameBack(id: number): Promise<OperationResponse> {
    throw new Error("Method not implemented.");
  }

  private async checkFire(id: number) {
    const fire = await this.fires.findOne({ where: { id } });
    if (!fire) throw new Error(`Fire #${id} does not exist`);
  }

  private async checkFirefighter(id: number) {
    const firefigther = await this.firefighters.findOne({ where: { id } });
    if (!firefigther) throw new Error(`Firefighter #${id} does not exist`);
  }

  private async checkSensor(id: number) {
    const sensor = await this.sensors.findOne({
      where: { id },
    });
    if (!sensor) throw new Error(`Sensor #${id} does not exist`);
  }

  private async checkTruck(plate: string) {
    const truck = await this.trucks.findOne({ where: { plate } });
    if (!truck) throw new Error(`Truck #${plate} does not exist`);
  }
}
