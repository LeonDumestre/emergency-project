import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { OperationService } from "./operation.service";
import { CreateOperationRequestDto } from "./dto/create-operation.request.dto";
import { OperationResponseDto } from "./dto/operation.response.dto";
import { AskReinforcementRequestDto } from "./dto/ask-reinforcement.request.dto";

@Controller("operations")
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Get()
  getOperations(): Promise<OperationResponseDto[]> {
    return this.operationService.getOperations();
  }

  @Post()
  createOperation(
    @Body() operation: CreateOperationRequestDto,
  ): Promise<OperationResponseDto> {
    return this.operationService.createOperation(operation);
  }

  @Put(":id/live/on-site")
  onSite(@Param("id", ParseIntPipe) id: number): Promise<OperationResponseDto> {
    return this.operationService.onSite(id);
  }

  @Put(":id/live/reinforcement")
  askReinforcements(
    @Param("id", ParseIntPipe) id: number,
    @Body() reinforcements: AskReinforcementRequestDto[],
  ): Promise<OperationResponseDto> {
    return this.operationService.askReinforcements(id, reinforcements);
  }

  @Put(":id/live/on-return")
  onReturn(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<OperationResponseDto> {
    return this.operationService.onReturn(id);
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.operationService.remove(id);
  }
}
