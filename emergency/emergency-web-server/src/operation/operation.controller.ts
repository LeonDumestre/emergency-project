import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OperationService } from "./operation.service";
import { CreateOperationRequestDto } from "./dto/create-operation.request.dto";
import { OperationResponseDto } from "./dto/operation.response.dto";
import { AskReinforcementRequestDto } from "./dto/ask-reinforcement.request.dto";
import { SpecifyFireRequestDto } from "./dto/specify-fire.request.dto";

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

  @Post(":id/live/start")
  start(@Param("id") id: number): Promise<OperationResponseDto> {
    return this.operationService.start(id);
  }

  @Post(":id/live/reinforcement")
  askReinforcements(
    @Param("id") id: number,
    @Body() reinforcements: AskReinforcementRequestDto[],
  ): Promise<OperationResponseDto> {
    return this.operationService.askReinforcements(id, reinforcements);
  }

  @Post(":id/live/fires")
  specifyFires(
    @Param("id") id: number,
    @Body() fires: SpecifyFireRequestDto[],
  ): Promise<OperationResponseDto> {
    return this.operationService.specifyFires(id, fires);
  }

  @Post(":id/live/end")
  end(@Param("id") id: number): Promise<OperationResponseDto> {
    return this.operationService.end(id);
  }

  @Post(":id/live/came-back")
  cameBack(@Param("id") id: number): Promise<OperationResponseDto> {
    return this.operationService.cameBack(id);
  }
}
