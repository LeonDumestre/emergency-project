import { BASE_API_URL, getArray } from "../common.request";
import { Fire } from "./fire.model";

const FIRE_URL = `${BASE_API_URL}/fires/with-operation`;

export function getFires(): Promise<Fire[]> {
  return Promise.resolve([
    {
      id: 1,
      latitude: 45.79,
      longitude: 4.85,
      intensity: 9,
      triggerAt: new Date(),
      operation: {
        id: 1,
        start: new Date(),
        status: "ON_SITE",
      },
    },
    {
      id: 2,
      latitude: 45.73,
      longitude: 4.9,
      intensity: 4,
      triggerAt: new Date(),
      operation: {
        id: 2,
        start: new Date(),
        status: "ON_ROAD",
      },
    },
    {
      id: 3,
      latitude: 45.78,
      longitude: 4.91,
      intensity: 7,
      triggerAt: new Date(),
    },
  ]);
  return getArray<Fire>(FIRE_URL);
}
