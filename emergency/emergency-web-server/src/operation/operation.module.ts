import { Module } from "@nestjs/common";
import { OperationController } from "./operation.controller";
import { OperationService } from "./operation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Operation } from "./operation.entity";
import { FireModule } from "src/fire/fire.module";
import { FirefighterModule } from "src/firefighter/firefighter.module";
import { TruckModule } from "src/truck/truck.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Operation]),
    FireModule,
    FirefighterModule,
    TruckModule,
  ],
  controllers: [OperationController],
  providers: [OperationService],
  exports: [OperationService],
})
export class OperationModule {}
