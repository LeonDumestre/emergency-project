import { Injectable } from "@nestjs/common";
import { Fire } from "./fire.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFire } from "./dto/create-fire.request.dto";
import { FireResponse, FireResponseDto } from "./dto/fire.response.dto";
import { OperationResponse } from "src/operation/dto/operation.response.dto";
import {
  OperationService,
  mapToOperationResponseDto,
} from "src/operation/operation.service";

@Injectable()
export class FireService {
  constructor(
    @InjectRepository(Fire)
    private readonly fires: Repository<Fire>,
    private readonly operationService: OperationService,
  ) {}

  async getFires(): Promise<FireResponse[]> {
    const fire = await this.fires.find();
    return fire.map((fire) => mapToFireResponseDto(fire));
  }

  async getOperationByFire(id: number): Promise<OperationResponse> {
    const fire = await this.fires.findOneOrFail({
      where: { id },
      relations: ["operation"],
    });
    return mapToOperationResponseDto(fire.operation);
  }

  createFire(fire: CreateFire): Promise<FireResponse> {
    const createdFire = this.fires.create(fire);
    return this.fires.save(createdFire);
  }
}

function mapToFireResponseDto(fire: Fire): FireResponseDto {
  const responseDto = new FireResponseDto();
  responseDto.id = fire.id;
  responseDto.latitude = fire.latitude;
  responseDto.longitude = fire.longitude;
  responseDto.intensity = fire.intensity;
  return responseDto;
}
