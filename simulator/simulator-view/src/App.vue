<template>
  <main>
    <div id="map" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { initSse } from "./utils/sse.request";
import { startFire, getFires } from "./utils/fires.request";

export default defineComponent({
  name: "App",
  data: () => ({
    messages: [],
  }),
  async mounted() {
    initMap();

    const eventSource = new EventSource("http://localhost:3010/fires/sse");

    eventSource.onmessage = (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      console.log("Received data:", data);
    };

    eventSource.onerror = (error) => {
      console.error("Error:", error);
    };

    //await startFire();
    await getFires();
  },
  beforeUnmount() {
    L.map("map").remove();
  },
});

function initMap() {
  // Initialisez la carte Leaflet
  const map = L.map("map").setView([45.75, 4.856], 13);

  // Ajoutez une couche de carte (par exemple, OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
}
</script>

<style lang="scss" scoped>
main {
  margin: 0;
  padding: 0;
}

#map {
  height: 100vh;
  width: 100vw;
}
</style>
