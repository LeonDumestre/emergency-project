<template>
  <div id="map" />
</template>

<script lang="ts">
import L from "leaflet";
import { defineComponent } from "vue";
import { initMap } from "@/utils/map.utils";
import { getSensors } from "@/utils/sensor/sensor.request";
import { addSensorCircle } from "@/utils/sensor/sensor.map";
import { getFires } from "@/utils/fire/fire.request";
import { addFireCircle } from "@/utils/fire/fire.map";
import { getFireStations } from "@/utils/fire-station/fire-station.request";
import { addFireStationMarker } from "@/utils/fire-station/fire-station.map";

export default defineComponent({
  name: "EmergencyMap",

  async mounted() {
    const map = initMap();

    const sensors = await getSensors();
    sensors.map((sensor) => addSensorCircle(map, sensor));

    const fires = await getFires();
    fires.map((fire) => addFireCircle(map, fire));

    const fireStations = await getFireStations();
    fireStations.map((fireStation) => addFireStationMarker(map, fireStation));
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
