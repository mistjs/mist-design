<template>
  <m-divider orientation="left">sub-element align left</m-divider>
  <m-row justify="start">
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
  </m-row>

  <m-divider orientation="left">sub-element align center</m-divider>
  <m-row justify="center">
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
  </m-row>

  <m-divider orientation="left">sub-element align right</m-divider>
  <m-row justify="end">
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
  </m-row>

  <m-divider orientation="left">sub-element monospaced arrangement</m-divider>
  <m-row justify="space-between">
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
  </m-row>

  <m-divider orientation="left">sub-element align full</m-divider>
  <m-row justify="space-around">
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
    <m-col :span="4">m-col-4</m-col>
  </m-row>
</template>

<style scoped>
#components-grid-demo-flex [class~="mist-row"] {
  background: rgba(128, 128, 128, 0.08);
}
</style>
