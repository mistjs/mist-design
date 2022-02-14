import { ExtractPropTypes, PropType } from "vue";

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
    type: Object as PropType<Window | HTMLElement | null>,
    default: null,
  },
};

export type AffixProps = ExtractPropTypes<typeof affixProps>;
