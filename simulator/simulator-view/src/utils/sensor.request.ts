import { BASE_API_URL } from "./common.request";
import { Sensor } from "./sensor.model";

const SENSOR_URL = `${BASE_API_URL}/sensors`;

export async function getSensors(): Promise<Sensor[]> {
  try {
    const response = await fetch(SENSOR_URL);
    const data = await response.json();
    console.log("Data from server:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return [];
}
