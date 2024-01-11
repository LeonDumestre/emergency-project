import { BASE_API_URL, getArray } from "../common.request";
import { FireStation } from "./fire-station.model";

const FIRE_STATION_URL = `${BASE_API_URL}/fire-stations`;

export function getFireStations(): Promise<FireStation[]> {
  return getArray<FireStation>(FIRE_STATION_URL);
}
