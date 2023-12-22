import { BASE_API_URL } from "../common.request";
import { FireStation } from "./fire-station.model";

const FIRE_STATION_URL = `${BASE_API_URL}/fire-stations`;

export async function getFireStations(): Promise<FireStation[]> {
  try {
    const response = await fetch(FIRE_STATION_URL);
    if (!response.ok) return Promise.resolve([]);

    const data = await response.json();
    console.log("Data from server:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return Promise.resolve([]);
}
