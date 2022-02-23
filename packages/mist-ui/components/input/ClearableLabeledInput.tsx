import { computed, defineComponent, PropType, shallowRef, VNode } from 'vue';
import { DirectionType, SizeType } from '../config-provider';
import CloseCircleFilled from '@mist-desgin/icons/CloseCircleFilled';
import { cloneElement } from '../_utils/tools/vnode';
import { mergeVNode } from '../_utils/tools';
import { getInputClassName } from './utils';
import classNames from '../_utils/tools/classnames';
const clearableLabeledProps = {
  prefixCls: {
    type: String,
    default: undefined,
  },
  focused: {
    type: Boolean,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
  size: {
    type: String as PropType<SizeType>,
    default: undefined,
  },
  suffix: {
    type: [Function, Object] as PropType<VNode>,
    default: undefined,
  },
  allowClear: {
    type: Boolean,
    default: undefined,
  },
  value: {
    type: [String, Number, Object, Array] as PropType<any>,
    default: undefined,
  },
  direction: {
    type: String as PropType<DirectionType>,
    default: undefined,
  },
  readOnly: {
    type: Boolean,
    default: undefined,
  },
  bordered: {
    type: Boolean,
    default: undefined,
  },
  hidden: {
    type: Boolean,
    default: undefined,
  },
  prefix: {
    type: [Function, Object] as PropType<VNode>,
    default: undefined,
  },
  addonBefore: {
    type: [Function, Object] as PropType<VNode>,
    default: undefined,
  },
  addonAfter: {
    type: [Function, Object] as PropType<VNode>,
    default: undefined,
  },
  handleReset: {
    type: Function,
    default: () => ({}),
  },
  inputType: {
    type: String as PropType<'text' | 'input'>,
    default: undefined,
  },
  lazy: {
    type: Boolean,
    default: undefined,
  },
  element: {
    type: [Function, Object] as PropType<VNode>,
    default: undefined,
  },
};
const ClearableInputType = ['text', 'input'];
export function hasPrefixSuffix(propsAndSlots: any) {
  return !!(propsAndSlots.prefix || propsAndSlots.suffix || propsAndSlots.allowClear);
}

function hasAddon(propsAndSlots: any) {
  return !!(propsAndSlots.addonBefore || propsAndSlots.addonAfter);
}
export default defineComponent({
  name: 'MClearableLabeledInput',
  props: clearableLabeledProps,
  setup(props, { slots, attrs }) {
    const renderClearIcon = () => {
      const { allowClear, value, disabled, readOnly, prefixCls, handleReset } = props;
      if (!allowClear) {
        return null;
      }
      const needClear = !disabled && !readOnly && value;
      const className = `${prefixCls}-clear-icon`;
      const onClick = (e: Event) => {
        if (typeof handleReset === 'function') {
          handleReset(e);
        }
      };
      const classes = computed(() => {
        return {
          [`${className}`]: true,
          [`${className}-hidden`]: !needClear,
          [`${className}-has-suffix`]: !!mergeVNode(props, slots, ['suffix']).suffix,
        };
      });
      return (
        <CloseCircleFilled
          onClick={onClick}
          onMousedown={e => e.preventDefault()}
          class={classes.value}
          role="button"
        />
      );
    };

    const renderSuffix = () => {
      const { allowClear, prefixCls } = props;
      const { suffix } = mergeVNode(props, slots, ['suffix']);
      if (suffix || allowClear) {
        return (
          <span class={`${prefixCls}-suffix`}>
            {renderClearIcon()}
            {suffix}
          </span>
        );
      }
      return null;
    };

    const renderLabeledIcon = (element: VNode) => {
      const {
        prefixCls,
        focused,
        disabled,
        size,
        allowClear,
        value,
        direction,
        readOnly,
        bordered,
      } = props;
      const suffixNode = renderSuffix();
      const { suffix, prefix } = mergeVNode(props, slots, ['suffix', 'prefix']);
      if (hasPrefixSuffix({ prefix, suffix, allowClear })) {
        return cloneElement(element, { value });
      }

      const prefixNode = prefix ? <span class={`${prefixCls}-prefix`}>{prefix}</span> : null;
      const affixWrapperCls = {
        [`${prefixCls}-prefix-wrapper`]: true,
        [`${prefixCls}-affix-wrapper-focused`]: focused,
        [`${prefixCls}-affix-wrapper-disabled`]: disabled,
        [`${prefixCls}-affix-wrapper-sm`]: size === 'small',
        [`${prefixCls}-affix-wrapper-lg`]: size === 'large',
        [`${prefixCls}-affix-wrapper-input-with-clear-btn`]: suffix && allowClear && value,
        [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
        [`${prefixCls}-affix-wrapper-readonly`]: readOnly,
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        [`${attrs.class}`]: !hasAddon(props) && attrs.class,
      };
      return (
        <span class={affixWrapperCls}>
          {prefixNode}
          {cloneElement(element, {
            style: null,
            value,
            class: classNames(
              getInputClassName(shallowRef(prefixCls), bordered, size, disabled, direction),
            ),
          })}
          {suffixNode}
        </span>
      );
    };
    const renderInputWithLabel = (labeledElement: VNode) => {
      const { direction, size, prefixCls, hidden } = props;
      const { addonAfter, addonBefore } = mergeVNode(props, slots, ['addonAfter', 'addonBefore']);

      if (!hasAddon({ addonBefore, addonAfter })) {
        return labeledElement;
      }
      const wrapperClassName = `${prefixCls}-group`;
      const addonClassName = `${wrapperClassName}-addon`;
      const addonBeforeNode = addonBefore ? (
        <span class={addonClassName}>{addonBefore}</span>
      ) : null;
      const addonAfterNode = addonAfter ? <span class={addonClassName}>{addonAfter}</span> : null;
      const mergedWrapperClassName = {
        [`${prefixCls}-wrapper`]: true,
        [wrapperClassName]: true,
        [`${wrapperClassName}-rtl`]: direction === 'rtl',
      };
      const mergedGroupClassName = {
        [`${prefixCls}-group-wrapper`]: true,
        [`${prefixCls}-group-wrapper-sm`]: size === 'small',
        [`${prefixCls}-group-wrapper-lg`]: size === 'large',
        [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl',
        [`${attrs.class}`]: !hasAddon(props) && attrs.class,
      };

      return (
        <span class={mergedGroupClassName} hidden={hidden}>
          <span class={mergedWrapperClassName}>
            {addonBeforeNode}
            {cloneElement(labeledElement, { style: null })}
            {addonAfterNode}
          </span>
        </span>
      );
    };

    const renderTextAreaWithClearIcon = (element: VNode) => {
      const { value, allowClear, prefixCls, direction, bordered } = props;
      if (!allowClear) {
        return cloneElement(element, { value });
      }
      const affixWrapperCls = {
        [`${prefixCls}-affix-wrapper`]: true,
        [`${prefixCls}-affix-wrapper-textarea-with-clear-btn`]: true,
        [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        // className will go to addon wrapper
        [`${attrs.class}`]: !hasAddon(props) && attrs.class,
      };

      return (
        <span class={affixWrapperCls} style={attrs.style}>
          {cloneElement(element, {
            style: null,
            value,
          })}
          {renderClearIcon()}
        </span>
      );
    };

    return () => {
      const { inputType } = props;
      const { element } = mergeVNode(props, slots, ['element']);
      if (inputType === ClearableInputType[0]) {
        return renderTextAreaWithClearIcon(element);
      }
      return renderInputWithLabel(renderLabeledIcon(element));
    };
  },
});
