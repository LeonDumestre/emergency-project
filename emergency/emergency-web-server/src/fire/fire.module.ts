import { Module } from "@nestjs/common";
import { FireController } from "./fire.controller";
import { FireService } from "./fire.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fire } from "./fire.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Fire])],
  controllers: [FireController],
  providers: [FireService],
  exports: [FireService],
})
export class FireModule {}
