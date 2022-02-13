<template>
  <m-button @click="changeSize('large')">Large</m-button>
  <m-button @click="changeSize('default')">Default</m-button>
  <m-button @click="changeSize('small')">Small</m-button>
  <br />
  <m-button type="primary" :size="size">Primary</m-button>
  <m-button :size="size">Default</m-button>
  <m-button :size="size" type="dashed">Dashed</m-button>
  <br />
  <m-button type="link" :size="size">Link</m-button>
  <br />
  <m-button type="primary" :icon="DownloadOutlined" :size="size" />
  <m-button
    type="primary"
    shape="circle"
    :icon="DownloadOutlined"
    :size="size"
  />
  <m-button
    type="primary"
    shape="round"
    :icon="DownloadOutlined"
    :size="size"
  />
  <m-button type="primary" shape="round" :icon="DownloadOutlined" :size="size">
    Download
  </m-button>
  <m-button type="primary" :size="size">
    <template #icon>
      <DownloadOutlined />
    </template>
    Download
  </m-button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { DownloadOutlined } from "@mist-desgin/icons";
const size = ref("default");
const changeSize = (value: string) => {
  size.value = value;
};
</script>
