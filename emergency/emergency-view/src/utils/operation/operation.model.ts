import { BaseFireStation } from "../fire-station/fire-station.model";
import { Fire } from "../fire/fire.model";

export const RETURNING = "RETURNING";
export const ON_ROAD = "ON_ROAD";
export const ON_SITE = "ON_SITE";
export const FINISHED = "FINISHED";

type OperationStatus =
  | typeof RETURNING
  | typeof ON_ROAD
  | typeof ON_SITE
  | typeof FINISHED;

type Firefighter = {
  id: number;
  name: string;
  birthdate: number;
  grade: string;
  fireStationId: number;
};

type Truck = {
  plate: string;
  acquisition: Date;
  type: string;
  capacity: number;
  fireStation: BaseFireStation;
};

export type Operation = {
  id: number;
  start: Date;
  status: OperationStatus;
  fire?: Fire;
  firefighters: Firefighter[];
  trucks: Truck[];
};

export type OperationWithLines = Operation & {
  lines: L.Polyline[];
};
