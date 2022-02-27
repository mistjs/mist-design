import { ExtractPropTypes, PropType } from 'vue';
import { inputNumberProps as vcInputNumberProps } from './src/InputNumber';
import { PropsVNode } from '../_utils/tools/props-util';
import { SizeType } from '../config-provider';

const inputNumberProps = {
  ...vcInputNumberProps,
  addonBefore: {
    type: [Object, Function] as PropType<PropsVNode>,
    default: undefined,
  },
  addonAfter: {
    type: [Object, Function] as PropType<PropsVNode>,
    default: undefined,
  },
  prefix: {
    type: [Object, Function] as PropType<PropsVNode>,
    default: undefined,
  },
  size: {
    type: String as PropType<SizeType>,
    default: undefined,
  },
  bordered: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
};

export type InputNumberProps = Partial<ExtractPropTypes<typeof inputNumberProps>>;

export default inputNumberProps;
