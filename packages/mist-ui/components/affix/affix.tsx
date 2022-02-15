import {
  computed,
  CSSProperties,
  defineComponent,
  onMounted,
  reactive,
  shallowRef,
  toRefs,
} from "vue";
import { affixProps } from "./types";
import { useConfigInject } from "../config-provider";
import { useEventListener, useResizeObserver } from "@vueuse/core";
export default defineComponent({
  name: "MAffix",
  props: affixProps,
  emits: ["change"],
  setup(props, { slots, emit, expose }) {
    const { prefixCls } = toRefs(useConfigInject());
    const myTarget = shallowRef<HTMLElement | Window>();
    const root = shallowRef<HTMLDivElement>(null);
    const state = reactive({
      height: null,
      width: null,
      scrollTop: null,
      clientHeight: null,
      fixed: false,
      oldFixed: false,
    });

    const onScroll = () => {
      // 开始触发滚动事件
      update();
      if (state.fixed !== state.oldFixed) {
        state.oldFixed = state.fixed;
        emit("change", state.fixed);
      }
    };

    const rootStyle = computed<CSSProperties | undefined>(() => {
      if (!root.value) return;
      return {
        height: state.fixed ? `${state.height}px` : "",
        width: state.fixed ? `${state.width}px` : "",
      };
    });

    // 设置指定的高度
    const affixStyle = computed<CSSProperties | undefined>(() => {
      if (!state.fixed) return;
      const offsetTop = getOffsetTop();
      const offsetBottom = getOffsetBottom();
      return {
        height: `${state.height}px`,
        width: `${state.width}px`,
        top: props.offsetBottom !== undefined ? "" : `${offsetTop}px`,
        bottom: props.offsetBottom !== undefined ? `${offsetBottom}px` : "",
      };
    });

    // 获取滚动高度
    const getScrollTop = () => {
      if (!myTarget.value) return 0;
      if (myTarget.value instanceof Window) {
        return document.documentElement.scrollTop;
      } else {
        return myTarget.value.scrollTop || 0;
      }
    };

    // 拿到距离顶部的高度
    const getOffsetTop = () => {
      if (myTarget.value instanceof Window) {
        return props.offsetTop;
      } else {
        const { top } = myTarget.value.getBoundingClientRect();
        return props.offsetTop + top;
      }
    };

    // 获取距离底部的距离
    const getOffsetBottom = () => {
      if (myTarget.value instanceof Window) {
        return props.offsetBottom;
      } else {
        const { bottom } = root.value.getBoundingClientRect();
        return bottom + props.offsetBottom;
      }
    };

    // 更新数据
    const update = () => {
      // 如果传入的值为空就不需要操作
      if (!root.value || !myTarget.value) return;
      const rootRect = root.value.getBoundingClientRect();
      state.height = rootRect.height;
      state.width = rootRect.width;
      state.scrollTop = getScrollTop();
      state.clientHeight = document.documentElement.clientHeight;
      // 判断是否存在距离底部的值
      const offsetTop = getOffsetTop();
      const offsetBottom = getOffsetBottom();
      if (props.offsetBottom !== undefined) {
        if (myTarget.value instanceof Window) {
          state.fixed = state.clientHeight - offsetTop < rootRect.bottom;
        } else {
          const targetRect = myTarget.value.getBoundingClientRect();
          // 判断是否在可视区域范围内
          state.fixed =
            targetRect.bottom < offsetBottom &&
            state.clientHeight > targetRect.top;
        }
        // 存在就有限选择距离底部的信息
      } else {
        // 处理距离顶部的信息
        state.fixed = offsetTop > rootRect.top;
      }
    };

    // 监听挂载数据
    onMounted(() => {
      // 判断target是否存在值
      if (props.target) {
        myTarget.value = props.target();
      } else {
        // 不存在就默认走window
        myTarget.value = window;
      }
      useEventListener(myTarget, "scroll", onScroll);
      useResizeObserver(root, () => update());
      if (myTarget.value instanceof HTMLElement) {
        useResizeObserver(myTarget.value, () => update());
      }
      // onScroll();
    });

    // 生成样式
    const classes = computed(() => {
      const pre = prefixCls.value + "-affix";
      return {
        [`${pre}`]: state.fixed,
      };
    });
    const updatePosition = () => {
      update();
    };
    expose({
      updatePosition,
    });
    return () => {
      return (
        <>
          <div ref={root} style={rootStyle.value}>
            <div style={affixStyle.value} class={classes.value}>
              {slots.default && slots.default()}
            </div>
          </div>
        </>
      );
    };
  },
});
