import { computed, CSSProperties, defineComponent, shallowRef, toRefs } from 'vue';
import { useConfigInject } from '../config-provider';
import { spaceProps, SpaceSize } from './types';
import Item from './item';
import { detectFlexGapSupported } from '../_utils/tools/styleCheck';
import { flattenChildren } from '../_utils/tools';
import { useSpaceProvide } from './context';
const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};
function getNumberSize(size: SpaceSize) {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}
export default defineComponent({
  name: 'MSpace',
  props: spaceProps,
  setup(props, { attrs, slots }) {
    const { prefixCls, direction: directionConfig } = toRefs(useConfigInject());
    // 判断当前是否支持flex布局
    const supportFlexGap = shallowRef(false);
    supportFlexGap.value = detectFlexGapSupported();
    const spaceSize = computed(() => {
      const sizeArr: [SpaceSize, SpaceSize] = Array.isArray(props.size)
        ? props.size
        : [props.size, props.size];
      const horizontalSize = shallowRef(0);
      const verticalSize = shallowRef(0);
      horizontalSize.value = getNumberSize(sizeArr[0]);
      verticalSize.value = getNumberSize(sizeArr[1]);
      return { horizontalSize, verticalSize };
    });
    const itemClassName = `${prefixCls.value}-space-item`;
    const marginDirection = directionConfig.value === 'rtl' ? 'marginLeft' : 'marginRight';
    const latestIndex = shallowRef(0);
    const childrenNodes = flattenChildren(slots.default?.() || []);
    const nodes = childrenNodes.map((child, i) => {
      if (child !== null && child !== undefined) {
        latestIndex.value = i;
      }
      return (
        <Item
          className={itemClassName}
          key={`${itemClassName}-${i}`}
          direction={props.direction}
          index={i}
          marginDirection={marginDirection}
          split={props.split}
          wrap={props.wrap}
        >
          {child}
        </Item>
      );
    });

    // 依赖注入
    useSpaceProvide({
      latestIndex,
      horizontalSize: spaceSize.value.horizontalSize,
      verticalSize: spaceSize.value.verticalSize,
      supportFlexGap,
    });
    const classes = computed(() => {
      const pre = prefixCls.value + '-space';
      const { align, direction } = props;
      const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;
      return {
        [`${pre}`]: true,
        [`${pre}-${direction}`]: !!direction,
        [`${pre}-rtl`]: directionConfig.value === 'rtl',
        [`${pre}-align-${mergedAlign}`]: mergedAlign,
      };
    });
    const gapStyle = computed<CSSProperties>(() => {
      const { wrap } = props;
      const gapStyle: CSSProperties = {};
      const { horizontalSize, verticalSize } = spaceSize.value;
      if (wrap) {
        gapStyle.flexWrap = 'wrap';
        if (!supportFlexGap.value) {
          gapStyle.marginBottom = `-${horizontalSize.value}px`;
        }
      }
      if (supportFlexGap.value) {
        gapStyle.columnGap = `${horizontalSize.value}px`;
        gapStyle.rowGap = `${verticalSize.value}px`;
      }
      return gapStyle;
    });
    return () => {
      if (childrenNodes.length < 1) return null;
      return (
        <div class={classes.value} style={gapStyle.value} {...attrs}>
          {nodes}
        </div>
      );
    };
  },
});
