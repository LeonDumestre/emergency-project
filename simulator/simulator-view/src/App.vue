<template>
  <main>
    <SimulatorHeader id="header" />
    <SimulatorMap id="map" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SimulatorHeader from "./components/SimulatorHeader.vue";
import SimulatorMap from "./components/SimulatorMap.vue";

export default defineComponent({
  name: "App",
  components: { SimulatorHeader, SimulatorMap },
});
</script>

<style lang="scss" scoped>
$header-height: 60px;

#header {
  height: #{$header-height};
  width: 100vw;
}

#map {
  height: calc(100vh - #{$header-height});
  width: 100vw;
}
</style>
