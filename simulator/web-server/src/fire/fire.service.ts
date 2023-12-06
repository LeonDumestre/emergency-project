import { Injectable } from "@nestjs/common";
import { Fire } from "./fire.model";

@Injectable()
export class FireService {
  getFires(): Promise<Fire[]> {
    return Promise.resolve([]);
  }

  startFire() {
    console.log("start fire");
  }

  updateFire() {
    console.log("update fire");
  }

  deleteFire() {
    console.log("delete fire");
  }
}
