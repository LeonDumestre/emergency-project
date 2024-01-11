import { BASE_API_URL, getArray } from "../common.request";
import { Fire } from "./fire.model";

const FIRE_URL = `${BASE_API_URL}/fires`;

export function getFires(): Promise<Fire[]> {
  return getArray<Fire>(FIRE_URL);
}
