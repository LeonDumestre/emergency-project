import { Module } from "@nestjs/common";
import { FireController } from "./fire.controller";
import { FireService } from "./fire.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fire } from "./fire.entity";
import { OperationModule } from "src/operation/operation.module";

@Module({
  imports: [TypeOrmModule.forFeature([Fire]), OperationModule],
  controllers: [FireController],
  providers: [FireService],
  exports: [FireService],
})
export class FireModule {}
