import {
  CSSProperties,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  ref,
  VNode,
  watch,
  withDirectives,
} from 'vue';
import { textareaProps } from './inputProps';
import calculateNodeHeight from './calculateNodeHeight';
import raf from '../_utils/wave/raf';
import { omit } from 'lodash';
import classnames from '../_utils/tools/classnames';
import mistInput from '../_utils/tools/mistInputDirective';
import { useElementBounding, useResizeObserver } from '@vueuse/core';
const RESIZE_STATUS_NONE = 0;
const RESIZE_STATUS_RESIZING = 1;
const RESIZE_STATUS_RESIZED = 2;
export default defineComponent({
  name: 'ResizeableTextArea',
  inheritAttrs: false,
  props: textareaProps,
  setup(props, { attrs, emit, expose }) {
    let nextFrameActionId: any;
    let resizeFrameId: any;
    const textAreaRef = ref();
    const textareaStyle = ref({});
    const resizeStatus = ref(RESIZE_STATUS_NONE);
    // 获取数据
    // https://github.com/ant-design/ant-design/issues/21870
    const fixFirefoxAutoScroll = () => {
      try {
        if (document.activeElement === textAreaRef.value) {
          const currentStart = textAreaRef.value.selectionStart;
          const currentEnd = textAreaRef.value.selectionEnd;
          textAreaRef.value.setSelectionRange(currentStart, currentEnd);
        }
      } catch (e) {
        // Fix error in Chrome:
        // Failed to read the 'selectionStart' property from 'HTMLInputElement'
        // http://stackoverflow.com/q/21177489/3040605
      }
    };

    const resizeTextarea = () => {
      const autoSize = props.autoSize;
      if (!autoSize || !textAreaRef.value) {
        return;
      }
      const { minRows, maxRows } = autoSize;
      textareaStyle.value = calculateNodeHeight(textAreaRef.value, false, minRows, maxRows);
      resizeStatus.value = RESIZE_STATUS_RESIZING;
      raf.cancel(resizeFrameId);
      resizeFrameId = raf(() => {
        resizeStatus.value = RESIZE_STATUS_RESIZED;
        resizeFrameId = raf(() => {
          resizeStatus.value = RESIZE_STATUS_NONE;
          fixFirefoxAutoScroll();
        });
      });
    };
    const resizeOnNextFrame = () => {
      raf.cancel(nextFrameActionId);
      nextFrameActionId = raf(resizeTextarea);
    };
    const handleResize = (size: { width: number; height: number }) => {
      if (resizeStatus.value !== RESIZE_STATUS_NONE) {
        return;
      }
      emit('resize', size);
      const autoSize = props.autoSize || props.autoSize;
      if (autoSize) {
        resizeOnNextFrame();
      }
    };

    const renderTextArea = () => {
      const { prefixCls, disabled } = props;
      const otherProps = omit(props, [
        'prefixCls',
        'onPressEnter',
        'autoSize',
        'autosize',
        'defaultValue',
        'allowClear',
        'type',
        'lazy',
        'maxlength',
      ]);
      // TextArea
      const cls = classnames(prefixCls, attrs.class, {
        [`${prefixCls}-disabled`]: disabled,
      });
      const style = {
        ...(attrs.style as CSSProperties),
        ...textareaStyle.value,
        ...(resizeStatus.value === RESIZE_STATUS_RESIZING
          ? { overflowX: 'hidden', overflowY: 'hidden' }
          : null),
      };
      const textareaProps: any = {
        ...otherProps,
        ...attrs,
        style,
        class: cls,
      };
      if (!textareaProps.autofocus) {
        delete textareaProps.autofocus;
      }
      nextTick(() => {
        if (!props.autoSize) {
          useResizeObserver(textAreaRef, onResize);
        }
      });
      return withDirectives((<textarea {...textareaProps} ref={textAreaRef} />) as VNode, [
        [mistInput],
      ]);
    };
    const onResize = () => {
      const { width, height } = useElementBounding(textAreaRef);
      handleResize({ width: width.value, height: height.value });
    };
    if (props.autoSize) {
      onResize();
    }
    onBeforeUnmount(() => {
      if (nextFrameActionId) {
        raf.cancel(nextFrameActionId);
      }
      if (resizeFrameId) {
        raf.cancel(resizeFrameId);
      }
    });
    watch(
      () => props.value,
      () => {
        nextTick(() => {
          resizeTextarea();
        });
      },
    );
    const instance = getCurrentInstance();
    expose({
      resizeTextarea,
      textArea: textAreaRef,
      instance,
    });
    return () => {
      return renderTextArea();
    };
  },
});
