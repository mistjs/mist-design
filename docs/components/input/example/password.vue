<template>
  <m-input-password placeholder="请输入密码" v-model:value="value" />
</template>

<script lang="ts" setup>
import { shallowRef, watch } from 'vue';

const value = shallowRef();
watch(value, () => {
  console.log(value.value);
});
</script>

<style scoped></style>
