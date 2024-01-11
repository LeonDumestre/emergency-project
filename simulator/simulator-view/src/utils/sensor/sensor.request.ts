import { BASE_API_URL, getArray } from "../common.request";
import { Sensor } from "./sensor.model";

const SENSOR_URL = `${BASE_API_URL}/sensors`;

export function getSensors(): Promise<Sensor[]> {
  return getArray<Sensor>(SENSOR_URL);
}
