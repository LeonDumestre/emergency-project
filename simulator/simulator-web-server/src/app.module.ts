import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FireModule } from "./fire/fire.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fire } from "./fire/fire.entity";
import { Captor } from "./captor/captor.entity";
import { CaptorModule } from "./captor/captor.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      synchronize: true,
      entities: [Fire, Captor],
    }),
    FireModule,
    CaptorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
