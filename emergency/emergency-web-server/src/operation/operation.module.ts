import { Module } from "@nestjs/common";
import { OperationController } from "./operation.controller";
import { OperationService } from "./operation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Operation } from "./operation.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Operation])],
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
