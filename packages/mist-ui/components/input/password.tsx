import { defineComponent, ExtractPropTypes, isVNode, PropType, ref, shallowRef, VNode } from 'vue';
import { InputProps, inputProps } from './inputProps';
import { cloneElement } from '../_utils/tools/vnode';
import { useConfigInject } from '../config-provider';
import classnames from '../_utils/tools/classnames';
import { omit } from 'lodash';
import Input from './input';
import EyeOutlined from '@mist-desgin/icons/EyeOutlined';
import EyeInvisibleOutlined from '@mist-desgin/icons/EyeInvisibleOutlined';
const inputPasswordProps = Object.assign(
  {
    action: {
      type: String as PropType<string>,
      default: 'click',
    },
    visibilityToggle: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    iconRender: {
      type: [Object, Function] as PropType<(visible: boolean) => VNode>,
      default: undefined,
    },
  },
  inputProps,
);
export type InputPasswordProps = Partial<ExtractPropTypes<typeof inputPasswordProps>>;

const ActionMap: Record<string, string> = {
  click: 'onClick',
  hover: 'onMouseOver',
};
export default defineComponent({
  name: 'MInputPassword',
  props: inputPasswordProps,
  inheritAttrs: false,
  setup(props: InputPasswordProps, { expose, attrs, slots }) {
    const visible = shallowRef(false);
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
    const onVisibleChange = () => {
      if (props.disabled) return;
      visible.value = !visible.value;
    };

    const getIcon = (prefixCls: string) => {
      const { action, iconRender = () => null } = props;
      const iconTrigger = ActionMap[action!] || '';
      const icon =
        (iconRender && typeof iconRender === 'function' && iconRender(visible.value)) ||
        (visible.value ? <EyeOutlined /> : <EyeInvisibleOutlined />);
      const iconProps = {
        [iconTrigger]: onVisibleChange,
        class: `${prefixCls}-icon`,
        key: 'passwordIcon',
        onMousedown: (e: MouseEvent) => {
          e.preventDefault();
        },
        onMouseup: (e: MouseEvent) => {
          e.preventDefault();
        },
      };
      return cloneElement(isVNode(icon) ? icon : <span>{icon}</span>, iconProps);
    };

    const renderPassword = () => {
      const { visibilityToggle, size, ...restProps } = props;
      const { prefixCls } = useConfigInject();
      const inputPre = prefixCls + '-input';
      const prefix = prefixCls + '-input-password';
      const suffixIcon = visibilityToggle && getIcon(prefix);
      const inputClassName = classnames(prefix, attrs.class, {
        [`${prefix}-${size}`]: !!size,
      });
      const omittedProps = {
        ...omit(restProps, ['suffix', 'iconRender']),
        type: visible.value ? 'text' : 'password',
        class: inputClassName,
        prefixCls: inputPre,
        suffix: suffixIcon,
      } as InputProps;
      if (size) {
        omittedProps.size = size;
      }
      return <Input ref={inputRef} {...attrs} {...omittedProps} v-slots={slots} />;
    };

    return () => {
      return renderPassword();
    };
  },
});
