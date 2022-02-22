import { ExtractPropTypes, PropType, VNode } from 'vue';
import type { SizeType } from '../config-provider';
export type SpaceAlignType = 'start' | 'end' | 'center' | 'baseline';
export type SpaceDirection = 'vertical' | 'horizontal';
export type SpaceSize = SizeType | number;
export const spaceProps = {
  align: {
    type: String as PropType<SpaceAlignType>,
    default: undefined,
  },
  direction: {
    type: String as PropType<SpaceDirection>,
    default: 'horizontal',
  },
  size: {
    type: [String, Array] as PropType<SpaceSize | [SpaceSize, SpaceSize]>,
    default: 'small',
  },
  split: {
    type: Object as PropType<VNode>,
    default: undefined,
  },
  wrap: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
};

export type SpaceProps = ExtractPropTypes<typeof spaceProps>;
