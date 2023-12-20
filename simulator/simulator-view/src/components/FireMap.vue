<template>
  <div id="map" />
</template>

<script lang="ts">
import L from "leaflet";
import { defineComponent } from "vue";
import { initMap, addCircle } from "@/utils/map.utils";
import { getFires } from "@/utils/fire.request";

export default defineComponent({
  name: "App",

  async mounted() {
    const map = initMap();

    const fires = await getFires();
    fires.map((fire) => addCircle(map, fire));
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
