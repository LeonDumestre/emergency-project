import { Body, Controller, Get, Post } from "@nestjs/common";
import { OperationService } from "./operation.service";
import { CreateOperationRequestDto } from "./dto/create-operation.request.dto";
import { OperationResponseDto } from "./dto/operation.response.dto";

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
}
