<template>
  <m-divider orientation="left">Normal</m-divider>
  <m-row>
    <m-col :span="6" :order="4"> 1 col-order-4 </m-col>
    <m-col :span="6" :order="3"> 2 col-order-3 </m-col>
    <m-col :span="6" :order="2"> 3 col-order-2 </m-col>
    <m-col :span="6" :order="1"> 4 col-order-1 </m-col>
  </m-row>
  <m-divider orientation="left">Responsive</m-divider>
  <m-row>
    <m-col
      :span="6"
      :xs="{ order: 1 }"
      :sm="{ order: 2 }"
      :md="{ order: 3 }"
      :lg="{ order: 4 }"
    >
      1 col-order-responsive
    </m-col>
    <m-col
      :span="6"
      :xs="{ order: 2 }"
      :sm="{ order: 1 }"
      :md="{ order: 4 }"
      :lg="{ order: 3 }"
    >
      2 col-order-responsive
    </m-col>
    <m-col
      :span="6"
      :xs="{ order: 3 }"
      :sm="{ order: 4 }"
      :md="{ order: 2 }"
      :lg="{ order: 1 }"
    >
      3 col-order-responsive
    </m-col>
    <m-col
      :span="6"
      :xs="{ order: 4 }"
      :sm="{ order: 3 }"
      :md="{ order: 1 }"
      :lg="{ order: 2 }"
    >
      4 col-order-responsive
    </m-col>
  </m-row>
</template>
