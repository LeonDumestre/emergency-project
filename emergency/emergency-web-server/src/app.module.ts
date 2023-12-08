import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FireStationModule } from "./fire-station/fire-station.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "./config/config.service";

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    FireStationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
