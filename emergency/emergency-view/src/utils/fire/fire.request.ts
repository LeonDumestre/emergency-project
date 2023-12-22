import { BASE_API_URL } from "../common.request";
import { Fire } from "./fire.model";

const FIRE_URL = `${BASE_API_URL}/fires`;

export async function getFires(): Promise<Fire[]> {
  try {
    const response = await fetch(FIRE_URL);
    const data = await response.json();
    console.log("Data from server:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return [];
}
