import { Module } from "@nestjs/common";
import { OperationController } from "./operation.controller";
import { OperationService } from "./operation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Operation } from "./operation.entity";
import { FirefighterModule } from "src/firefighter/firefighter.module";
import { TruckModule } from "src/truck/truck.module";
import { Fire } from "src/fire/fire.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Operation, Fire]),
    FirefighterModule,
    TruckModule,
  ],
  controllers: [OperationController],
  providers: [OperationService],
  exports: [OperationService],
})
export class OperationModule {}
