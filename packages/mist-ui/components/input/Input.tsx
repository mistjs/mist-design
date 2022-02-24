import {
  defineComponent,
  toRefs,
  ref,
  onBeforeUnmount,
  onMounted,
  watch,
  nextTick,
  getCurrentInstance,
  withDirectives,
  VNode,
} from 'vue';
import { inputProps } from './InputProps';
import type { InputProps } from './InputProps';
import { useConfigInject } from '../config-provider';
import { getInputClassName } from './utils';
import { ChangeEvent, FocusEventHandler } from '../_utils/tools/EventInterface';
import { omit } from 'lodash';
import { mergeVNode } from '../_utils/tools';
import mistInputDirective from '../_utils/tools/mistInputDirective';
import ClearableLabeledInput from './ClearableLabeledInput';
export interface InputFocusOptions extends FocusOptions {
  cursor?: 'start' | 'end' | 'all';
}
export function fixControlledValue(value: string | number) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}
// 触发默认
export function triggerFocus(
  element?: HTMLInputElement | HTMLTextAreaElement,
  option?: InputFocusOptions,
) {
  if (!element) return;

  element.focus(option);

  // Selection content
  const { cursor } = option || {};
  if (cursor) {
    const len = element.value.length;

    switch (cursor) {
      case 'start':
        element.setSelectionRange(0, 0);
        break;

      case 'end':
        element.setSelectionRange(len, len);
        break;

      default:
        element.setSelectionRange(0, len);
    }
  }
}

export function resolveOnChange(
  target: HTMLInputElement,
  e: Event,
  onChange: Function,
  targetValue?: string,
) {
  if (!onChange) {
    return;
  }
  const event: any = e;

  if (e.type === 'click') {
    Object.defineProperty(event, 'target', {
      writable: true,
    });
    Object.defineProperty(event, 'currentTarget', {
      writable: true,
    });
    // click clear icon
    //event = Object.create(e);
    const currentTarget = target.cloneNode(true);

    event.target = currentTarget;
    event.currentTarget = currentTarget;
    // change target ref value cause e.target.value should be '' when clear input
    (currentTarget as any).value = '';
    onChange(event);
    return;
  }
  // Trigger by composition event, this means we need force change the input value
  if (targetValue !== undefined) {
    Object.defineProperty(event, 'target', {
      writable: true,
    });
    Object.defineProperty(event, 'currentTarget', {
      writable: true,
    });
    event.target = target;
    event.currentTarget = target;
    target.value = targetValue;
    onChange(event);
    return;
  }
  onChange(event);
}

export default defineComponent({
  name: 'MInput',
  inheritAttrs: false,
  props: inputProps,
  setup(props: InputProps, { slots, attrs, expose, emit }) {
    const inputRef = ref();
    const clearableInputRef = ref();
    let removePasswordTimeout: any;
    const { direction, prefixCls } = toRefs(useConfigInject());
    const focused = ref(false);
    const stateValue = ref(props.value === undefined ? props.defaultValue : props.value);

    watch(
      () => props.value,
      () => {
        stateValue.value = props.value;
      },
    );
    watch(
      () => props.disabled,
      () => {
        if (props.value !== undefined) {
          stateValue.value = props.value;
        }
      },
    );

    const focus = (option?: InputFocusOptions) => {
      triggerFocus(inputRef.value, option);
    };

    const blur = () => {
      inputRef.value?.blur();
    };

    const setSelectionRange = (
      start: number,
      end: number,
      direction?: 'forward' | 'backward' | 'none',
    ) => {
      inputRef.value?.setSelectionRange(start, end, direction);
    };

    const select = () => {
      inputRef.value?.select();
    };

    expose({
      focus,
      blur,
      input: inputRef,
      stateValue,
      setSelectionRange,
      select,
    });
    const clearPasswordValueAttribute = () => {
      removePasswordTimeout = setTimeout(() => {
        if (
          inputRef.value?.getAttribute('type') === 'password' &&
          inputRef.value.hasAttribute('value')
        ) {
          inputRef.value.removeAttribute('value');
        }
      });
    };

    const onFocus: FocusEventHandler = e => {
      const { onFocus } = props;
      focused.value = true;
      onFocus?.(e);
      nextTick(() => {
        clearPasswordValueAttribute();
      });
    };

    const onBlur: FocusEventHandler = e => {
      const { onBlur } = props;
      focused.value = false;
      onBlur?.(e);
      // formItemContext.onFieldBlur();
      nextTick(() => {
        clearPasswordValueAttribute();
      });
    };

    const triggerChange = (e: Event) => {
      emit('update:value', (e.target as HTMLInputElement).value);
      emit('change', e);
      emit('input', e);
      // formItemContext.onFieldChange();
    };
    const instance = getCurrentInstance();
    const setValue = (value: string | number, callback?: Function) => {
      if (stateValue.value === value) {
        return;
      }
      if (props.value === undefined) {
        stateValue.value = value;
      } else {
        nextTick(() => {
          if (inputRef.value.value !== stateValue.value) {
            instance.update();
          }
        });
      }
      nextTick(() => {
        callback && callback();
      });
    };
    const handleReset = (e: MouseEvent) => {
      resolveOnChange(inputRef.value, e, triggerChange);
      setValue('', () => {
        focus();
      });
    };
    const handleChange = (e: ChangeEvent) => {
      const { value, composing } = e.target as any;
      if ((((e as any).isComposing || composing) && props.lazy) || stateValue.value === value)
        return;
      const newVal = e.target.value;
      resolveOnChange(inputRef.value, e, triggerChange);
      setValue(newVal, () => {
        clearPasswordValueAttribute();
      });
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        emit('pressEnter', e);
      }
      emit('keydown', e);
    };
    onMounted(() => {
      if (process.env.NODE_ENV === 'test') {
        if (props.autofocus) {
          focus();
        }
      }
      clearPasswordValueAttribute();
    });
    onBeforeUnmount(() => {
      clearTimeout(removePasswordTimeout);
    });
    const renderInput = () => {
      const { disabled, bordered = true, valueModifiers = {}, htmlSize } = props;
      const { addonAfter, addonBefore } = mergeVNode(props, slots, ['addonBefore', 'addonAfter']);
      const otherProps = omit(props as InputProps & { inputType: any; placeholder: string }, [
        'prefixCls',
        'onPressEnter',
        'addonBefore',
        'addonAfter',
        'prefix',
        'suffix',
        'allowClear',
        // Input elements must be either controlled or uncontrolled,
        // specify either the value prop, or the defaultValue prop, but not both.
        'defaultValue',
        'size',
        'inputType',
        'bordered',
        'htmlSize',
        'lazy',
      ]);
      const inputProps = {
        ...otherProps,
        ...attrs,
        autocomplete: undefined,
        onChange: handleChange,
        onInput: handleChange,
        onFocus,
        onBlur,
        onKeydown: handleKeyDown,
        class: {
          ...getInputClassName(prefixCls, bordered, props.size, disabled, direction.value),
          [attrs.class as string]: attrs.class && !addonBefore && !addonAfter,
        },
        ref: inputRef,
        key: 'mist-input',
        size: htmlSize,
        // id: otherProps.id ?? formItemContext.id.value,
      };
      if (valueModifiers.lazy) {
        delete inputProps.onInput;
      }
      if (!inputProps.autofocus) {
        delete inputProps.autofocus;
      }
      const inputNode = <input {...(inputProps as any)} />;
      return withDirectives(inputNode as VNode, [[mistInputDirective]]);
    };

    return () => {
      const inputProps: any = {
        ...attrs,
        ...props,
        prefixCls: prefixCls.value + '-input',
        value: fixControlledValue(stateValue.value),
        handleReset,
        focused: focused.value && !props.disabled,
      };
      const renderSlots = {
        ...slots,
        element: renderInput,
      };
      return (
        <ClearableLabeledInput
          {...omit(inputProps, ['element', 'valueModifiers'])}
          ref={clearableInputRef}
          v-slots={renderSlots}
        />
      );
    };
  },
});
