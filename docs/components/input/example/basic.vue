<template>
  <m-input v-model:value="value"></m-input>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const value = ref();
watch(value, () => {
  console.log(value.value);
});
</script>
