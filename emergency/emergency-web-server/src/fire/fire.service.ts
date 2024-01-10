import { Injectable, NotFoundException } from "@nestjs/common";
import { Fire } from "./fire.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFire } from "./dto/create-fire.request.dto";
import { FireResponse, FireResponseDto } from "./dto/fire.response.dto";
import { OperationResponse } from "src/operation/dto/operation.response.dto";
import { OperationService } from "src/operation/operation.service";

@Injectable()
export class FireService {
  constructor(
    @InjectRepository(Fire)
    private readonly fires: Repository<Fire>,
    private readonly operationService: OperationService,
  ) {}

  async getFires(): Promise<FireResponse[]> {
    const fire = await this.fires.find();
    return fire.map(this.mapToFireResponseDto);
  }

  async getOperation(id: number): Promise<OperationResponse> {
    const fire = await this.fires.findOneOrFail({
      where: { id },
      relations: ["operation"],
    });
    return this.operationService.mapToOperationResponseDto(fire.operation);
  }

  async getRawFire(id: number): Promise<Fire> {
    const fire = await this.fires.findOne({ where: { id } });
    if (!fire) throw new NotFoundException(`Fire #${id} not found`);
    return fire;
  }

  createFire(fire: CreateFire): Promise<FireResponse> {
    const createdFire = this.fires.create(fire);
    return this.fires.save(createdFire);
  }

  private mapToFireResponseDto(fire: Fire): FireResponse {
    const responseDto = new FireResponseDto();
    responseDto.id = fire.id;
    responseDto.latitude = fire.latitude;
    responseDto.longitude = fire.longitude;
    return responseDto;
  }
}
