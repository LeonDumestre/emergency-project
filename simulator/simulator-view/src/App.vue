<template>
  <main>
    <FireMap />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FireMap from "./components/FireMap.vue";

export default defineComponent({
  name: "App",
  components: { FireMap },
});
</script>
