import { computed, CSSProperties, defineComponent, PropType, VNode } from 'vue';
import { SpaceDirection } from './types';
import { useSpaceInject } from './context';
type MarginDirectionType = 'marginLeft' | 'marginRight';
const itemProps = {
  index: {
    type: Number,
    default: undefined,
  },
  direction: {
    type: String as PropType<SpaceDirection>,
    default: undefined,
  },
  marginDirection: {
    type: String as PropType<MarginDirectionType>,
    default: undefined,
  },
  split: {
    type: Object as PropType<VNode>,
    default: undefined,
  },
  wrap: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  className: {
    type: String,
    default: '',
  },
};
export default defineComponent({
  name: 'Item',
  props: itemProps,
  setup(props, { slots }) {
    const { supportFlexGap, horizontalSize, verticalSize, latestIndex } = useSpaceInject();
    const style = computed<CSSProperties>(() => {
      const { direction, split, index, marginDirection, wrap } = props;
      let style: CSSProperties = {};
      if (!supportFlexGap.value) {
        if (direction === 'vertical') {
          if (index < latestIndex.value) {
            style = {
              marginBottom: `${horizontalSize.value / (split ? 2 : 1)}px`,
            };
          }
        } else {
          style = {
            ...(index < latestIndex.value && {
              [marginDirection]: `${horizontalSize.value / (split ? 2 : 1)}px`,
            }),
            ...(wrap && { paddingBottom: verticalSize.value }),
          };
        }
      }
      return style;
    });
    return () => {
      if (slots && Object.keys(slots).length < 1) return null;
      return (
        <>
          <div class={props.className} style={style.value}>
            {slots.default?.()}
          </div>
          {props.index < latestIndex.value && props.split && (
            <span class={props.className}>{props.split}</span>
          )}
        </>
      );
    };
  },
});
