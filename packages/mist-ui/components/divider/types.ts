import { CSSProperties, ExtractPropTypes, PropType } from 'vue';

export type OrientationType = 'left' | 'center' | 'right';

export type DividerType = 'horizontal' | 'vertical';

export const dividerProps = {
  dashed: {
    type: Boolean,
    default: false,
  },
  orientation: {
    type: String as PropType<OrientationType>,
    default: 'center',
  },
  orientationMargin: {
    type: [String, Number],
    default: undefined,
  },
  plain: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<DividerType>,
    default: 'horizontal',
  },
};

export type DividerProps = ExtractPropTypes<typeof dividerProps>;
