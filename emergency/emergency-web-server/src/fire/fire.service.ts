import { Injectable } from "@nestjs/common";
import { Fire } from "./fire.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFire } from "./dto/create-fire.request.dto";
import { FireResponse, FireResponseDto } from "./dto/fire.response.dto";
import { OperationResponse } from "src/operation/dto/operation.response.dto";
import { mapToOperationResponseDto } from "src/operation/operation.service";

@Injectable()
export class FireService {
  constructor(
    @InjectRepository(Fire)
    private readonly fires: Repository<Fire>,
  ) {}

  async getFires(): Promise<FireResponse[]> {
    const fire = await this.fires.find();
    return fire.map((fire) => mapToFireResponseDto(fire));
  }

  async getFire(id: number): Promise<FireResponse> {
    const existingFire = await this.fires.findOne({ where: { id } });
    if (!existingFire) throw new Error(`Fire #${id} does not exist`);
    return existingFire;
  }

  async getOperationByFire(id: number): Promise<OperationResponse> {
    const fire = await this.fires.findOneOrFail({
      where: { id },
      relations: ["operation"],
    });
    return mapToOperationResponseDto(fire.operation);
  }

  async createFire(fire: CreateFire): Promise<FireResponse> {
    const createdFire = this.fires.create(fire);
    const savedFire = await this.fires.save(createdFire);
    return mapToFireResponseDto(savedFire);
  }

  async updateIntensity(id: number, intensity: number): Promise<FireResponse> {
    const existingFire = await this.getFire(id);
    existingFire.intensity = intensity;
    const savedFire = await this.fires.save(existingFire);
    return mapToFireResponseDto(savedFire);
  }

  async deleteFire(id: number): Promise<void> {
    await this.fires.delete(id);
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
