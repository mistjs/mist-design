<template>
  <m-affix :offsetTop="offsetTop">
    <m-button type="primary" @click="update"> Affix top </m-button>
  </m-affix>
  <br />
  <m-affix :offsetBottom="offsetBottom">
    <m-button type="primary" @click="bottomUpdate"> Affix bottom </m-button>
  </m-affix>
</template>

<script lang="ts" setup>
import { shallowRef } from "vue";

const offsetBottom = shallowRef(10);
const offsetTop = shallowRef(60);
const update = () => {
  offsetTop.value += 10;
};
const bottomUpdate = () => {
  offsetBottom.value += 10;
};
</script>
