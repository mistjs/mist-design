import type { Ref } from 'vue';
import type { DirectionType, SizeType } from '../config-provider';

export function getInputClassName(
  prefixCls: Ref<string>,
  bordered: boolean,
  size?: SizeType,
  disabled?: boolean,
  direction?: DirectionType,
) {
  const pre = prefixCls.value + '-input';
  return {
    [`${pre}`]: true,
    [`${pre}-sm`]: size === 'small',
    [`${pre}-lg`]: size === 'large',
    [`${pre}-disabled`]: disabled,
    [`${pre}-rtl`]: direction === 'rtl',
    [`${pre}-borderless`]: !bordered,
  };
}

export function hasPrefixSuffix() {
  return false;
}
