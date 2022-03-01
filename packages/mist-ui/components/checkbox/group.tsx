import { computed, defineComponent, ref, watch } from 'vue';
import { checkboxGroupProps } from './types';
import { useConfigInject } from '../config-provider';
export default defineComponent({
  name: 'MCheckboxGroup',
  props: checkboxGroupProps(),
  setup(props) {
    const { prefixCls, direction } = useConfigInject();
    const mergedValue = ref((props.value === undefined ? props.defaultValue : props.value) || []);
    watch(
      () => props.value,
      () => {
        mergedValue.value = props.value || [];
      },
    );
    const options = computed(() => {
      return props.options.map(option => {
        if (typeof option === 'string') {
          return {
            label: option,
            value: option,
          };
        }
        return option;
      });
    });
    return () => {
      return <></>;
    };
  },
});
