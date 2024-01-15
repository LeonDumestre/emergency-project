import { Injectable } from "@nestjs/common";
import {
  RETURNING,
  ON_ROAD,
  ON_SITE,
  Operation,
  OperationInput,
  FINISHED,
} from "./operation.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOperation } from "./dto/create-operation.request.dto";
import {
  OperationResponse,
  OperationResponseDto,
} from "./dto/operation.response.dto";
import { Fire } from "src/fire/fire.entity";
import { Firefighter } from "src/firefighter/firefighter.entity";
import { Truck } from "src/truck/truck.entity";
import {
  CompleteOperationResponse,
  CompleteOperationResponseDto,
} from "./dto/complete-operation.response.dto";
import { mapToTruckResponseDto } from "src/truck/truck.service";
import { mapToFirefighterResponseDto } from "src/firefighter/firefighter.service";

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Operation)
    private readonly operations: Repository<Operation>,
    @InjectRepository(Fire)
    private readonly fires: Repository<Fire>,
    @InjectRepository(Firefighter)
    private readonly firefighters: Repository<Firefighter>,
    @InjectRepository(Truck)
    private readonly trucks: Repository<Truck>,
  ) {}

  async getOperations(): Promise<CompleteOperationResponse[]> {
    const operations = await this.operations
      .createQueryBuilder("operation")
      .leftJoinAndSelect("operation.fire", "fire")
      .leftJoinAndSelect("operation.firefighters", "firefighters")
      .leftJoinAndSelect("operation.trucks", "trucks")
      .leftJoinAndSelect("trucks.type", "type")
      .leftJoinAndSelect("trucks.fireStation", "fireStation")
      .leftJoinAndSelect("firefighters.fireStation", "fireStation")
      .getMany();

    return operations.map((operation) =>
      mapToCompleteOperationResponseDto(operation),
    );
  }

  async createOperation(
    operation: CreateOperation,
  ): Promise<CompleteOperationResponse> {
    const fire = await this.fires.findOneOrFail({
      where: { id: operation.fire },
    });

    const firefighters = await Promise.all(
      operation.firefighters.map(
        async (id) => await this.firefighters.findOneOrFail({ where: { id } }),
      ),
    );

    const trucks = await Promise.all(
      operation.trucks.map(
        async (plate) => await this.trucks.findOneOrFail({ where: { plate } }),
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
    const savedOperation = await this.operations.save(newOperation);
    const foundOperation = await this.operations
      .createQueryBuilder("operation")
      .leftJoinAndSelect("operation.fire", "fire")
      .leftJoinAndSelect("operation.firefighters", "firefighters")
      .leftJoinAndSelect("operation.trucks", "trucks")
      .leftJoinAndSelect("trucks.type", "type")
      .leftJoinAndSelect("trucks.fireStation", "fireStation")
      .where("operation.id = :id", { id: savedOperation.id })
      .getOne();

    return mapToCompleteOperationResponseDto(foundOperation);
  }

  async onSite(id: number): Promise<OperationResponse> {
    const operation = await this.operations.findOneOrFail({ where: { id } });
    operation.status = ON_SITE;
    return this.operations.save(operation);
  }

  async returning(id: number): Promise<OperationResponse> {
    const operation = await this.operations.findOneOrFail({ where: { id } });
    operation.status = RETURNING;
    return this.operations.save(operation);
  }

  async finished(id: number): Promise<OperationResponse> {
    const operation = await this.operations.findOneOrFail({ where: { id } });
    operation.status = FINISHED;
    return this.operations.save(operation);
  }

  remove(id: number) {
    this.operations.delete(id);
  }
}

export function mapToOperationResponseDto(
  operation: Operation,
): OperationResponseDto {
  const responseDto = new OperationResponseDto();
  responseDto.id = operation.id;
  responseDto.start = operation.start;
  responseDto.status = operation.status;
  return responseDto;
}

function mapToCompleteOperationResponseDto(
  operation: Operation,
): CompleteOperationResponse {
  const responseDto = new CompleteOperationResponseDto();
  responseDto.id = operation.id;
  responseDto.start = operation.start;
  responseDto.status = operation.status;
  responseDto.fire = operation.fire;
  responseDto.firefighters = operation.firefighters.map((firefighter) =>
    mapToFirefighterResponseDto(firefighter),
  );
  responseDto.trucks = operation.trucks.map((truck) =>
    mapToTruckResponseDto(truck),
  );
  return responseDto;
}
