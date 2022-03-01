import type { ExtractPropTypes } from 'vue';
import { computed, defineComponent, inject, ref, toRefs } from 'vue';
import PropTypes from '../_utils/tools/vue-types';
import VcCheckbox from '../checkbox/src/Checkbox';
import classNames from '../_utils/tools/classNames';
// import useConfigInject from '../_util/hooks/useConfigInject';/**/
import type { RadioChangeEvent, RadioGroupContext } from './types';
import { useConfigInject } from '../config-provider';
// import { useInjectFormItemContext } from '../form/FormItemContext';

export const radioProps = {
  prefixCls: PropTypes.string,
  checked: PropTypes.looseBool,
  disabled: PropTypes.looseBool,
  isGroup: PropTypes.looseBool,
  value: PropTypes.any,
  name: PropTypes.string,
  id: PropTypes.string,
  autofocus: PropTypes.looseBool,
  type: PropTypes.string.def('radio'),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
};

export type RadioProps = Partial<ExtractPropTypes<typeof radioProps>>;

export default defineComponent({
  name: 'ARadio',
  props: radioProps,
  emits: ['update:checked', 'update:value', 'change', 'blur', 'focus'],
  setup(props, { emit, expose, slots }) {
    // const formItemContext = useInjectFormItemContext();
    const vcCheckbox = ref<HTMLElement>();
    const radioGroupContext = inject<RadioGroupContext>('radioGroupContext', undefined);
    const { prefixCls: preCls, direction } = toRefs(useConfigInject());
    const prefixCls = computed(() => preCls.value + '-radio');

    const focus = () => {
      vcCheckbox.value.focus();
    };

    const blur = () => {
      vcCheckbox.value.blur();
    };

    expose({ focus, blur });

    const handleChange = (event: RadioChangeEvent) => {
      const targetChecked = event.target.checked;
      emit('update:checked', targetChecked);
      emit('update:value', targetChecked);
      emit('change', event);
      // formItemContext.onFieldChange();
    };

    const onChange = (e: RadioChangeEvent) => {
      emit('change', e);
      if (radioGroupContext && radioGroupContext.onRadioChange) {
        radioGroupContext.onRadioChange(e);
      }
    };

    return () => {
      const radioGroup = radioGroupContext;
      const {
        prefixCls: customizePrefixCls,
        // id = formItemContext.id.value,
        onClick,
        ...restProps
      } = props;

      const rProps: RadioProps = {
        prefixCls: prefixCls.value,
        // id,
        ...restProps,
      };

      if (radioGroup) {
        rProps.name = radioGroup.props.name;
        rProps.onChange = onChange;
        rProps.checked = props.value === radioGroup.stateValue.value;
        rProps.disabled = props.disabled || radioGroup.props.disabled;
      } else {
        rProps.onChange = handleChange;
      }
      const wrapperClassString = classNames({
        [`${prefixCls.value}-wrapper`]: true,
        [`${prefixCls.value}-wrapper-checked`]: rProps.checked,
        [`${prefixCls.value}-wrapper-disabled`]: rProps.disabled,
        [`${prefixCls.value}-wrapper-rtl`]: direction.value === 'rtl',
      });

      return (
        <label class={wrapperClassString} onClick={onClick}>
          <VcCheckbox {...rProps} ref={vcCheckbox} />
          {slots.default && <span>{slots.default()}</span>}
        </label>
      );
    };
  },
});
