import { Injectable } from "@nestjs/common";
import { Fire } from "./fire.model";

@Injectable()
export class FireService {
  getFires(): Promise<Fire[]> {
    return Promise.resolve([
      {
        id: 1,
        latitude: 5,
        longitude: 9,
        intensity: 5,
        triggerAt: new Date(),
      },
    ]);
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
