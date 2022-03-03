import {
  watchEffect,
  onMounted,
  defineComponent,
  inject,
  onBeforeUnmount,
  ref,
  computed,
  toRefs,
} from 'vue';
import classNames from '../_utils/tools/classNames';
import VcCheckbox from './src/Checkbox';
import warning from '../_utils/tools/warning';
import type { RadioChangeEvent } from '../radio/types';
import type { EventHandler } from '../_utils/tools/EventInterface';
// import { useInjectFormItemContext } from '../form/FormItemContext';
// import useConfigInject from '../_util/hooks/useConfigInject';

import type { CheckboxProps } from './types';
import { CheckboxGroupContextKey, checkboxProps } from './types';
import { flattenChildren } from '../_utils/tools';
import { useConfigInject } from '../config-provider';

export default defineComponent({
  name: 'MCheckbox',
  inheritAttrs: false,
  __MIST_CHECKBOX: true,
  props: checkboxProps(),
  emits: ['change', 'update:checked'],
  setup(props, { emit, attrs, slots, expose }) {
    // const formItemContext = useInjectFormItemContext();
    const { prefixCls: preCls, direction } = toRefs(useConfigInject());
    const prefixCls = computed(() => preCls.value + '-checkbox');
    const checkboxGroup = inject(CheckboxGroupContextKey, undefined);
    const uniId = Symbol('checkboxUniId');

    watchEffect(() => {
      if (!props.skipGroup && checkboxGroup) {
        checkboxGroup.registerValue(uniId, props.value);
      }
    });
    onBeforeUnmount(() => {
      if (checkboxGroup) {
        checkboxGroup.cancelValue(uniId);
      }
    });
    onMounted(() => {
      warning(
        props.checked !== undefined || checkboxGroup || props.value === undefined,
        'Checkbox',
        '`value` is not validate prop, do you mean `checked`?',
      );
    });

    const handleChange = (event: RadioChangeEvent) => {
      const targetChecked = event.target.checked;
      emit('update:checked', targetChecked);
      emit('change', event);
    };
    const checkboxRef = ref();
    const focus = () => {
      checkboxRef.value?.focus();
    };
    const blur = () => {
      checkboxRef.value?.blur();
    };
    expose({
      focus,
      blur,
    });
    return () => {
      const children = flattenChildren(slots.default?.());
      const { indeterminate, skipGroup, id = '', onClick, ...restProps } = props;
      const { onMouseenter, onMouseleave, onInput, class: className, style, ...restAttrs } = attrs;
      const checkboxProps: CheckboxProps = {
        ...restProps,
        id,
        prefixCls: prefixCls.value,
        ...restAttrs,
      };
      if (checkboxGroup && !skipGroup) {
        checkboxProps.onChange = (...args) => {
          emit('change', ...args);
          checkboxGroup.toggleOption({ label: children, value: props.value });
        };
        checkboxProps.name = checkboxGroup.name.value;
        checkboxProps.checked = checkboxGroup.mergedValue.value.indexOf(props.value) !== -1;
        checkboxProps.disabled = props.disabled || checkboxGroup.disabled.value;
        checkboxProps.indeterminate = indeterminate;
      } else {
        checkboxProps.onChange = handleChange;
      }
      const classString = classNames(
        {
          [`${prefixCls.value}-wrapper`]: true,
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
          [`${prefixCls.value}-wrapper-checked`]: checkboxProps.checked,
          [`${prefixCls.value}-wrapper-disabled`]: checkboxProps.disabled,
        },
        className,
      );
      const checkboxClass = classNames({
        [`${prefixCls.value}-indeterminate`]: indeterminate,
      });
      return (
        <label
          class={classString}
          style={style}
          onMouseenter={onMouseenter as EventHandler}
          onMouseleave={onMouseleave as EventHandler}
          onClick={onClick}
        >
          <VcCheckbox {...checkboxProps} class={checkboxClass} ref={checkboxRef} />
          {children.length ? <span>{children}</span> : null}
        </label>
      );
    };
  },
});
