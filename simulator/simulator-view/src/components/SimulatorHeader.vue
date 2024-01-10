<template>
  <div class="header">
    <h1>Simulator View</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SimulatorHeader",
});
</script>

<style lang="scss" scoped>
.header {
  background-color: #310805;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 0 16px;
}
</style>
