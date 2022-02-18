import {
  computed,
  CSSProperties,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  shallowRef,
  toRef,
  toRefs,
} from "vue";
import { Gutter, rowProps } from "./types";
import { useConfigInject } from "../config-provider";
import ResponsiveObserve, {
  Breakpoint,
  responsiveArray,
  ScreenMap,
} from "../_utils/tools/responsiveObserve";
import { detectFlexGapSupported } from "../_utils/tools/styleCheck";
import useProvideRow from "./rowContext";
import { omit } from "lodash";
export default defineComponent({
  name: "MRow",
  props: rowProps,
  setup(props, { slots, attrs }) {
    const { direction, prefixCls } = toRefs(useConfigInject());
    const token = shallowRef<any>();
    const gutterRef = shallowRef<Gutter | [Gutter, Gutter]>(props.gutter);
    const screens = reactive<ScreenMap>({
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true,
      xxl: true,
    });
    onMounted(() => {
      token.value = ResponsiveObserve.subscribe((screen) => {
        const currentGutter = gutterRef.value || 0;
        if (
          (!Array.isArray(currentGutter) &&
            typeof currentGutter === "object") ||
          (Array.isArray(currentGutter) &&
            typeof currentGutter[0] === "object") ||
          typeof currentGutter[1] === "object"
        ) {
          Object.assign(screens, screen);
        }
      });
    });

    onUnmounted(() => {
      ResponsiveObserve.unsubscribe(token.value);
    });

    const getGutter = (): [number, number] => {
      const results: [number, number] = [0, 0];
      const normalizedGutter = Array.isArray(props.gutter)
        ? props.gutter
        : [props.gutter, 0];
      normalizedGutter.forEach((g, index) => {
        if (typeof g === "object") {
          for (let i = 0; i < responsiveArray.length; i++) {
            const breakpoint: Breakpoint = responsiveArray[i];
            if (screens[breakpoint] && g[breakpoint] !== undefined) {
              results[index] = g[breakpoint] as number;
              break;
            }
          }
        } else {
          results[index] = g || 0;
        }
      });
      return results;
    };

    const supportFlexGap = computed(() => detectFlexGapSupported());
    const classes = computed<CSSProperties>(() => {
      const pre = prefixCls.value + "-row";
      const { wrap, justify, align } = props;
      return {
        [`${pre}`]: true,
        [`${pre}-no-wrap`]: wrap === false,
        [`${pre}-${justify}`]: justify,
        [`${pre}-${align}`]: align,
        [`${pre}-rtl`]: direction.value === "rtl",
      };
    });

    const rowStyle = computed<CSSProperties>(() => {
      const gutters = getGutter();
      const horizontalGutter = gutters[0] > 0 ? gutters[0] / -2 : undefined;
      const verticalGutter = gutters[1] > 0 ? gutters[1] / -2 : undefined;
      const rowStyle: CSSProperties = {};
      if (horizontalGutter) {
        rowStyle.marginLeft = horizontalGutter
          ? `${horizontalGutter}px`
          : undefined;
        rowStyle.marginRight = horizontalGutter
          ? `${horizontalGutter}px`
          : undefined;
      }
      if (supportFlexGap.value) {
        rowStyle.rowGap = gutters[1] + "px";
      } else {
        rowStyle.marginTop = verticalGutter ? `${verticalGutter}px` : undefined;
        rowStyle.marginBottom = verticalGutter
          ? `${verticalGutter}px`
          : undefined;
      }
      return rowStyle;
    });
    useProvideRow({
      gutter: computed(() => getGutter()),
      wrap: toRef(props, "wrap"),
      supportFlexGap,
    });
    const attrs1 = omit(attrs, ["class"]);

    return () => {
      return (
        <div style={rowStyle.value} class={classes.value} {...attrs1}>
          {slots?.default()}
        </div>
      );
    };
  },
});
