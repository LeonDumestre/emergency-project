import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FireModule } from "./fire/fire.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fire } from "./fire/fire.entity";
import { Sensor } from "./sensor/sensor.entity";
import { SensorModule } from "./sensor/sensor.module";
import { EventModule } from "./event/event.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      synchronize: true,
      entities: [Fire, Sensor],
    }),
    FireModule,
    SensorModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
