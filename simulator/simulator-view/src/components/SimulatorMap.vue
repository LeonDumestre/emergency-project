<template>
  <div id="map" />
</template>

<script lang="ts">
import L from "leaflet";
import { defineComponent } from "vue";
import { initMap, addFireCircle, addSensorCircle } from "@/utils/map.utils";
import { getFires } from "@/utils/fire.request";
import { getSensors } from "@/utils/sensor.request";

export default defineComponent({
  name: "SimulatorMap",

  async mounted() {
    const map = initMap();

    const sensors = await getSensors();
    sensors.map((sensor) => addSensorCircle(map, sensor));

    const fires = await getFires();
    fires.map((fire) => addFireCircle(map, fire));

    const liveFireEndPoint = "http://localhost:3110/fires/live";
    const fireSource = new EventSource(liveFireEndPoint);
    fireSource.addEventListener("created", () => {
      console.log("fire created");
    });
    fireSource.addEventListener("updated", () => {
      console.log("fire updated");
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
  height: 100vh;
  width: 100vw;
}
</style>
