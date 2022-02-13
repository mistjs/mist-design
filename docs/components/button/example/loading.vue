<template>
  <m-button type="primary" loading>Loading</m-button>
  <m-button type="primary" size="small" loading>Loading</m-button>
  <m-button type="primary" loading />
  <m-button type="primary" shape="circle" loading />
  <m-button danger shape="round" loading />
  <br />
  <m-button type="primary" :loading="loading" @mouseenter="loading = true">
    mouseenter me!
  </m-button>
  <m-button
    type="primary"
    :icon="PoweroffOutlined"
    :loading="iconLoading"
    @click="enterIconLoading"
  >
    延迟1s
  </m-button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { PoweroffOutlined } from "@mist-desgin/icons";

const loading = ref(false);
const iconLoading = ref<boolean | { delay: number }>(false);
const enterIconLoading = () => {
  iconLoading.value = { delay: 1000 };

  setTimeout(() => {
    iconLoading.value = false;
  }, 6000);
};
</script>
