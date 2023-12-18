import { Module } from "@nestjs/common";
import { CaptorController } from "./captor.controller";
import { CaptorService } from "./captor.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Captor } from "./captor.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Captor])],
  controllers: [CaptorController],
  providers: [CaptorService],
})
export class FireModule {}
