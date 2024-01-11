<template>
  <div class="header">
    <h1>Emergency View</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmergencyHeader",
});
</script>

<style lang="scss" scoped>
.header {
  background-color: #9c1c13;
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
