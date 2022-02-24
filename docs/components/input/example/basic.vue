<template>
  <m-input
    defaultValue="搜索的撒多"
    @blur="onBlur"
    @change="onChange"
    @input="onChange"
    v-model:value="value"
  ></m-input>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const value = ref();
watch(value, () => {
  console.log(value.value);
});
const onBlur = (e: Event) => {
  console.log(e);
};
const onChange = (e: Event) => {
  // console.log(e);
};
</script>
