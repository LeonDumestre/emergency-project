export const RETURNING = "RETURNING";
export const ON_ROAD = "ON_ROAD";
export const ON_SITE = "ON_SITE";
export const FINISHED = "FINISHED";
type OperationStatus =
  | typeof RETURNING
  | typeof ON_ROAD
  | typeof ON_SITE
  | typeof FINISHED;

type Operation = {
  id: number;
  start: Date;
  status: OperationStatus;
  firefighters: Firefighter[];
  trucks: Truck[];
};

type Firefighter = {
  id: number;
  name: string;
  birthdate: number;
  grade: string;
};

type FireStation = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

type Truck = {
  plate: string;
  acquisition: Date;
  type: string;
  capacity: number;
  fireStation: FireStation;
};

export type Fire = {
  id: number;
  longitude: number;
  latitude: number;
  intensity: number;
  triggerAt: Date;
  operation?: Operation;
};
