import { BASE_API_URL, getArray } from "../common.request";
import { Fire } from "./fire.model";

const FIRE_URL = `${BASE_API_URL}/fires`;

export function getFires(): Promise<Fire[]> {
  return getArray<Fire>(FIRE_URL + "/with-operation");
}

const fakeFires: Fire[] = [
  {
    id: 1,
    latitude: 45.79,
    longitude: 4.85,
    intensity: 9,
    triggerAt: new Date(),
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
];
