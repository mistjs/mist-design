import type { Ref } from 'vue';
import type { DirectionType, SizeType } from '../config-provider';
import { InputProps } from '../input';
import { ClearableLabeledInputProps } from './clearableLabeledInput';

export function getInputClassName(
  prefixCls: Ref<string>,
  bordered: boolean,
  size?: SizeType,
  disabled?: boolean,
  direction?: DirectionType,
) {
  const pre = prefixCls.value.endsWith('input') ? prefixCls.value : prefixCls.value + '-input';
  return {
    [`${pre}`]: true,
    [`${pre}-sm`]: size === 'small',
    [`${pre}-lg`]: size === 'large',
    [`${pre}-disabled`]: disabled,
    [`${pre}-rtl`]: direction === 'rtl',
    [`${pre}-borderless`]: !bordered,
  };
}

export function hasPrefixSuffix(props: InputProps | ClearableLabeledInputProps) {
  return !!(props.prefix || props.suffix || props.allowClear);
}
