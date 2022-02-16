import {
  computed,
  CSSProperties,
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  shallowRef,
  toRefs,
} from "vue";
import { useConfigInject } from "../config-provider";
import { affixProps } from "./types";
import {
  useEventListener,
  useResizeObserver,
  useThrottleFn,
} from "@vueuse/core";
import { getFixedBottom, getFixedTop, getTargetNode } from "./util";
export default defineComponent({
  name: "MAffix",
  props: affixProps,
  emits: ["change"],
  setup(props, { slots, emit, expose }) {
    // 获取下面定义的根节点的信息
    const placeholderNode = shallowRef<HTMLDivElement>();
    const { prefixCls } = toRefs(useConfigInject());
    const targetNode = shallowRef<Window | HTMLElement>();
    const state = reactive({
      timeout: null,
      fixed: false,
      height: null,
      width: null,
      top: null,
      bottom: null,
    });
    // 定义类型
    const classes = computed<CSSProperties>(() => {
      const pre = prefixCls.value + "-affix";
      return {
        [`${pre}`]: state.fixed,
      };
    });

    // 定义固定标签的样式
    const affixStyle = computed<CSSProperties | undefined>(() => {
      if (state.fixed) {
        return {
          height: state.height,
          width: state.width,
          top: state.top,
          bottom: state.bottom,
        };
      }
      return undefined;
    });

    // 定义另一个的样式
    const placeholderStyle = computed<CSSProperties | undefined>(() => {
      if (state.fixed) {
        return {
          height: state.height,
          width: state.width,
        };
      }
      return undefined;
    });

    const measure = () => {
      // TODO
      if (!placeholderNode.value || !targetNode.value) {
        return;
      }

      const targetRect = getTargetNode(targetNode);
      const placeholderRect = getTargetNode(placeholderNode);
      const fixedTop =
        props.offsetBottom !== undefined
          ? undefined
          : getFixedTop(placeholderRect, targetRect, props.offsetTop);
      const fixedBottom = getFixedBottom(
        placeholderRect,
        targetRect,
        props.offsetBottom
      );
      if (!fixedTop && !fixedBottom) {
        if (state.fixed) {
          emit("change", !state.fixed);
        }
        state.fixed = false;
        state.top = null;
        state.bottom = null;
        return;
      }
      if (!state.fixed) {
        emit("change", !state.fixed);
      }
      state.fixed = true;

      state.height = `${placeholderRect.height}px`;
      state.width = `${placeholderRect.width}px`;
      if (fixedTop) {
        state.top = fixedTop;
      } else {
        state.bottom = fixedBottom;
      }
    };

    const updatePosition = measure;

    const onScroll = useThrottleFn(() => measure(), 10);

    onUpdated(() => {
      updatePosition();
    });

    // 处理定义的target
    onMounted(() => {
      if (props.target) {
        targetNode.value = props.target();
      } else {
        targetNode.value = window;
      }
      state.timeout = setTimeout(() => {
        // 开启监听模式
        useEventListener(targetNode, "scroll", onScroll);
        useResizeObserver(document.documentElement, updatePosition);
        useResizeObserver(placeholderNode, updatePosition);
        // 第一次加载更新位置
        updatePosition();
      });
    });

    onUnmounted(() => {
      // 注销定时器
      if (state.timeout) {
        clearTimeout(state.timeout);
      }
    });

    expose({
      updatePosition,
    });
    return () => {
      return (
        <div ref={placeholderNode} style={placeholderStyle.value}>
          <div class={classes.value} style={affixStyle.value}>
            {slots.default?.()}
          </div>
        </div>
      );
    };
  },
});
