<template>
  <div id="map" />
</template>

<script lang="ts">
import L from "leaflet";
import { defineComponent } from "vue";
import { Fire } from "@/utils/fire.model";
import { formatDateWithHour } from "@/utils/date.utils";
import { getFires } from "@/utils/fire.request";

export default defineComponent({
  name: "App",
  async mounted() {
    const map = initMap();

    const fires = await getFires();
    fires.map((fire) => addMarker(map, fire));
  },
  beforeUnmount() {
    L.map("map").remove();
  },
});

function initMap(): L.Map {
  // Initialisez la carte Leaflet
  const minZoom = 13;
  const map = L.map("map", { minZoom }).setView([45.75, 4.856], 13);

  // Ajoutez une couche de carte OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  return map;
}

function addMarker(map: L.Map, fire: Fire) {
  const circle = L.circle([fire.latitude, fire.longitude], {
    radius: fire.intensity * 50,
    color: "red",
    fillOpacity: 0.2,
  }).addTo(map);

  const triggerAt = formatDateWithHour(fire.triggerAt);
  circle.bindPopup(
    `Intensité: ${fire.intensity}<br />
    Déclenchement: ${triggerAt}`
  );
}
</script>

<style lang="scss" scoped>
@import "leaflet/dist/leaflet.css";

#map {
  height: 100vh;
  width: 100vw;
}
</style>
