import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
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
