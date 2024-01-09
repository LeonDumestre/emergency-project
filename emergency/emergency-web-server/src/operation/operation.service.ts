import { Injectable, NotFoundException } from "@nestjs/common";
import {
  ON_RETURN,
  ON_ROAD,
  ON_SITE,
  Operation,
  OperationInput,
} from "./operation.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOperation } from "./dto/create-operation.request.dto";
import { OperationResponse } from "./dto/operation.response.dto";
import { AskReinforcement } from "./dto/ask-reinforcement.request.dto";
import { FireService } from "src/fire/fire.service";
import { FirefighterService } from "src/firefighter/firefighter.service";
import { TruckService } from "src/truck/truck.service";

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Operation)
    private readonly operations: Repository<Operation>,
    private readonly fireService: FireService,
    private readonly firefighterService: FirefighterService,
    private readonly truckService: TruckService,
  ) {}

  getOperations(): Promise<OperationResponse[]> {
    return this.operations.find();
  }

  async getRawOperation(id: number): Promise<Operation> {
    const operation = await this.operations.findOne({ where: { id } });
    if (!operation) {
      throw new NotFoundException(`Operation #${id} does not exist`);
    }
    return operation;
  }

  async createOperation(
    operation: CreateOperation,
  ): Promise<OperationResponse> {
    const fire = await this.fireService.getRawFire(operation.fire);

    const firefighters = await Promise.all(
      operation.firefighters.map(
        async (id) => await this.firefighterService.getRawFirefighter(id),
      ),
    );

    const trucks = await Promise.all(
      operation.trucks.map(
        async (plate) => await this.truckService.getRawTruck(plate),
      ),
    );

    const newOperationInput: OperationInput = {
      start: new Date(),
      fire,
      firefighters,
      trucks,
      status: ON_ROAD,
    };
    const newOperation = this.operations.create(newOperationInput);
    return this.operations.save(newOperation);
  }

  async onSite(id: number): Promise<OperationResponse> {
    const operation = await this.getRawOperation(id);
    operation.status = ON_SITE;
    return this.operations.save(operation);
  }

  askReinforcements(
    id: number,
    reinforcements: AskReinforcement[],
  ): Promise<OperationResponse> {
    throw new Error("Method not implemented.");
  }

  async onReturn(id: number): Promise<OperationResponse> {
    const operation = await this.getRawOperation(id);
    operation.status = ON_RETURN;
    return this.operations.save(operation);
  }

  remove(id: number) {
    this.operations.delete(id);
  }
}
