<template>
  <m-divider orientation="left">Align Top</m-divider>
  <m-row justify="center" align="top">
    <m-col :span="4">
      <DemoBox :value="100">m-col-4</DemoBox>
    </m-col>
    <m-col :span="4">
      <DemoBox :value="50">m-col-4</DemoBox>
    </m-col>
    <m-col :span="4">
      <DemoBox :value="120">m-col-4</DemoBox>
    </m-col>
    <m-col :span="4">
      <DemoBox :value="80">m-col-4</DemoBox>
    </m-col>
  </m-row>

  <m-divider orientation="left">Align Middle</m-divider>
  <m-row justify="space-around" align="middle">
    <m-col :span="4">
      <DemoBox :value="100">m-col-4</DemoBox>
    </m-col>
    <m-col :span="4">
      <DemoBox :value="50">m-col-4</DemoBox>
    </m-col>
    <m-col :span="4">
      <DemoBox :value="120">m-col-4</DemoBox>
    </m-col>
    <m-col :span="4">
      <DemoBox :value="80">m-col-4</DemoBox>
    </m-col>
  </m-row>

  <m-divider orientation="left">Align Bottom</m-divider>
  <m-row justify="space-between" align="bottom">
    <m-col :span="4">
      <DemoBox :value="100">m-col-4</DemoBox>
    </m-col>
    <m-col :span="4">
      <DemoBox :value="50">m-col-4</DemoBox>
    </m-col>
    <m-col :span="4">
      <DemoBox :value="120">m-col-4</DemoBox>
    </m-col>
    <m-col :span="4">
      <DemoBox :value="80">m-col-4</DemoBox>
    </m-col>
  </m-row>
</template>

<script lang="ts" setup>
import { defineComponent, h } from "vue";
const DemoBox = defineComponent({
  props: {
    value: Number,
  },
  setup(props, { slots }) {
    return () =>
      h(
        "p",
        {
          style: { height: props.value + "px", lineHeight: props.value + "px" },
        },
        slots
      );
  },
});
</script>

<style scoped>
#components-grid-demo-flex-align [class~="mist-row"] {
  background: rgba(128, 128, 128, 0.08);
}
</style>
