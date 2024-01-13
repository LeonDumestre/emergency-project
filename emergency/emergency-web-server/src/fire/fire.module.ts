import { Module } from "@nestjs/common";
import { FireController } from "./fire.controller";
import { FireService } from "./fire.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fire } from "./fire.entity";
import { Operation } from "src/operation/operation.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Fire, Operation])],
  controllers: [FireController],
  providers: [FireService],
})
export class FireModule {}
