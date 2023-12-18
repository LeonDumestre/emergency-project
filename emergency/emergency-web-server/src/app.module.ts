import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FireStationModule } from "./fire-station/fire-station.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "./config/config.service";
import { FirefighterModule } from "./firefighter/firefighter.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    FireStationModule,
    FirefighterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
