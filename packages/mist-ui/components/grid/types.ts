import { ExtractPropTypes, PropType } from 'vue';
import { Breakpoint } from '../_utils/tools/responsiveObserve';
export type ColSpanType = number | string;

export type FlexType = number | 'none' | 'auto' | string;

export interface ColSize {
  flex?: FlexType;
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
}
export const colProps = {
  flex: {
    type: [String, Number] as PropType<FlexType>,
    default: undefined,
  },
  offset: {
    type: Number as PropType<ColSpanType>,
    default: 0,
  },
  order: {
    type: Number as PropType<ColSpanType>,
    default: 0,
  },
  pull: {
    type: Number as PropType<ColSpanType>,
    default: 0,
  },
  push: {
    type: Number as PropType<ColSpanType>,
    default: 0,
  },
  span: {
    type: Number as PropType<ColSpanType>,
    default: undefined,
  },
  xs: {
    type: [Number, Object] as PropType<ColSize | ColSpanType>,
    default: undefined,
  },
  sm: {
    type: [Number, Object] as PropType<ColSize | ColSpanType>,
    default: undefined,
  },
  md: {
    type: [Number, Object] as PropType<ColSize | ColSpanType>,
    default: undefined,
  },
  lg: {
    type: [Number, Object] as PropType<ColSize | ColSpanType>,
    default: undefined,
  },
  xl: {
    type: [Number, Object] as PropType<ColSize | ColSpanType>,
    default: undefined,
  },
  xxl: {
    type: [Number, Object] as PropType<ColSize | ColSpanType>,
    default: undefined,
  },
};

export type ColProps = ExtractPropTypes<typeof colProps>;

export type AlignType = 'top' | 'middle' | 'bottom' | 'stretch';
export type Gutter = number | Partial<Record<Breakpoint, number>>;

export type JustifyType = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export const rowProps = {
  align: {
    type: String as PropType<AlignType>,
    default: undefined,
  },
  gutter: {
    type: [Number, Array, Object] as PropType<Gutter | [Gutter, Gutter]>,
    default: 0,
  },
  justify: {
    type: String as PropType<any>,
    default: undefined,
  },
  wrap: {
    type: Boolean,
    default: undefined,
  },
};

export type RowProps = ExtractPropTypes<typeof rowProps>;
