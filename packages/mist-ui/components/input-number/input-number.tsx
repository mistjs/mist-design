import { defineComponent, HTMLAttributes, nextTick, onMounted, ref, toRefs, watch } from 'vue';
import inputNumberProps, { InputNumberProps } from './types';
import VcInputNumber from './src/InputNumber';
import { useConfigInject } from '../config-provider';
import { mergeVNode } from '../_utils/tools';
import classNames from '../_utils/tools/classnames';
import UpOutlined from '@mist-desgin/icons/UpOutlined';
import DownOutlined from '@mist-desgin/icons/DownOutlined';
import { omit } from 'lodash';
import { isValidValue } from '../_utils/tools/props-util';
import { cloneElement } from '../_utils/tools/vnode';
export default defineComponent({
  name: 'MInputNumber',
  props: inputNumberProps,
  inheritAttrs: false,
  emits: ['focus', 'blur', 'change', 'input', 'update:value'],
  setup(props: InputNumberProps, { attrs, expose, emit, slots }) {
    const { prefixCls, size, direction } = toRefs(useConfigInject());

    const mergeValue = ref(props.value === undefined ? props.defaultValue : props.value);
    watch(
      () => props.value,
      () => {
        mergeValue.value = props.value;
      },
    );
    const inputNumberRef = ref(null);
    const focus = () => {
      inputNumberRef.value?.focus();
    };
    const blur = () => {
      inputNumberRef.value?.blur();
    };
    expose({
      focus,
      blur,
    });
    const handleChange = (val: number) => {
      if (props.value === undefined) {
        mergeValue.value = val;
      }
      emit('update:value', val);
      emit('change', val);
      // formItemContext.onFieldChange();
    };
    const handleBlur = () => {
      emit('blur');
      // formItemContext.onFieldBlur();
    };
    const handleFocus = () => {
      emit('focus');
    };
    onMounted(() => {
      nextTick(() => {
        // 单元测试加载
        if (process.env.NODE_ENV === 'test') {
          if (props.autofocus && !props.disabled) {
            focus();
          }
        }
      });
    });

    return () => {
      const {
        class: className,
        bordered,
        readonly,
        style,
        ...others
      } = { ...(attrs as HTMLAttributes), ...props };
      const { addonAfter, addonBefore } = mergeVNode(props, slots, ['addonBefore', 'addonAfter']);
      const preCls = prefixCls.value + '-input-number';
      const mergeSize = size.value;
      const inputNumberClass = classNames(
        {
          [`${preCls}-lg`]: mergeSize === 'large',
          [`${preCls}-sm`]: mergeSize === 'small',
          [`${preCls}-rtl`]: direction.value === 'rtl',
          [`${preCls}-readonly`]: readonly,
          [`${preCls}-borderless`]: !bordered,
        },
        className,
      );
      const omitOtherProps = omit(others, ['size', 'defaultValue']);
      const element = (
        <VcInputNumber
          {...(omitOtherProps as any)}
          ref={inputNumberRef}
          value={mergeValue.value}
          class={inputNumberClass}
          prefixCls={preCls}
          readonly={readonly}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          v-slots={{
            upHandler: () => <UpOutlined class={`${preCls}-handler-up-inner`} />,
            downHandler: () => <DownOutlined class={`${preCls}-handler-down-inner`} />,
          }}
        />
      );

      if (isValidValue(addonBefore) || isValidValue(addonAfter)) {
        const wrapperClassName = `${preCls}-group`;
        const addonClassName = `${wrapperClassName}-addon`;
        const addonBeforeNode = addonBefore ? (
          <div class={addonClassName}>{addonBefore}</div>
        ) : null;
        const addonAfterNode = addonAfter ? <div class={addonClassName}>{addonAfter}</div> : null;

        const mergedWrapperClassName = classNames(`${preCls}-wrapper`, wrapperClassName, {
          [`${wrapperClassName}-rtl`]: direction.value === 'rtl',
        });

        const mergedGroupClassName = classNames(
          `${preCls}-group-wrapper`,
          {
            [`${preCls}-group-wrapper-sm`]: mergeSize === 'small',
            [`${preCls}-group-wrapper-lg`]: mergeSize === 'large',
            [`${preCls}-group-wrapper-rtl`]: direction.value === 'rtl',
          },
          className,
        );
        return (
          <div class={mergedGroupClassName} style={style}>
            <div class={mergedWrapperClassName}>
              {addonBeforeNode}
              {element}
              {addonAfterNode}
            </div>
          </div>
        );
      }
      return cloneElement(element, { style });
    };
  },
});
