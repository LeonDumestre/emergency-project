<template>
  <main>
    <EmergencyHeader id="header" />
    <EmergencyMap id="map" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EmergencyMap from "./components/EmergencyMap.vue";
import EmergencyHeader from "./components/EmergencyHeader.vue";

export default defineComponent({
  name: "App",
  components: { EmergencyMap, EmergencyHeader },
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
