import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FireModule } from "./fire/fire.module";
import { AppGateway } from "./app.gateway";

@Module({
  imports: [FireModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
