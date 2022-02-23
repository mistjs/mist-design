import { defineComponent, toRef, watch } from 'vue';
import { configProviderProps, useConfigProvider } from './types';
export default defineComponent({
  name: 'MConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    const theme = toRef(props, 'theme');
    useConfigProvider(props);
    watch(
      theme,
      val => {
        if (val.dark) {
          // 处理数据
        }
      },
      { deep: true },
    );
    return () => {
      return slots.default && slots.default();
    };
  },
});
