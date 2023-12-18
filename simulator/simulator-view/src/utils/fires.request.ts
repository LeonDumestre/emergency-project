export async function getFires() {
  try {
    const response = await fetch("http://localhost:3010/fires");
    const data = await response.json();
    console.log("Data from server:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return null;
}

export async function startFire() {
  const postData = {
    longitude: 5.4847,
    latitude: 10.2,
    intensity: 8,
    triggerAt: new Date(),
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  };

  const url = "http://localhost:3010/fires";
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log("Data from server:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return null;
}
