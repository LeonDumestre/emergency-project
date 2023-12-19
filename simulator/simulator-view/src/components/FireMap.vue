<template>
  <div id="map" />
</template>

<script lang="ts">
import L from "leaflet";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  async mounted() {
    const map = initMap();

    const fires = [
      {
        id: 1,
        latitude: 45.76,
        longitude: 4.85,
        intensity: 9,
        triggerAt: new Date(),
      },
    ];

    fires.map((fire) =>
      addMarker(map, fire.latitude, fire.longitude, fire.intensity)
    );
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

function addMarker(
  map: L.Map,
  latitude: number,
  longitude: number,
  intensity: number
) {
  /*const icon = new L.Icon({
    iconUrl:
      "https://cdn.discordapp.com/attachments/1181543375392997508/1181609799130038322/fire-png.png?ex=658ae961&is=65787461&hm=c231a85ec319af1c8ff6d92a7587f216c02c1948bcae4b6fec0154438ec59394&",
    iconSize: [30, 40],
    iconAnchor: [0, 40],
    popupAnchor: [15, -40],
  });*/

  //const marker = L.marker([latitude, longitude], { icon }).addTo(map);
  //marker.bindPopup(`Intensité: ${intensity}`);

  const circle = L.circle([latitude, longitude], {
    radius: intensity * 50,
    color: "red",
    fillOpacity: 0.2,
  }).addTo(map);

  circle.bindPopup(`Intensité: ${intensity}`);
}
</script>

<style lang="scss" scoped>
@import "leaflet/dist/leaflet.css";

#map {
  height: 100vh;
  width: 100vw;
}
</style>
