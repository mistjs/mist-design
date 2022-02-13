<template>
  <m-button type="primary" shape="circle" :icon="SearchOutlined" />
  <m-button type="primary" shape="circle">A</m-button>
  <m-button type="primary" :icon="SearchOutlined">Search</m-button>
  <m-button shape="circle" :icon="SearchOutlined" />
  <m-button :icon="SearchOutlined">Search</m-button>
  <br />
  <m-button shape="circle">
    <template #icon><SearchOutlined /></template>
  </m-button>
  <m-button>
    <template #icon><SearchOutlined /></template>
    Search
  </m-button>
  <m-button shape="circle" type="dashed" :icon="SearchOutlined" />
  <m-button type="dashed" :icon="SearchOutlined">Search</m-button>
  <br />
  <br />
  <m-button size="large" type="primary" shape="circle" :icon="SearchOutlined" />
  <m-button size="large" type="primary" shape="circle">A</m-button>
  <m-button size="large" type="primary" :icon="SearchOutlined">Search</m-button>
  <m-button size="large" shape="circle" :icon="SearchOutlined" />
  <m-button size="large" :icon="SearchOutlined">Search</m-button>
  <br />
  <m-button shape="circle" size="large">
    <template #icon><SearchOutlined /></template>
  </m-button>
  <m-button size="large">
    <template #icon><SearchOutlined /></template>
    Search
  </m-button>
  <m-button size="large" shape="circle" type="dashed" :icon="SearchOutlined" />
  <m-button size="large" type="dashed" :icon="SearchOutlined">Search</m-button>
</template>

<script lang="ts" setup>
import { SearchOutlined } from "@mist-desgin/icons";
</script>
