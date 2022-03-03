<template>
  <m-checkbox v-model:checked="checked">Checkbox</m-checkbox>
</template>

<script setup lang="ts">
import { shallowRef, watch } from 'vue';

const checked = shallowRef();
watch(checked, () => {
  console.log(checked.value);
});
</script>
