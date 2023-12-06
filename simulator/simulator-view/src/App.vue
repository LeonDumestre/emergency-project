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
  mounted() {
    // Initialisez la carte Leaflet
    const map = L.map("map").setView([45.75, 4.856], 13);

    // Ajoutez une couche de carte (par exemple, OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
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
