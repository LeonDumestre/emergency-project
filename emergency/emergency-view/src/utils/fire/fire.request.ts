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
        firefighters: [],
        trucks: [
          {
            plate: "AB-123-CD",
            acquisition: new Date(),
            type: "FPT",
            capacity: 1000,
            fireStation: {
              id: 2,
              name: "Fire Station 2",
              latitude: 45.762779,
              longitude: 4.84393,
            },
          },
          {
            plate: "EF-456-GH",
            acquisition: new Date(),
            type: "FPT",
            capacity: 1000,
            fireStation: {
              id: 5,
              name: "Fire Station 5",
              latitude: 45.765872,
              longitude: 4.905116,
            },
          },
        ],
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
        firefighters: [],
        trucks: [],
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
