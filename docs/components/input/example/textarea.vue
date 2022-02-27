<template>
  <m-textarea
    defaultValue="搜索的撒多111"
    placeholder="请输入内容"
    v-model:value="value"
    allow-clear
  />
</template>

<script setup lang="ts">
import { shallowRef, watch } from 'vue';

const value = shallowRef();
watch(value, () => {
  console.log(value.value);
});
</script>
