<template>
  <div id="map" />
</template>

<script lang="ts">
import L from "leaflet";
import { defineComponent } from "vue";
import { initMap } from "@/utils/map.utils";
import { addFireCircle } from "@/utils/fire/fire.map";
import { getFires } from "@/utils/fire/fire.request";
import { addSensorCircle } from "@/utils/sensor/sensor.map";
import { getSensors } from "@/utils/sensor/sensor.request";

export default defineComponent({
  name: "SimulatorMap",

  data() {
    return {
      eventSource: null as EventSource | null,
    };
  },

  async mounted() {
    const map = initMap();

    const sensors = await getSensors();
    sensors.map((sensor) => addSensorCircle(map, sensor));

    const fires = await getFires();
    fires.map((fire) => addFireCircle(map, fire));

    const liveFireEndPoint = "http://localhost:3110/fires/live";
    this.eventSource = new EventSource(liveFireEndPoint);
    this.eventSource.onmessage = (event) => {
      console.log("fire event: " + event.data);
    };
  },

  beforeUnmount() {
    L.map("map").remove();
    this.eventSource?.close();
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
