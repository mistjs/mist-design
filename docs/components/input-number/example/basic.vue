<template>
  <m-input-number step="2" :defaultValue="10" v-model:value="value" />
</template>

<script lang="ts" setup>
import { shallowRef, watch } from 'vue';

const value = shallowRef();
watch(value, () => {
  console.log(value.value);
});
</script>
