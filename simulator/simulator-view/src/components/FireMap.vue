<template>
  <div id="map" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import L from "leaflet";
import { getFires } from "../utils/fires.request";

export default defineComponent({
  name: "App",
  async mounted() {
    initMap();

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
@import "leaflet/dist/leaflet.css";

#map {
  height: 100vh;
  width: 100vw;
}
</style>
