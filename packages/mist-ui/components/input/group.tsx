import { computed, defineComponent, PropType, toRefs } from 'vue';
import { SizeType, useConfigInject } from '../config-provider';
import { FocusEventHandler, MouseEventHandler } from '../_utils/tools/EventInterface';
export default defineComponent({
  name: 'MInputGroup',
  props: {
    size: {
      type: String as PropType<SizeType>,
      default: undefined,
    },
    compact: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    onMouseenter: {
      type: Function as PropType<MouseEventHandler>,
      default: undefined,
    },
    onMouseleave: {
      type: Function as PropType<MouseEventHandler>,
      default: undefined,
    },
    onBlur: {
      type: Function as PropType<FocusEventHandler>,
      default: undefined,
    },
    onFocus: {
      type: Function as PropType<FocusEventHandler>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const { prefixCls, direction } = toRefs(useConfigInject());
    const cls = computed(() => {
      const pre = prefixCls.value + '-input-group';
      return {
        [`${pre}`]: true,
        [`${pre}-lg`]: props.size === 'large',
        [`${pre}-sm`]: props.size === 'small',
        [`${pre}-compact`]: props.compact,
        [`${pre}-rtl`]: direction.value === 'rtl',
      };
    });
    return () => {
      return (
        <span
          class={cls.value}
          onMouseenter={props.onMouseEnter}
          onMouseleave={props.onMouseLeave}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        >
          {slots.default?.()}
        </span>
      );
    };
  },
});
