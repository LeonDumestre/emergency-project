export type Fire = {
  id: number;
  longitude: number;
  latitude: number;
  intensity: number;
  triggerAt: Date;
  operation?: Operation;
};

export const RETURNING = "RETURNING";
export const ON_ROAD = "ON_ROAD";
export const ON_SITE = "ON_SITE";
type OperationStatus = typeof RETURNING | typeof ON_ROAD | typeof ON_SITE;

type Operation = {
  id: number;
  start: Date;
  status: OperationStatus;
};
