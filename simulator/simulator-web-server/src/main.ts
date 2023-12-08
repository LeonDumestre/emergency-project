import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const allowedOrigins = ["http://localhost:3020"];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  });

  await app.listen(3010);
}

bootstrap();
