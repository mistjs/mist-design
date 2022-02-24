import type { CSSProperties, DefineComponent, ExtractPropTypes, PropType, VNode } from 'vue';
import { PropsVNode } from '../_utils/tools/props-util';

export type ButtonSize = 'small' | 'middle' | 'larger';

export type ButtonShape = 'default' | 'circle' | 'round';

export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export type ButtonLoading = number | boolean;

export type ButtonIconType = VNode | DefineComponent;

export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';

export const buttonProps = {
  size: {
    type: String as PropType<ButtonSize>,
    default: 'middle',
  },
  // 将按钮宽度调整为父宽度的选项
  block: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  danger: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  ghost: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  href: {
    type: String as PropType<string>,
    default: undefined,
  },
  // 原生html标签中的button
  htmlType: {
    type: String as PropType<ButtonHTMLType>,
    default: 'button',
  },
  icon: {
    type: [Object, Function] as PropType<PropsVNode>,
    default: undefined,
  },
  loading: {
    type: [Boolean, Object] as PropType<boolean | { delay: number }>,
    default: false,
  },
  shape: {
    type: String as PropType<ButtonShape>,
    default: 'default',
  },
  target: {
    type: String,
    default: undefined,
  },
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
};
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export const buttonGroupProps = {
  size: {
    type: String as PropType<ButtonSize>,
    default: 'middle',
  },
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  className: {
    type: String,
    default: undefined,
  },
};

export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>;
