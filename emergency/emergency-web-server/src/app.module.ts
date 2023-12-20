import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FireStationModule } from "./fire-station/fire-station.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "./config/config.service";
import { FirefighterModule } from "./firefighter/firefighter.module";
import { SensorModule } from "./sensor/sensor.module";
import { TruckModule } from "./truck/truck.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    FireStationModule,
    FirefighterModule,
    SensorModule,
    TruckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
