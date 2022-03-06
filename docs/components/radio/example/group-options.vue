<template>
  <m-radio-group v-model:value="value1" :options="plainOptions" @change="onChange" />
  <br />
  <m-radio-group v-model:value="value1" :options="options" @change="onChange" />
  <br />
  <m-radio-group v-model:value="value1" :options="optionsWithDisabled" @change="onChange" />
  <br />
  <br />
  <m-radio-group
    v-model:value="value1"
    :options="options"
    @change="onChange"
    option-type="button"
  />
  <br />
  <br />
  <m-radio-group
    defaultValue="Apple"
    size="large"
    v-model:value="value2"
    :options="options"
    @change="onChange"
    option-type="button"
    buttonStyle="solid"
  />
</template>

<script lang="ts" setup>
import { shallowRef, watch } from 'vue';
const plainOptions = shallowRef(['Apple', 'Pear', 'Orange']);
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
const value1 = shallowRef();
const value2 = shallowRef();
const onChange = (e: any) => {
  // TODO
  console.log(e);
};
watch(value1, () => {
  console.log(value1.value);
});
</script>
