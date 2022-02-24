import { computed, defineComponent, toRefs, InputHTMLAttributes, ref, reactive } from 'vue';
import { inputEmits, inputProps } from './inputProps';
import { SizeType, useConfigInject } from '../config-provider';
import { mergeVNode } from '../_utils/tools';
import { omit } from 'lodash';
import classNames from '../_utils/tools/classnames';
import { getInputClassName } from '../input/utils';
export default defineComponent({
  name: 'MInput',
  props: inputProps,
  emits: inputEmits,
  setup(props, { emit, attrs, slots }) {
    const { direction, prefixCls, input: inputConfig, size } = toRefs(useConfigInject());
    const pre = computed(() => prefixCls.value + '-input');
    const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    const state = reactive({
      value: value,
    });

    const inputRef = ref();
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
      emit('update:value', (e.target as HTMLInputElement).value);
    };

    // focus
    const handleFocus = () => {
      // TODO
    };

    const renderShowCountSuffix = () => {
      // const {} = props;
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
          value={state.value}
          autoComplete={inputConfig.value.autocomplete}
          onChange={handleChange}
          onBlur={e => emit('blur', e)}
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

    return () => {
      return renderInput(size?.value, props.bordered);
    };
  },
});
