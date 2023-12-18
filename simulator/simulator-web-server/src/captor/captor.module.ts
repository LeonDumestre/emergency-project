import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CaptorController } from "./captor.controller";
import { Captor } from "./captor.entity";
import { CaptorService } from "./captor.service";

@Module({
  imports: [TypeOrmModule.forFeature([Captor])],
  controllers: [CaptorController],
  providers: [CaptorService],
})
export class CaptorModule {}
