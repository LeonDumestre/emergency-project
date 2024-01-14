import { BASE_API_URL, getArray } from "../common.request";
import { Operation } from "./operation.model";

const OPERATION_URL = `${BASE_API_URL}/operations`;

export function getOperations(): Promise<Operation[]> {
  return getArray<Operation>(OPERATION_URL);
}

const fakeOperations: Operation[] = [
  {
    id: 1,
    start: new Date(),
    status: "ON_SITE",
    fire: {
      id: 1,
      latitude: 45.79,
      longitude: 4.85,
      intensity: 9,
      triggerAt: new Date(),
    },
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
];
