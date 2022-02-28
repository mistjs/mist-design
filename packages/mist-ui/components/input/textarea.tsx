import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  toRefs,
  watch,
  watchEffect,
} from 'vue';
import { textareaProps } from './inputProps';
import { useConfigInject } from '../config-provider';
import { fixControlledValue, InputFocusOptions, triggerFocus } from './input';
import { FocusEventHandler } from '../_utils/tools/EventInterface';
import ResizeableTextArea from './resizeableTextArea';
import { omit } from 'lodash';
import classNames from '../_utils/tools/classnames';
import ClearableLabeledInput from './clearableLabeledInput';

function fixEmojiLength(value: string, maxLength: number) {
  return [...(value || '')].slice(0, maxLength).join('');
}
export default defineComponent({
  name: 'MTextarea',
  inheritAttrs: false,
  props: textareaProps,
  emits: ['input', 'update:value', 'change', 'pressEnter', 'keydown', 'blur'],
  setup(props, { attrs, expose, emit }) {
    const stateValue = ref<string | number | undefined>(
      props.value === undefined ? props.defaultValue : props.value,
    );
    const resizableTextArea = ref();
    const mergedValue = ref('');
    const { prefixCls, direction, size } = toRefs(useConfigInject());
    const showCount = computed(() => {
      return (props.showCount as any) === '' || props.showCount || false;
    });
    // Max length value
    const hasMaxLength = computed(() => Number(props.maxLength) > 0);
    const compositing = ref(false);
    const instance = getCurrentInstance();
    watch(
      () => props.value,
      () => {
        if ('value' in instance.vnode.props || {}) {
          stateValue.value = props.value ?? '';
        }
      },
    );
    const focus = (option?: InputFocusOptions) => {
      triggerFocus(resizableTextArea.value?.textArea, option);
    };
    const blur = () => {
      resizableTextArea.value?.textArea?.blur();
    };

    const setValue = (value: string | number, callback?: Function) => {
      if (stateValue.value === value) {
        return;
      }
      if (props.value === undefined) {
        stateValue.value = value;
      } else {
        nextTick(() => {
          if (resizableTextArea.value.textArea.value !== mergedValue.value) {
            resizableTextArea.value?.instance.update?.();
          }
        });
      }
      emit('update:value', value);
      nextTick(() => {
        callback && callback();
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        emit('pressEnter', e);
      }
      emit('keydown', e);
    };

    const onBlur: FocusEventHandler = e => {
      emit('blur', e);
      // formItemContext.onFieldBlur();
    };
    const triggerChange = (e: Event) => {
      emit('change', e);
      emit('input', e);
    };
    const handleReset = (e: MouseEvent) => {
      // resolveOnChange(resizableTextArea.value.textArea, e, triggerChange);
      setValue('', () => {
        triggerChange(e);
        focus();
      });
    };

    const handleChange = (e: Event) => {
      const { value, composing } = e.target as any;
      compositing.value = (e as any).isComposing || composing;
      if ((compositing.value && props.lazy) || stateValue.value === value) return;
      let triggerValue = (e.currentTarget as any).value;
      if (hasMaxLength.value) {
        triggerValue = fixEmojiLength(triggerValue, props.maxLength!);
      }
      // resolveOnChange(e.currentTarget as any, e, triggerChange, triggerValue);
      triggerChange(e);
      setValue(triggerValue);
    };

    const renderTextArea = () => {
      const pre = prefixCls.value + '-input';
      const { style, class: customClass } = attrs;
      const { bordered = true } = props;
      const resizeProps = {
        ...omit(props, ['allowClear']),
        ...attrs,
        style: showCount.value ? {} : style,
        class: {
          [`${pre}-borderless`]: !bordered,
          [`${customClass}`]: customClass && !showCount.value,
          [`${pre}-sm`]: size.value === 'small',
          [`${pre}-lg`]: size.value === 'large',
        },
        showCount: null,
        prefixCls: pre,
        onInput: handleChange,
        onChange: handleChange,
        onBlur,
        onKeydown: handleKeyDown,
      };
      if (props.valueModifiers?.lazy) {
        delete resizeProps.onInput;
      }
      return (
        <ResizeableTextArea
          {...resizeProps}
          id={resizeProps.id}
          ref={resizableTextArea}
          maxLength={props.maxLength}
        />
      );
    };
    onMounted(() => {
      // 单测使用
      if (process.env.NODE_ENV === 'test') {
        if (props.autoSize) {
          focus();
        }
      }
    });
    expose({
      focus,
      blur,
      resizableTextArea,
    });

    watchEffect(() => {
      let val = fixControlledValue(stateValue.value) as string;
      if (
        !compositing.value &&
        hasMaxLength.value &&
        (props.value === null || props.value === undefined)
      ) {
        // fix #27612 将value转为数组进行截取，解决 '😂'.length === 2 等emoji表情导致的截取乱码的问题
        val = fixEmojiLength(val, props.maxLength);
      }
      mergedValue.value = val;
    });

    return () => {
      const { maxLength, bordered = true } = props;
      const { style, class: customClass } = attrs;
      const pre = prefixCls.value + '-input';

      const inputProps: any = {
        ...props,
        ...attrs,
        prefixCls: pre,
        inputType: 'text',
        handleReset,
        direction: direction.value,
        bordered,
        style: showCount.value ? undefined : style,
      };

      let textareaNode = (
        <ClearableLabeledInput {...inputProps} value={mergedValue.value} element={renderTextArea} />
      );

      if (showCount.value) {
        const valueLength = [...mergedValue.value].length;
        let dataCount = '';
        if (typeof showCount.value === 'object') {
          dataCount = showCount.value.formatter({ count: valueLength, maxlength: maxLength });
        } else {
          dataCount = `${valueLength}${hasMaxLength.value ? ` / ${maxLength}` : ''}`;
        }
        textareaNode = (
          <div
            class={classNames(
              `${pre}-textarea`,
              {
                [`${pre}-textarea-rtl`]: direction.value === 'rtl',
              },
              `${pre}-textarea-show-count`,
              customClass,
            )}
            style={style}
            data-count={dataCount}
          >
            {textareaNode}
          </div>
        );
      }
      return textareaNode;
    };
  },
});
