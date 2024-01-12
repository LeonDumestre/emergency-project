<template>
  <div id="map" />
</template>

<script lang="ts">
import L, { Map } from "leaflet";
import { defineComponent } from "vue";
import { initMap } from "@/utils/map.utils";
import {
  addFireCircle,
  updateFireCircle,
  removeFireCircle,
} from "@/utils/fire/fire.map";
import { getFires } from "@/utils/fire/fire.request";
import { addSensorCircle } from "@/utils/sensor/sensor.map";
import { getSensors } from "@/utils/sensor/sensor.request";
import { Sensor } from "@/utils/sensor/sensor.model";
import { FireWithCircle } from "@/utils/fire/fire.model";

export default defineComponent({
  name: "SimulatorMap",

  data() {
    return {
      map: null as Map | null,
      eventSource: null as EventSource | null,
      sensors: [] as Sensor[],
      fires: [] as FireWithCircle[],
    };
  },

  async mounted() {
    this.map = initMap();

    this.sensors = await getSensors();
    this.sensors.map((sensor) => addSensorCircle(this.map as Map, sensor));

    const fires = await getFires();
    const fireWithCircles = fires.map((fire) =>
      addFireCircle(this.map as Map, fire)
    );

    setInterval(async () => {
      await this.updateFiresOnMap(fireWithCircles);
    }, 3000);
  },

  beforeUnmount() {
    L.map("map").remove();
    this.eventSource?.close();
  },

  methods: {
    async updateFiresOnMap(firesWithCircle: FireWithCircle[]) {
      if (!this.map) return;

      const fires = await getFires();

      fires.forEach((fire) => {
        const fireWithCircle = firesWithCircle.find(
          (fireWithCircle) => fireWithCircle.id === fire.id
        );

        // Update fire circle if it exists and the intensity has changed
        if (fireWithCircle && fireWithCircle.intensity != fire.intensity) {
          updateFireCircle(fireWithCircle, fire);
        }
        // Add fire circle if it doesn't exist
        else if (!fireWithCircle) {
          firesWithCircle.push(addFireCircle(this.map as Map, fire));
        }
      });

      // remove fires that are not in the response
      firesWithCircle
        .filter(
          (fireWithCircle) =>
            !fires.find((fire) => fire.id === fireWithCircle.id)
        )
        .forEach((fireWithCircle) => {
          removeFireCircle(fireWithCircle);
          firesWithCircle.splice(firesWithCircle.indexOf(fireWithCircle), 1);
        });
    },
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
