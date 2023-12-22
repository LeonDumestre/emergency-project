<template>
  <div id="map" />
</template>

<script lang="ts">
import L from "leaflet";
import { defineComponent } from "vue";
import { initMap } from "@/utils/map.utils";

export default defineComponent({
  name: "EmergencyMap",

  async mounted() {
    initMap();
  },

  beforeUnmount() {
    L.map("map").remove();
  },
});
</script>

<style lang="scss" scoped>
@import "leaflet/dist/leaflet.css";

#map {
  height: 100vh;
  width: 100vw;
}
</style>
