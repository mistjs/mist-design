<template>
  <div>
    Current break point:
    <template v-for="screen in Object.entries(screens)" :key="screen">
      <span v-if="screen[1]" class="tag">{{ screen[0] }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Grid } from "mist-ui";
const { useBreakpoint } = Grid;
const screens = useBreakpoint();
</script>

<style scoped>
.tag {
  padding: 5px 10px;
  margin: 8px;
  color: white;
  background: rgba(19, 194, 194, 0.8);
}
</style>
