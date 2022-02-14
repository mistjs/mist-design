import { computed, defineComponent } from "vue";
import { buttonGroupProps } from "./types";
import { useConfigInject } from "../config-provider";
import UnreachableException from "../_utils/tools/unreachableException";
export default defineComponent({
  name: "MButtonGroup",
  props: buttonGroupProps,
  setup(props, { slots }) {
    const classes = computed(() => {
      const { prefixCls, direction } = useConfigInject();
      const { size, className } = props;
      const pre = prefixCls + "-btn-group";
      let sizeCls = "";
      switch (size) {
        case "larger":
          sizeCls = "lg";
          break;
        case "small":
          sizeCls = "sm";
          break;
        case "middle":
        case undefined:
          break;
        default:
          console.warn(new UnreachableException(size).error);
      }
      return [
        {
          [`${pre}`]: true,
          [`${pre}-${sizeCls}`]: sizeCls,
          [`${pre}-rtl`]: direction === "rtl",
        },
        className,
      ];
    });
    return () => {
      return (
        <>
          <div class={classes.value}>{slots.default && slots.default()}</div>
        </>
      );
    };
  },
});
