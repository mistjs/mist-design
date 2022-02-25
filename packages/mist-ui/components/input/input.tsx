import { computed, defineComponent, toRefs, ref, watch, shallowRef, onUnmounted } from 'vue';
import { inputEmits, inputProps } from './inputProps';
import { SizeType, useConfigInject } from '../config-provider';
import { mergeVNode } from '../_utils/tools';
import { omit } from 'lodash';
import classNames from '../_utils/tools/classnames';
import { getInputClassName } from './utils';
import ClearableLabeledInput from './clearableLabeledInput';
import { ChangeEvent } from '../_utils/tools/EventInterface';
export interface InputFocusOptions extends FocusOptions {
  cursor?: 'start' | 'end' | 'all';
}
export function resolveOnChange<E extends HTMLInputElement | HTMLTextAreaElement>(
  target: E,
  e: ChangeEvent | MouseEvent,
  onChange: undefined | Function,
  targetValue?: string,
) {
  if (!onChange) {
    return;
  }
  let event = e;
  if (e.type === 'click') {
    const currentTarget = target.cloneNode(true) as E;
    event = Object.assign(
      {
        target: { value: currentTarget },
        currentTarget: { value: currentTarget },
      },
      e,
    );
    currentTarget.value = '';
    onChange(event);
    return;
  }
  if (targetValue !== undefined) {
    event = Object.assign(
      {
        target: { value: target },
        currentTarget: { value: target },
      },
      e,
    );
    target.value = targetValue;
    onChange(event);
    return;
  }
  onChange(event);
}

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
export function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return String(value);
}
export default defineComponent({
  name: 'MInput',
  props: inputProps,
  emits: inputEmits,
  setup(props, { emit, attrs, slots }) {
    const { direction, prefixCls, input: inputConfig, size } = toRefs(useConfigInject());
    const pre = computed(() => prefixCls.value + '-input');
    const stateValue = shallowRef(props.value === undefined ? props.defaultValue : props.value);
    const removePassWordTimeout = shallowRef(null);
    const inputRef = ref<HTMLInputElement>();
    const focused = shallowRef(false);

    watch(
      () => props.value,
      () => {
        stateValue.value = props.value;
      },
    );

    watch(
      () => props.disabled,
      () => {
        if (!props.value) {
          stateValue.value = props.value;
        }
      },
    );

    // 按下
    const handleKeydown = (e: KeyboardEvent) => {
      // TODO
      if (e.keyCode === 13) {
        emit('pressEnter', e);
      }
      emit('keydown', e);
    };

    // 修改数据
    const handleChange = (e: Event) => {
      emit('change', e);
    };

    // 输入数据
    const handleInput = (e: Event) => {
      emit('input', e);
      emit('update:value', (e.target as HTMLInputElement).value || '');
    };

    // focus
    const handleFocus = (e: FocusEvent) => {
      // TODO
      clearPasswordValueAttribute();
      focused.value = true;
      emit('focus', e);
    };

    const focus = (option?: InputFocusOptions) => {
      triggerFocus(inputRef.value, option);
    };

    // blur
    const handleBlur = (e: FocusEvent) => {
      clearPasswordValueAttribute();
      focused.value = false;
      emit('blur', e);
    };

    const handleReset = (e: MouseEvent) => {
      stateValue.value = '';
      focus();
      resolveOnChange(inputRef.value, e, e => {
        emit('change', e);
      });
    };

    const renderShowCountSuffix = () => {
      const { maxLength, showCount } = props;
      const { suffix } = mergeVNode(props, slots, ['suffix']);
      const hasMaxLength = Number(maxLength) > 0;
      if (suffix || showCount) {
        const valueLength = [...fixControlledValue(stateValue.value)].length;
        let dataCount;
        if (typeof showCount === 'object') {
          dataCount = showCount.formatter({ count: valueLength, maxLength });
        } else {
          dataCount = `${valueLength}${hasMaxLength ? `/${maxLength}` : ''}`;
        }
        return (
          <>
            {!!showCount && (
              <span
                class={classNames(`${pre.value}-show-count-suffix`, {
                  [`${pre.value}-show-count-has-suffix`]: !!suffix,
                })}
              >
                {dataCount}
              </span>
            )}
            {suffix}
          </>
        );
      }
      return null;
    };

    const renderInput = (size: SizeType | undefined, bordered: boolean) => {
      const { size: customSize, disabled, htmlSize } = props;
      const { addonAfter, addonBefore } = mergeVNode(props, slots, ['addonBefore', 'addonAfter']);
      const otherProps = omit(props, [
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
        'showCount',
      ]);
      return (
        <input
          {...(otherProps as any)}
          autoComplete={inputConfig.value.autocomplete}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={stateValue.value}
          onKeyDown={handleKeydown}
          onInput={handleInput}
          className={classNames(
            getInputClassName(pre, bordered, customSize || size, disabled, direction.value),
            {
              [attrs.class as any]: attrs.class && !addonAfter && !addonBefore,
            },
          )}
          size={htmlSize}
          ref={inputRef}
        />
      );
    };

    const clearPasswordValueAttribute = () => {
      removePassWordTimeout.value = setTimeout(() => {
        if (
          inputRef.value &&
          inputRef.value.getAttribute('type') === 'password' &&
          inputRef.value.hasAttribute('value')
        ) {
          inputRef.value.removeAttribute('value');
        }
      });
    };

    onUnmounted(() => {
      if (removePassWordTimeout.value) {
        clearTimeout(removePassWordTimeout.value);
      }
    });

    const renderComponent = () => {
      // 初始化组件
      const { bordered = true } = props;
      const showCountSuffix = renderShowCountSuffix();
      return (
        <ClearableLabeledInput
          {...attrs}
          {...props}
          size={size.value}
          inputType="input"
          value={fixControlledValue(stateValue.value)}
          element={renderInput(size.value || 'middle', bordered)}
          handleReset={handleReset}
          direction={direction.value}
          focused={focused.value}
          triggerFocus={focus}
          bordered={bordered}
          suffix={showCountSuffix}
          prefixCls={pre.value}
        />
      );
    };
    return () => {
      return renderComponent();
    };
  },
});
