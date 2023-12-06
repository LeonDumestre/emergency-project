<template>
  <main>
    <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
    </l-map>
  </main>
</template>

<script lang="ts" setup>
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"

useHead({ title: 'Simulation Interface' })

let zoom = ref(13)
let center = ref([45.750, 4.856])
</script>

<style lang="scss" scoped>
html, body {
  margin: 0;
  padding: 0;
}

main {
  height: 100vh;
  width: 100vw;
}
</style>