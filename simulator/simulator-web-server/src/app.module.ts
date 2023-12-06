import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FireModule } from "./fire/fire.module";

@Module({
  imports: [FireModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
