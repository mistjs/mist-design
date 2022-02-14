import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  Ref,
  toRefs,
} from "vue";
import { affixProps } from "./types";
import { useConfigInject } from "../config-provider";
import { useResizeObserver, useWindowScroll } from "@vueuse/core";
export default defineComponent({
  name: "MAffix",
  props: affixProps,
  setup(props) {
    const { prefixCls } = toRefs(useConfigInject());
    const { target } = toRefs(props);
    const observer = ref<ResizeObserver>(null);
    if (target.value instanceof Window) {
      const { x, y } = useWindowScroll();
    } else {
      // useResizeObserver(target as Ref<HTMLElement>, (entries, observer) => {});
    }
    onMounted(() => {
      // observer.value.observe();
      // if (target.value){
      //
      // }
    });
    onUnmounted(() => {
      // observer.value && observer.value.unobserve();
    });
    const classes = computed(() => {
      const pre = prefixCls.value + "-affix";
      return {
        [`${pre}`]: true,
      };
    });
    return () => {
      return (
        <>
          <div class={classes}>affix</div>
        </>
      );
    };
  },
});
