import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { FireStation } from "src/fire-station/fire-station.entity";
import { Fire } from "src/fire/fire.entity";
import { Firefighter } from "src/firefighter/firefighter.entity";
import { Operation } from "src/operation/operation.entity";
import { TruckType } from "src/truck/truck-type.entity";
import { Truck } from "src/truck/truck.entity";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue("PORT", true);
  }

  public isProduction() {
    const mode = this.getValue("MODE", false);
    return mode != "DEV";
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: "postgres",

      host: this.getValue("POSTGRES_HOST"),
      port: parseInt(this.getValue("POSTGRES_PORT")),
      username: this.getValue("POSTGRES_USER"),
      password: this.getValue("POSTGRES_PASSWORD"),
      database: this.getValue("POSTGRES_DATABASE"),

      //entities: [join(__dirname, "**", "*.entity.{ts,js}")],
      entities: [FireStation, Firefighter, Truck, TruckType, Operation, Fire],

      ssl: this.isProduction(),
    };
  }
}

export const configService = new ConfigService(process.env).ensureValues([
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DATABASE",
]);
