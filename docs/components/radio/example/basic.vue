<template>
  <m-radio v-model:checked="checked">Radio</m-radio>
</template>

<script lang="ts" setup>
import { shallowRef, watch } from 'vue';

const checked = shallowRef();
watch(checked, () => {
  console.log(checked.value);
});
</script>
