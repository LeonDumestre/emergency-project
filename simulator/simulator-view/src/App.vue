<template>
  <main>
    <div id="map" style="height: 100vh" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default defineComponent({
  name: "App",
  async mounted() {
    // Initialisez la carte Leaflet
    const map = L.map("map").setView([45.75, 4.856], 13);

    // Ajoutez une couche de carte (par exemple, OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    try {
      const response = await fetch("http://localhost:3010/fires");
      const data = await response.json();
      console.log("Data from server:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
});
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
