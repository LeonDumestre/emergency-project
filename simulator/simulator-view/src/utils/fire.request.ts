import { BASE_API_URL } from "./common.request";
import { Fire, NewFire } from "./fire.model";

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

export async function startFire(fire: NewFire) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fire),
  };

  try {
    const response = await fetch(FIRE_URL, requestOptions);
    const data = await response.json();
    console.log("Data from server:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// This function is used to initialize the fires in the simulator
export async function initAllFires() {
  const fires = [
    {
      latitude: 45.76,
      longitude: 4.85,
      intensity: 9,
      triggerAt: new Date(),
    },
    {
      latitude: 45.73,
      longitude: 4.9,
      intensity: 4,
      triggerAt: new Date(),
    },
    {
      latitude: 45.78,
      longitude: 4.91,
      intensity: 7,
      triggerAt: new Date(),
    },
  ];

  fires.map(async (fire) => await startFire(fire));
}
