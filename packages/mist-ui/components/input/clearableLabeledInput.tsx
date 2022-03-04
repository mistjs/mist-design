import { defineComponent, ExtractPropTypes, PropType, ref, shallowRef, VNode } from 'vue';
import { DirectionType, SizeType } from '../config-provider';
import { PropsVNode } from '../_utils/tools/props-util';
import CloseCircleFilled from '@mist-desgin/icons/CloseCircleFilled';
import classnames from '../_utils/tools/classnames';
import { getInputClassName, hasPrefixSuffix } from './utils';
import { cloneElement } from '../_utils/tools/vnode';
import { InputProps } from '../input';
export type ClearableInputType = 'text' | 'input';
function hasAddon(props: InputProps | ClearableLabeledInputProps) {
  return !!(props.addonBefore || props.addonAfter);
}
const basicProps = {
  prefixCls: {
    type: String as PropType<string>,
    default: '',
  },
  inputType: {
    type: String as PropType<ClearableInputType>,
    required: true,
  },
  value: {
    type: String as PropType<any>,
    default: undefined,
  },
  allowClear: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  element: {
    type: [Object, Function] as PropType<PropsVNode>,
    required: true,
  },
  handleReset: {
    type: Function as PropType<any>,
    required: true,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  direction: {
    type: String as PropType<DirectionType>,
    default: undefined,
  },
  focused: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  readOnly: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  bordered: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  hidden: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
};

const clearableInputProps = Object.assign(
  {
    size: {
      type: String as PropType<SizeType>,
      default: undefined,
    },
    prefix: {
      type: [Object, Function] as PropType<PropsVNode>,
      default: undefined,
    },
    suffix: {
      type: [Object, Function] as PropType<PropsVNode>,
      default: undefined,
    },
    addonAfter: {
      type: [Object, Function] as PropType<PropsVNode>,
      default: undefined,
    },
    addonBefore: {
      type: [Object, Function] as PropType<PropsVNode>,
      default: undefined,
    },
    triggerFocus: {
      type: Function as PropType<() => void>,
      default: undefined,
    },
  },
  basicProps,
);

export type ClearableLabeledInputProps = ExtractPropTypes<typeof clearableInputProps>;

export default defineComponent({
  name: 'ClearableLabeledInput',
  props: clearableInputProps,
  inheritAttrs: false,
  setup(props: ClearableLabeledInputProps, { attrs }) {
    const containerRef = ref<HTMLSpanElement>();

    const onInputMouseUp = (e: MouseEvent) => {
      if (containerRef.value.contains(e.target as Element)) {
        props.triggerFocus?.();
      }
    };

    // 渲染清空按钮
    const renderClearIcon = (prefixCls: string) => {
      const { allowClear, value, disabled, readOnly, handleReset, suffix } = props;
      if (!allowClear) return null;
      const needClear = !disabled && !readOnly && value;
      const className = `${prefixCls}-clear-icon`;
      return (
        <CloseCircleFilled
          role="button"
          onClick={handleReset}
          onMousedown={e => e.preventDefault()}
          class={classnames(className, {
            [`${className}-hidden`]: !needClear,
            [`${className}-has-suffix`]: !!suffix,
          })}
        />
      );
    };

    const renderSuffix = (prefixCls: string) => {
      const { allowClear, suffix } = props;
      if (allowClear || suffix) {
        return (
          <span class={`${prefixCls}-suffix`}>
            {renderClearIcon(prefixCls)}
            {suffix}
          </span>
        );
      }
      return null;
    };

    const renderLabeledIcon = (prefixCls: string, element: VNode) => {
      const {
        focused,
        value,
        prefix,
        size,
        suffix,
        disabled,
        allowClear,
        direction,
        readOnly,
        bordered,
        hidden,
      } = props;
      if (!hasPrefixSuffix(props)) {
        return cloneElement(element, { value });
      }

      const suffixNode = renderSuffix(prefixCls);
      const prefixNode = prefix ? <span class={`${prefixCls}-prefix`}>{prefix}</span> : null;

      const affixWrapperCls = classnames(`${prefixCls}-affix-wrapper`, {
        [`${prefixCls}-affix-wrapper-focused`]: focused,
        [`${prefixCls}-affix-wrapper-disabled`]: disabled,
        [`${prefixCls}-affix-wrapper-sm`]: size === 'small',
        [`${prefixCls}-affix-wrapper-lg`]: size === 'large',
        [`${prefixCls}-affix-wrapper-input-with-clear-btn`]: suffix && allowClear && value,
        [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
        [`${prefixCls}-affix-wrapper-readonly`]: readOnly,
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        [`${attrs.class}`]: !hasAddon(props) && attrs.class,
      });
      return (
        <span
          ref={containerRef}
          class={affixWrapperCls}
          style={attrs.style}
          onMouseup={onInputMouseUp}
          hidden={hidden}
        >
          {prefixNode}
          {cloneElement(element, {
            value,
            class: classnames(getInputClassName(shallowRef(prefixCls), bordered, size, disabled)),
          })}
          {suffixNode}
        </span>
      );
    };

    const renderInputWithLabel = (prefixCls: string, labeledElement: VNode) => {
      const { addonAfter, addonBefore, size, direction, hidden } = props;
      if (!hasAddon(props)) {
        return labeledElement;
      }
      const wrapperClassName = `${prefixCls}-group`;
      const addonClassName = `${wrapperClassName}-addon`;
      const addonBeforeNode = addonBefore ? (
        <span class={addonClassName}>{addonBefore}</span>
      ) : null;
      const addonAfterNode = addonAfter ? <span class={addonClassName}>{addonAfter}</span> : null;

      const mergedWrapperClassName = classnames(`${prefixCls}-wrapper`, wrapperClassName, {
        [`${wrapperClassName}-rtl`]: direction === 'rtl',
      });
      const mergedGroupClassName = classnames(`${prefixCls}-group-wrapper`, {
        [`${prefixCls}-group-wrapper-sm`]: size === 'small',
        [`${prefixCls}-group-wrapper-lg`]: size === 'large',
        [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl',
        [`${attrs.class}`]: attrs.class,
      });

      return (
        <span class={mergedGroupClassName} style={attrs.style} hidden={hidden}>
          <span class={mergedWrapperClassName}>
            {addonBeforeNode}
            {cloneElement(labeledElement, { style: null })}
            {addonAfterNode}
          </span>
        </span>
      );
    };

    const renderTextAreaWithClearIcon = (prefixCls: string, element: VNode) => {
      const { value, allowClear, direction, bordered, hidden } = props;
      if (!allowClear) {
        return cloneElement(element, { value });
      }
      const affixWrapperCls = classnames(
        `${prefixCls}-affix-wrapper`,
        `${prefixCls}-affix-wrapper-textarea-with-clear-btn`,
        {
          [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
          [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
          // className will go to addon wrapper
          [`${attrs.class}`]: !hasAddon(props) && attrs.class,
        },
      );

      return (
        <span class={affixWrapperCls} style={attrs.style} hidden={hidden}>
          {cloneElement(element, { value })}
          {renderClearIcon(prefixCls)}
        </span>
      );
    };

    return () => {
      const { prefixCls, inputType, element } = props;
      const myElement: VNode = (typeof element === 'function' ? element() : element) as VNode;
      if (inputType === 'text') {
        return renderTextAreaWithClearIcon(prefixCls, myElement);
      }
      return renderInputWithLabel(prefixCls, renderLabeledIcon(prefixCls, myElement));
    };
  },
});
