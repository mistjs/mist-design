import type { ExtractPropTypes, PropType, VNode } from 'vue';
import { LiteralUnion } from '../_utils/type';
import { omit } from 'lodash';
import { SizeType } from '../config-provider';
type InputType = LiteralUnion<
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week',
  string
>;
export interface ShowCountProps {
  formatter: (args: { count: number; maxlength?: number }) => string | VNode;
}
export const inputProps = {
  id: {
    type: String,
    default: undefined,
  },
  defaultValue: {
    type: [String, Number],
    default: undefined,
  },
  value: {
    type: [String, Number, Symbol] as PropType<string | number>,
    default: undefined,
  },
  placeholder: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  autocomplete: {
    type: String,
    default: undefined,
  },
  type: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  size: {
    type: String as PropType<SizeType>,
    default: undefined,
  },
  name: {
    type: String,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
  readonly: {
    type: Boolean,
    default: undefined,
  },
  addonBefore: {
    type: [String, Object] as PropType<string | VNode>,
    default: undefined,
  },
  addonAfter: {
    type: [String, Object] as PropType<string | VNode>,
    default: undefined,
  },
  allowClear: {
    type: Boolean,
    default: undefined,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  prefix: {
    type: [String, Object] as PropType<string | VNode>,
    default: undefined,
  },
  suffix: {
    type: [String, Object] as PropType<string | VNode>,
    default: undefined,
  },
  maxLength: {
    type: Number as PropType<number>,
    default: undefined,
  },
  htmlSize: {
    type: Number,
    default: undefined,
  },
  loading: {
    type: Boolean,
    default: undefined,
  },
  onPressEnter: {
    type: Function,
    default: undefined,
  },
  onKeydown: {
    type: Function,
    default: undefined,
  },
  onKeyup: {
    type: Function,
    default: undefined,
  },
  onFocus: {
    type: Function,
    default: undefined,
  },
  onBlur: {
    type: Function,
    default: undefined,
  },
  onChange: {
    type: Function,
    default: undefined,
  },
  onInput: {
    type: Function,
    default: undefined,
  },
};

export type InputProps = Partial<ExtractPropTypes<typeof inputProps>>;

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}
export const textAreaProps = {
  ...omit(inputProps, ['prefix', 'addonBefore', 'allowClear', 'suffix']),
  showCount: {
    type: [Boolean, Function] as PropType<boolean | ShowCountProps>,
  },
  autosize: {
    type: [Boolean, Object] as PropType<AutoSizeType>,
    default: undefined,
  },
  autoSize: {
    type: [Boolean, Object] as PropType<AutoSizeType>,
    default: undefined,
  },
  onResize: {
    type: Function as PropType<(size: { width: number; height: number }) => void>,
  },
  onCompositionstart: {
    type: Function,
    default: undefined,
  },
  onCompositionend: {
    type: Function,
    default: undefined,
  },
};

export type TextAreaProps = Partial<ExtractPropTypes<typeof textAreaProps>>;
