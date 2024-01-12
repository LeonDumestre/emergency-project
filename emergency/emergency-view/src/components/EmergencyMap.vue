<template>
  <div id="map" />
</template>

<script lang="ts">
import L from "leaflet";
import { defineComponent } from "vue";
import { initMap } from "@/utils/map.utils";
import { getFires } from "@/utils/fire/fire.request";
import { addFireCircle } from "@/utils/fire/fire.map";
import { getFireStations } from "@/utils/fire-station/fire-station.request";
import { addFireStationMarker } from "@/utils/fire-station/fire-station.map";
import { addOperationLines } from "@/utils/fire/fire.map";

export default defineComponent({
  name: "EmergencyMap",

  async mounted() {
    const map = initMap();

    const fireStations = await getFireStations();
    fireStations.map((fireStation) => addFireStationMarker(map, fireStation));

    const fires = await getFires();
    fires.map((fire) => {
      addFireCircle(map, fire);
      addOperationLines(map, fire);
    });
  },

  beforeUnmount() {
    L.map("map").remove();
  },
});
</script>

<style lang="scss" scoped>
@import "leaflet/dist/leaflet.css";

#map {
  height: 100%;
  width: 100%;
}
</style>
