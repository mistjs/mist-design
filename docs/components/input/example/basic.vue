<template>
  <m-input
    defaultValue="搜索的撒多1111"
    placeholder="请输入内容"
    @blur="onBlur"
    @change="onChange"
    @input="onChange"
    v-model:value="value"
    allow-clear
  />
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
