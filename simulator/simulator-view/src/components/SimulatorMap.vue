<template>
  <div id="map" />
</template>

<script lang="ts">
import L from "leaflet";
import { defineComponent } from "vue";
import { initMap } from "@/utils/map.utils";
import { addFireCircle, setFiresOnMap } from "@/utils/fire/fire.map";
import { getFires } from "@/utils/fire/fire.request";
import { addSensorCircle } from "@/utils/sensor/sensor.map";
import { getSensors } from "@/utils/sensor/sensor.request";
import { Sensor } from "@/utils/sensor/sensor.model";
import { FireWithCircle } from "@/utils/fire/fire.model";

type SimulatorMapData = {
  sensors: Sensor[];
  fires: FireWithCircle[];
};

export default defineComponent({
  name: "SimulatorMap",

  data(): SimulatorMapData {
    return {
      sensors: [],
      fires: [],
    };
  },

  async mounted() {
    const map = initMap();

    this.sensors = await getSensors();
    this.sensors.map((sensor) => addSensorCircle(map, sensor));

    const fires = await getFires();
    const fireWithCircles = fires.map((fire) => addFireCircle(map, fire));

    setInterval(async () => {
      this.fires = await setFiresOnMap(map, fireWithCircles);
    }, 3000);
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
