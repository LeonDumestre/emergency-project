import { Injectable } from "@nestjs/common";
import { Operation } from "./operation.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOperation } from "./dto/create-operation.request.dto";

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Operation)
    private readonly operations: Repository<Operation>,
  ) {}

  getOperations(): Promise<Operation[]> {
    return this.operations.find();
  }

  createOperation(operation: CreateOperation): Promise<Operation> {
    throw new Error("Method not implemented.");
    const createdFirefighter = this.operations.create(operation);
    return this.operations.save(createdFirefighter);
  }
}
