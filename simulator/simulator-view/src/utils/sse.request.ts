export async function initSse() {
  const eventSource = new EventSource("http://localhost:3010/fires/sse");

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received data:", data);
    // Mettez à jour votre interface utilisateur avec les données reçues
  };

  eventSource.onerror = (error) => {
    console.error("Error:", error);
  };
}
