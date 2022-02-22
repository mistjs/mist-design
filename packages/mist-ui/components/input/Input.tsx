import { computed, defineComponent, toRefs } from 'vue';
import { inputProps } from './InputProps';
import type { InputProps } from './InputProps';
import { useConfigInject } from '../config-provider';
import { getInputClassName } from './utils';
export default defineComponent({
  name: 'MInput',
  props: inputProps,
  setup(props) {
    const { direction, prefixCls } = toRefs(useConfigInject());
    const classes = computed(() => {
      const { bordered, size, disabled } = props;
      return getInputClassName(prefixCls, bordered, size, disabled, direction.value);
    });
    return () => {
      return <div></div>;
    };
  },
});
