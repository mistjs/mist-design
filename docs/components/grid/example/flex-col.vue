<template>
  <m-divider orientation="left">Percentage columns</m-divider>
  <m-row>
    <m-col :flex="2">2 / 5</m-col>
    <m-col :flex="3">3 / 5</m-col>
  </m-row>
  <m-divider orientation="left">Fill rest</m-divider>
  <m-row>
    <m-col flex="100px">100px</m-col>
    <m-col flex="auto">Fill Rest</m-col>
  </m-row>
  <m-divider orientation="left">Raw flex style</m-divider>
  <m-row>
    <m-col flex="1 1 200px">1 1 200px</m-col>
    <m-col flex="0 1 300px">0 1 300px</m-col>
  </m-row>

  <m-row :wrap="false">
    <m-col flex="none">
      <div :style="{ padding: '0 16px' }">none</div>
    </m-col>
    <m-col flex="auto">auto with no-wrap</m-col>
  </m-row>
</template>
