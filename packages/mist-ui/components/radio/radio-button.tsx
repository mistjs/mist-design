import { computed, defineComponent, inject, toRefs } from 'vue';
import type { RadioProps } from './Radio';
import Radio, { radioProps } from './Radio';
// import useConfigInject from '../_util/hooks/useConfigInject';
import type { RadioGroupContext } from './types';
import { useConfigInject } from '../config-provider';

export default defineComponent({
  name: 'MRadioButton',
  props: radioProps,
  setup(props: RadioProps, { slots }) {
    const { prefixCls: preCls } = toRefs(useConfigInject());
    const prefixCls = computed(() => preCls.value + '-radio-button');

    const radioGroupContext = inject<RadioGroupContext>('radioGroupContext', undefined);

    return () => {
      const rProps: RadioProps = {
        ...props,
        prefixCls: prefixCls.value,
      };

      if (radioGroupContext) {
        rProps.onChange = radioGroupContext.onRadioChange;
        rProps.checked = rProps.value === radioGroupContext.stateValue.value;
        rProps.disabled = rProps.disabled || radioGroupContext.props.disabled;
      }
      return <Radio {...rProps}>{slots.default?.()}</Radio>;
    };
  },
});
