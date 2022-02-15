<template>
  <m-affix :offsetTop="offsetTop" @change="onChange">
    <m-button>120px to affix top</m-button>
  </m-affix>
</template>

<script lang="ts" setup>
import { shallowRef } from "vue";

const offsetTop = shallowRef(120);
const onChange = (fixed: boolean) => {
  console.log(fixed);
};
</script>
