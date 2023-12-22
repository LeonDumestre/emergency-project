<template>
  <main>
    <EmergencyMap />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EmergencyMap from "./components/EmergencyMap.vue";

export default defineComponent({
  name: "App",
  components: { EmergencyMap },
});
</script>
