<template>
  <p style="margin-bottom: 20px">
    <m-checkbox v-model:checked="checked" :disabled="disabled">
      {{ `${checked ? 'Checked' : 'Unchecked'}-${disabled ? 'Disabled' : 'Enabled'}` }}
    </m-checkbox>
  </p>
  <p>
    <m-button type="primary" size="small" @Click="toggleChecked">
      {{ !checked ? 'Check' : 'Uncheck' }}
    </m-button>
    <m-button style="margin: 0 10px" type="primary" size="small" @click="toggleDisable">
      {{ !disabled ? 'Disable' : 'Enable' }}
    </m-button>
  </p>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';

const checked = shallowRef(false);
const disabled = shallowRef(false);

const toggleChecked = () => {
  checked.value = !checked.value;
};
const toggleDisable = () => {
  disabled.value = !disabled.value;
};
</script>
