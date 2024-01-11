import { Injectable, NotFoundException } from "@nestjs/common";
import {
  RETURNING,
  ON_ROAD,
  ON_SITE,
  Operation,
  OperationInput,
} from "./operation.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOperation } from "./dto/create-operation.request.dto";
import {
  OperationResponse,
  OperationResponseDto,
} from "./dto/operation.response.dto";
import { FirefighterService } from "src/firefighter/firefighter.service";
import { TruckService } from "src/truck/truck.service";
import { Fire } from "src/fire/fire.entity";

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Operation)
    private readonly operations: Repository<Operation>,
    @InjectRepository(Fire)
    private readonly fires: Repository<Fire>,
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
    const fire = await this.fires.findOneOrFail({
      where: { id: operation.fire },
    });

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

  async onReturn(id: number): Promise<OperationResponse> {
    const operation = await this.getRawOperation(id);
    operation.status = RETURNING;
    return this.operations.save(operation);
  }

  remove(id: number) {
    this.operations.delete(id);
  }

  mapToOperationResponseDto(operation: Operation): OperationResponse {
    const responseDto = new OperationResponseDto();
    responseDto.id = operation.id;
    responseDto.start = operation.start;
    responseDto.status = operation.status;
    return responseDto;
  }
}
