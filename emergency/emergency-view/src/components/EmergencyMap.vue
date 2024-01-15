<template>
  <div id="map" />
</template>

<script lang="ts">
import L from "leaflet";
import { defineComponent } from "vue";
import { initMap } from "@/utils/map.utils";
import { getFires } from "@/utils/fire/fire.request";
import { addFireCircle, setFiresOnMap } from "@/utils/fire/fire.map";
import { getFireStations } from "@/utils/fire-station/fire-station.request";
import { addFireStationCircle } from "@/utils/fire-station/fire-station.map";
import {
  setOperationsOnMap,
  addOperationLines,
} from "@/utils/operation/operation.map";
import { FireWithCircle } from "@/utils/fire/fire.model";
import { OperationWithLines } from "@/utils/operation/operation.model";
import { getOperations } from "@/utils/operation/operation.request";

type EmergencyMapData = {
  fires: FireWithCircle[];
  operations: OperationWithLines[];
};

export default defineComponent({
  name: "EmergencyMap",

  data(): EmergencyMapData {
    return {
      fires: [],
      operations: [],
    };
  },

  async mounted() {
    const map = initMap();

    const fireStations = await getFireStations();
    fireStations.map((fireStation) => addFireStationCircle(map, fireStation));

    const fires = await getFires();
    this.fires = fires.map((fire) => addFireCircle(map, fire));

    const operations = await getOperations();
    this.operations = operations.map((operation) =>
      addOperationLines(map, operation)
    );

    setInterval(async () => {
      this.fires = await setFiresOnMap(map, fires as FireWithCircle[]);
      this.operations = await setOperationsOnMap(
        map,
        this.operations as OperationWithLines[]
      );
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
  height: 100%;
  width: 100%;
}
</style>
