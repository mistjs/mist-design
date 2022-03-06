<template>
  <m-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" v-model:checked="checkAll">
    Check all
  </m-checkbox>
  <m-divider />
  <m-checkbox-group :options="plainOptions" v-model:value="checkedList" @change="onChange" />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
const plainOptions = shallowRef(['Apple', 'Pear', 'Orange']);
const indeterminate = shallowRef();
const checkAll = shallowRef();
const checkedList = shallowRef<string[]>([]);
const onCheckAllChange = (e: Event) => {
  // 切换
  indeterminate.value = false;
  if ((e.target as HTMLInputElement).checked) {
    checkedList.value = plainOptions.value;
  } else {
    checkedList.value = [];
  }
};
const onChange = (list: string[]) => {
  // 切换
  checkedList.value = list;
  if (checkedList.value.length === plainOptions.value.length) {
    indeterminate.value = false;
    checkAll.value = true;
  } else {
    checkAll.value = false;
    indeterminate.value = checkedList.value.length > 0;
  }
};
</script>
