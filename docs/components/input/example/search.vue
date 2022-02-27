<template>
  <m-input-search
    @search="onSearch"
    @input="onInput"
    placeholder="请输入..."
    v-model:value="value"
  />
</template>

<script setup lang="ts">
import { shallowRef, watch } from 'vue';

const value = shallowRef();
watch(value, () => {
  console.log(value.value);
});
const onInput = (e: InputEvent) => {
  console.log(e);
};
const onSearch = (value: string) => {
  console.log(value);
};
</script>
