import { ExtractPropTypes, PropType } from 'vue';

export const affixProps = {
  offsetTop: {
    type: Number,
    default: 0,
  },
  offsetBottom: {
    type: Number,
    default: undefined,
  },
  target: {
    type: Function as PropType<() => Window | HTMLElement | null>,
    default: undefined,
  },
};

export type AffixProps = ExtractPropTypes<typeof affixProps>;
