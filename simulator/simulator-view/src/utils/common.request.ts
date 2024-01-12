export const BASE_API_URL = "http://localhost:3110";

export async function getArray<T>(url: string): Promise<T[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) return Promise.resolve([]);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return Promise.resolve([]);
}
