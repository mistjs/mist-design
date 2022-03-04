<template>
  <m-radio-group v-model:value="value">
    <m-space direction="vertical">
      <m-radio :value="1">Option A</m-radio>
      <m-radio :value="2">Option B</m-radio>
      <m-radio :value="3">Option C</m-radio>
      <m-radio :value="4">
        More...
        <template v-if="value === 4">
          <m-input style="width: 100px; margin-left: 10px; display: inline" />
        </template>
      </m-radio>
    </m-space>
  </m-radio-group>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';

const value = shallowRef();
</script>
