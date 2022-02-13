import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  ref,
  VNode,
  watch,
  Text,
  toRefs,
} from "vue";
import Wave from "../_utils/wave";
import { useConfigInject } from "../config-provider";
import { ButtonLoading, buttonProps, ButtonType } from "./types";
import LoadingOutlined from "@mist-desgin/icons/LoadingOutlined";
import { flattenChildren, getPropsSlot } from "../_utils/tools";

// 判断当前的类型是不是text和link
function isUnborderedButtonType(type: ButtonType | undefined) {
  return type === "text" || type === "link";
}

// 写入空格
function insertSpace(child: VNode, needInserted: boolean) {
  const SPACE = needInserted ? " " : "";
  if (child.type === Text) {
    let text = (child.children as string).trim();
    if (isTwoCNChar(text)) {
      text = text.split("").join(SPACE);
    }
    return <span>{text}</span>;
  }
  return child;
}

// 判断是不是只有两个中文字符
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
export default defineComponent({
  name: "MButton",
  props: buttonProps,
  emits: ["click", "mousedown", "mouseenter"],
  setup(_props, { slots, attrs, emit }) {
    const { prefixCls, direction, autoInsertSpaceInButton } = toRefs(
      useConfigInject()
    );
    const children = flattenChildren(getPropsSlot(slots, _props));
    const icon = getPropsSlot(slots, _props, "icon");
    const hasTwoCNChar = ref<boolean>(false);
    const innerLoading = ref<boolean | number>(false);
    const delayTimer = ref<number | null>(null);
    const loadingOrDelay = computed<ButtonLoading>(() =>
      typeof _props.loading === "object" && _props.loading.delay
        ? _props.loading.delay || true
        : !!_props.loading
    );
    const iconType = computed(() => (innerLoading.value ? "loading" : icon));
    const isNeedInserted = computed(
      () =>
        children.length === 1 && !icon && !isUnborderedButtonType(_props.type)
    );

    // 监听loading
    watch(
      loadingOrDelay,
      (val) => {
        if (delayTimer.value) {
          clearTimeout(delayTimer.value);
        }
        if (typeof loadingOrDelay.value === "number") {
          delayTimer.value = window.setTimeout(() => {
            innerLoading.value = val;
          }, loadingOrDelay.value);
        } else {
          innerLoading.value = val;
        }
      },
      {
        immediate: true,
      }
    );

    onBeforeUnmount(() => {
      delayTimer.value && window.clearTimeout(delayTimer.value);
    });

    // 定义所有的类型信息
    const classes = computed(() => {
      const { type, shape, size, ghost, block, danger } = _props;
      const pre = prefixCls.value + "-btn";
      const sizeClassNameMap = { large: "lg", small: "sm", middle: undefined };
      const sizeCls = size ? sizeClassNameMap[size] || "" : "";
      return {
        [`${pre}`]: true,
        [`${pre}-${type}`]: type,
        [`${pre}-${shape}`]: shape !== "default" && shape,
        [`${pre}-${sizeCls}`]: sizeCls,
        [`${pre}-icon-only`]: children.length === 0 && !!iconType.value,
        [`${pre}-background-ghost`]: ghost && !isUnborderedButtonType(type),
        [`${pre}-loading`]: innerLoading.value,
        [`${pre}-two-chinese-chars`]:
          hasTwoCNChar.value && autoInsertSpaceInButton.value,
        [`${pre}-block`]: block,
        [`${pre}-dangerous`]: !!danger,
        [`${pre}-rtl`]: direction.value === "rtl",
      };
    });

    const handleClick = (event: Event) => {
      // https://github.com/ant-design/ant-design/issues/30207
      if (innerLoading.value || _props.disabled) {
        event.preventDefault();
        return;
      }
      emit("click", event);
    };
    const onMouseenter = (event: MouseEvent) => {
      emit("mouseenter", event);
    };
    return () => {
      const iconNode = innerLoading.value ? (
        <LoadingOutlined />
      ) : (
        (typeof icon === "function" && h(icon)) || icon
      );
      const kids = children.map((child) =>
        insertSpace(
          child,
          isNeedInserted.value && autoInsertSpaceInButton.value
        )
      );
      const buttonNode = (
        <button
          {...attrs}
          disabled={_props.disabled}
          onMouseenter={onMouseenter}
          type={_props.htmlType}
          onClick={handleClick}
          class={classes.value}
        >
          {iconNode}
          {kids}
        </button>
      );

      const linkNode = (
        <a class={classes.value} {...attrs} onClick={handleClick}>
          {iconNode}
          {kids}
        </a>
      );
      if (_props.href !== undefined) {
        return linkNode;
      }
      if (isUnborderedButtonType(_props.type)) {
        return buttonNode;
      }
      return <Wave>{buttonNode}</Wave>;
    };
  },
});
