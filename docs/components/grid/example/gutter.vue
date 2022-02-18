<template>
  <m-divider orientation="left">Horizontal</m-divider>
  <m-row :gutter="16">
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
  </m-row>
  <m-divider orientation="left">Responsive</m-divider>
  <m-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
  </m-row>
  <m-divider orientation="left">Vertical</m-divider>
  <m-row :gutter="[16, 24]">
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
    <m-col class="gutter-row" :span="6">
      <div :style="style">col-6</div>
    </m-col>
  </m-row>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const style = reactive({ background: "#13c2c2", padding: "8px 0" });
</script>
<style>
.gutter-row {
  padding: 0;
}
</style>
