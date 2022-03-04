<template>
  <m-radio v-model:checked="checked1" :disabled="disabled">Disabled</m-radio>
  <m-radio v-model:checked="checked2" :disabled="disabled">Disabled</m-radio>
  <br />
  <div :style="{ marginTop: 20 }">
    <m-button type="primary" @click="toggleDisabled">Toggle disabled</m-button>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';

const checked1 = shallowRef();
const checked2 = shallowRef();
const disabled = shallowRef();
const toggleDisabled = () => {
  disabled.value = !disabled.value;
};
</script>
