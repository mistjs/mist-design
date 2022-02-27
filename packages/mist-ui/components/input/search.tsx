import { defineComponent, PropType, ref, toRefs, VNode } from 'vue';
import { inputProps } from './inputProps';
import { ChangeEvent } from '../_utils/tools/EventInterface';
import { PropsVNode } from '../_utils/tools/props-util';
import { useConfigInject } from '../config-provider';
import SearchOutlined from '@mist-desgin/icons/SearchOutlined';
import Button from '../button';
import { cloneElement } from '../_utils/tools/vnode';
import { mergeVNode } from '../_utils/tools';
import classnames from '../_utils/tools/classnames';
import Input from './input';
import { omit } from 'lodash';

export type SearchType = (
  value: string,
  event?: HTMLInputElement | HTMLElement | KeyboardEvent | MouseEvent | ChangeEvent,
) => void;

const searchInputProps = Object.assign(
  {
    onSearch: {
      type: Function as PropType<SearchType>,
      default: undefined,
    },
    enterButton: {
      type: [Object, Function, Boolean] as PropType<PropsVNode>,
      default: true,
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  },
  inputProps,
);

export default defineComponent({
  name: 'MInputSearch',
  props: searchInputProps,
  inheritAttrs: false,
  emits: ['search', 'update:value', 'change'],
  setup(props, { attrs, slots, expose, emit }) {
    const { prefixCls, direction, size } = toRefs(useConfigInject());
    const inputRef = ref();
    const focus = () => {
      inputRef.value?.focus();
    };
    const blur = () => {
      inputRef.value?.blur();
    };
    expose({
      focus,
      blur,
    });

    const onChange = (e: ChangeEvent) => {
      emit('update:value', (e.target as HTMLInputElement).value);
      if (e && e.target && e.type === 'click') {
        emit('search', e.target.value, e);
      }
      emit('change', e);
    };

    const onMousedown = (e: MouseEvent) => {
      if (document.activeElement === inputRef.value?.input) {
        e.preventDefault();
      }
    };

    const onSearch = (e: MouseEvent | KeyboardEvent | HTMLButtonElement) => {
      emit('search', inputRef.value?.stateValue, e);
      // if (!isMobile.tablet) {
      //   inputRef.value.focus();
      // }
    };
    const prefix = prefixCls.value + '-input-search';
    const searchIcon = typeof props.enterButton === 'boolean' ? <SearchOutlined /> : null;
    const btnClassName = `${prefix}-button`;
    let button: PropsVNode;
    const enterButtonAsElement = (props.enterButton || {}) as VNode;

    const isMistButton =
      enterButtonAsElement.type &&
      (enterButtonAsElement.type as typeof Button).__MIST_BUTTON === true;
    if (isMistButton || enterButtonAsElement.type === 'button') {
      button = cloneElement(enterButtonAsElement, {
        onMousedown,
        onClick: (e: HTMLButtonElement) => {
          enterButtonAsElement?.props?.onClick?.(e);
          onSearch(e);
        },
        key: 'enter-button',
        ...(isMistButton ? { class: btnClassName, size: props.size || size.value } : {}),
      });
    } else {
      const { enterButton } = mergeVNode(props, slots, ['enterButton']);
      button = (
        <Button
          class={btnClassName}
          type={enterButton ? 'primary' : undefined}
          size={props.size || (size.value as any)}
          disabled={props.disabled}
          key="enter-button"
          onMousedown={onMousedown}
          onClick={onSearch}
          loading={props.loading}
          icon={searchIcon}
        >
          {enterButton}
        </Button>
      );
    }
    if (props.addonAfter) {
      button = [
        button,
        cloneElement(props.addonAfter, {
          key: 'addonAfter',
        }),
      ];
    }
    const cls = classnames(prefix, {
      [`${prefix}-rtl`]: direction.value === 'rtl',
      [`${prefix}-${props.size || size.value}`]: !!(props.size || size.value),
      [`${prefix}-with-button`]: !!props.enterButton,
      [`${attrs.class}`]: !!attrs.class,
    });

    return () => {
      return (
        <Input
          {...omit(props, ['onSearch', 'enterButton', 'addonAfter', 'onChange', 'onPressEnter'])}
          {...attrs}
          ref={inputRef}
          onPressEnter={onSearch}
          size={props.size || size.value}
          addonAfter={button}
          onChange={onChange}
          class={cls}
          disabled={props.disabled}
          {...{ 'onUpdate:value': e => emit('update:value', e) }}
          v-slots={slots}
        />
      );
    };
  },
});
