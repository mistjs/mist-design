import type { ExtractPropTypes, PropType, VNode } from "vue";

export type ButtonSize = "small" | "middle" | "larger";

export type ButtonShape = "default" | "circle" | "round";

export type ButtonType =
  | "primary"
  | "ghost"
  | "dashed"
  | "link"
  | "text"
  | "default";

export const buttonProps = {
  size: {
    type: String as PropType<ButtonSize>,
    default: "middle",
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
    type: String as PropType<string>,
    default: "button",
  },
  icon: {
    type: Object as PropType<VNode>,
    default: undefined,
  },
  loading: {
    type: [Boolean, Object] as PropType<boolean | { delay: number }>,
    default: false,
  },
  shape: {
    type: String as PropType<ButtonShape>,
    default: "default",
  },
  target: {
    type: String,
    default: undefined,
  },
  type: {
    type: String as PropType<ButtonType>,
    default: "default",
  },
};
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
