<template>
  <m-radio-group v-model:value="value">
    <m-radio :value="1">A</m-radio>
    <m-radio :value="2">B</m-radio>
    <m-radio :value="3">C</m-radio>
    <m-radio :value="4">D</m-radio>
  </m-radio-group>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';

const value = shallowRef();
</script>
