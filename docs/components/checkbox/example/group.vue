<template>
  <m-checkbox-group :options="plainOptions" v-model:value="value1" @change="onChange" />
  <br />
  <br />
  <m-checkbox-group :options="options" v-model:value="value2" @change="onChange" />
  <br />
  <br />
  <m-checkbox-group :options="optionsWithDisabled" v-model:value="value1" @change="onChange" />
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';

const plainOptions = shallowRef(['Apple', 'Pear', 'Orange']);
const value1 = shallowRef(['Apple']);
const value2 = shallowRef(['Pear']);
const options = shallowRef([
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
]);
const optionsWithDisabled = shallowRef([
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
]);
const onChange = (e: any) => {
  // TODO
  console.log(e);
};
</script>
