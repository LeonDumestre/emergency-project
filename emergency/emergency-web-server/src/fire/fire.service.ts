import { Injectable, NotFoundException } from "@nestjs/common";
import { Fire } from "./fire.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFire } from "./dto/create-fire.request.dto";
import { FireResponse, FireResponseDto } from "./dto/fire.response.dto";

@Injectable()
export class FireService {
  constructor(
    @InjectRepository(Fire)
    private readonly fires: Repository<Fire>,
  ) {}

  async getFires(): Promise<FireResponse[]> {
    const fire = await this.fires.find();
    return fire.map(this.mapToFireResponseDto);
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
