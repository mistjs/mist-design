import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { ComponentInternalInstance } from "vue";
import { findDOMNode, isHidden, isNotGrey } from "./hooks/tools";
// @ts-ignore
import raf from "./raf";
// @ts-ignore
import TransitionEvents from "./css-animation/Event";
let styleForPesudo: any;
export default defineComponent({
  name: "ProWave",
  props: ["insertExtraNode"],
  setup(_props, { slots }) {
    const insertExtraNode = computed(() => _props.insertExtraNode);
    let vm: ComponentInternalInstance | null;
    let instance: any;
    const clickWaveTimeoutId = ref();
    const animationStart = ref();
    const animationStartId = ref();
    const extraNode = ref();
    onMounted(() => {
      // 查找节点信息
      vm = getCurrentInstance();
      const node = findDOMNode(vm);
      if (node.nodeType !== 1) {
        return;
      }
      instance = bindAnimationEvent(node);
    });

    onBeforeUnmount(() => {
      // 判断实例是否存在
      if (instance) {
        instance.cancel();
      }
      // 判断定时器是否存在
      if (clickWaveTimeoutId.value) {
        clearTimeout(clickWaveTimeoutId.value);
      }
    });

    const getAttributeName = () => {
      return insertExtraNode.value
        ? "mist-click-animating"
        : "mist-click-animating-without-extra-node";
    };
    const resetEffect = (node: Element) => {
      if (!node || node === extraNode.value || !(node instanceof Element))
        return;
      const attrName = getAttributeName();
      node.setAttribute(attrName, "false");
      if (styleForPesudo) {
        styleForPesudo.innerHTML = "";
      }
      if (
        insertExtraNode.value &&
        extraNode.value &&
        node.contains(extraNode.value)
      ) {
        node.removeChild(extraNode.value);
      }
      TransitionEvents.removeStartEventListener(node, onTransitionStart);
      TransitionEvents.removeEndEventListener(node, onTransitionEnd);
    };

    const effectClick = (node: Element, waveColor: string) => {
      if (!node || isHidden(node) || node.className.indexOf("-leave") >= 0)
        return;
      extraNode.value = document.createElement("div");
      const myExtraNode = extraNode.value;
      myExtraNode.className = "mist-click-animating-node";
      const attrName = getAttributeName();
      node.removeAttribute(attrName);
      node.setAttribute(attrName, "true");
      styleForPesudo = styleForPesudo || document.createElement("style");
      if (
        waveColor &&
        waveColor !== "#ffffff" &&
        waveColor !== "rgb(255,255,255)" &&
        isNotGrey(waveColor) &&
        !/rgba\(\d*,\d*,\d*,0\)/.test(waveColor) &&
        waveColor !== "transparent"
      ) {
        myExtraNode.style.borderColor = waveColor;
        styleForPesudo.innerHTML = `
        [mist-click-animating-without-extra-node='true']::after, .mist-click-animating-node {
          --mist-wave-shadow-color: ${waveColor};
        }`;
        if (!document.body.contains(styleForPesudo)) {
          document.body.appendChild(styleForPesudo);
        }
      }
      if (insertExtraNode.value) {
        node.appendChild(extraNode.value);
      }
      TransitionEvents.addStartEventListener(node, onTransitionStart);
      TransitionEvents.addEndEventListener(node, onTransitionEnd);
    };
    const onTransitionStart = (e: any) => {
      if (vm?.isUnmounted) return;
      const node = findDOMNode(vm);
      if (!e || e.target !== node) return;
      if (!animationStart.value) {
        resetEffect(node);
      }
    };
    const onTransitionEnd = (e: any) => {
      if (!e || e.animationName !== "fadeEffect") return;
      resetEffect(e.target);
    };
    const bindAnimationEvent = (node: Element) => {
      // 判断node节点是否存在
      if (
        !node ||
        !node.getAttribute ||
        node.getAttribute("disabled") ||
        node.className.indexOf("disabled") >= 0
      )
        return;
      // 点击事件
      const onClick = (e: any) => {
        if (e.target.tagName === "INPUT" || isHidden(e)) return;
        // 重置效果
        resetEffect(node);
        // 获取颜色细节
        const waveColor =
          getComputedStyle(node).getPropertyValue("border-top-color") || // Firefox Compatible
          getComputedStyle(node).getPropertyValue("border-color") ||
          getComputedStyle(node).getPropertyValue("background-color");
        clickWaveTimeoutId.value = setTimeout(
          () => effectClick(node, waveColor),
          0
        );
        raf.cancel(animationStartId.value);
        animationStart.value = true;
        animationStartId.value = raf(() => {
          animationStart.value = false;
        }, 10);
      };
      // 事件监听
      node.addEventListener("click", onClick, true);
      return {
        cancel: () => {
          // 移除事件监听
          node.removeEventListener("click", onClick, true);
        },
      };
    };

    return () => {
      return slots.default && slots.default();
    };
  },
});
