import { Operation } from "../operation/operation.model";

export type Fire = {
  id: number;
  longitude: number;
  latitude: number;
  intensity: number;
  triggerAt: Date;
  operation?: Operation;
};

export type FireWithCircle = Fire & {
  circle: L.Circle;
};
