import type { PropType, ExtractPropTypes } from 'vue';
import { computed, defineComponent, ref, toRefs } from 'vue';
import classNames from '../_utils/tools/classNames';
import type { BaseSelectRef } from './src';
import RcSelect, { selectProps as vcSelectProps, Option, OptGroup } from './src';
import type { BaseOptionType, DefaultOptionType } from './src/Select';
import type { OptionProps } from './src/Option';
import getIcons from './utils/iconUtil';
import PropTypes from '../_utils/tools/vue-types';
import omit from 'lodash/omit';
// import { useInjectFormItemContext } from '../form/FormItemContext';
import { getTransitionName } from '../_utils/tools/transition';
import type { SizeType } from '../config-provider';
import { initDefaultProps } from '../_utils/tools/props-util';
import { useConfigInject } from '../config-provider';

type RawValue = string | number;

export type OptionType = typeof Option;
export type { OptionProps, BaseSelectRef as RefSelectProps, BaseOptionType, DefaultOptionType };

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label?: any;
}
export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined;

export const selectProps = () => ({
  ...omit(vcSelectProps<SelectValue>(), ['inputIcon', 'mode', 'getInputElement', 'backfill']),
  value: {
    type: [Array, Object, String, Number] as PropType<SelectValue>,
  },
  defaultValue: {
    type: [Array, Object, String, Number] as PropType<SelectValue>,
  },
  notFoundContent: PropTypes.any,
  suffixIcon: PropTypes.any,
  itemIcon: PropTypes.any,
  size: String as PropType<SizeType>,
  mode: String as PropType<'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE'>,
  bordered: { type: Boolean, default: true },
  transitionName: String,
  choiceTransitionName: { type: String, default: '' },
  'onUpdate:value': Function as PropType<(val: SelectValue) => void>,
});

export type SelectProps = Partial<ExtractPropTypes<ReturnType<typeof selectProps>>>;

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
const Select = defineComponent({
  name: 'MSelect',
  Option,
  OptGroup,
  inheritAttrs: false,
  props: initDefaultProps(selectProps(), {
    listHeight: 256,
    listItemHeight: 24,
  }),
  SECRET_COMBOBOX_MODE_DO_NOT_USE,
  // emits: ['change', 'update:value', 'blur'],
  slots: [
    'notFoundContent',
    'suffixIcon',
    'itemIcon',
    'removeIcon',
    'clearIcon',
    'dropdownRender',
    'option',
    'placeholder',
    'tagRender',
    'maxTagPlaceholder',
    'optionLabel', // donot use, maybe remove it
  ],
  setup(props, { attrs, emit, slots, expose }) {
    const selectRef = ref<BaseSelectRef>();
    // const formItemContext = useInjectFormItemContext();
    const focus = () => {
      selectRef.value?.focus();
    };

    const blur = () => {
      selectRef.value?.blur();
    };

    const scrollTo: BaseSelectRef['scrollTo'] = arg => {
      selectRef.value?.scrollTo(arg);
    };

    const mode = computed(() => {
      const { mode } = props;

      if ((mode as any) === 'combobox') {
        return undefined;
      }

      if (mode === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
        return 'combobox';
      }

      return mode;
    });
    const {
      prefixCls: rootPrefixCls,
      direction,
      renderEmpty,
      getPopupContainer: getContextPopupContainer,
    } = toRefs(useConfigInject());
    const prefixCls = computed(() => rootPrefixCls.value + '-select');
    const transitionName = computed(() =>
      getTransitionName(rootPrefixCls.value, 'slide-up', props.transitionName),
    );
    const mergedClassName = computed(() =>
      classNames({
        [`${prefixCls.value}-lg`]: props.size === 'large',
        [`${prefixCls.value}-sm`]: props.size === 'small',
        [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        [`${prefixCls.value}-borderless`]: !props.bordered,
      }),
    );
    const triggerChange: SelectProps['onChange'] = (...args) => {
      emit('update:value', args[0]);
      emit('change', ...args);
      // formItemContext.onFieldChange();
    };
    const handleBlur: SelectProps['onBlur'] = e => {
      emit('blur', e);
      // formItemContext.onFieldBlur();
    };
    expose({
      blur,
      focus,
      scrollTo,
    });
    const isMultiple = computed(() => mode.value === 'multiple' || mode.value === 'tags');
    return () => {
      const {
        notFoundContent,
        listHeight = 256,
        listItemHeight = 24,
        getPopupContainer,
        dropdownClassName,
        virtual,
        dropdownMatchSelectWidth,
        // id = formItemContext.id.value,
        id = '',
        placeholder = slots.placeholder?.(),
      } = props;

      // const { renderEmpty, getPopupContainer: getContextPopupContainer } = configProvider;

      // ===================== Empty =====================
      let mergedNotFound: any;
      if (notFoundContent !== undefined) {
        mergedNotFound = notFoundContent;
      } else if (slots.notFoundContent) {
        mergedNotFound = slots.notFoundContent();
      } else if (mode.value === 'combobox') {
        mergedNotFound = null;
      } else {
        mergedNotFound = renderEmpty.value('Select') as any;
      }

      // ===================== Icons =====================
      const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons(
        {
          ...props,
          multiple: isMultiple.value,
          prefixCls: prefixCls.value,
        },
        slots,
      );

      const selectProps = omit(props, [
        'prefixCls',
        'suffixIcon',
        'itemIcon',
        'removeIcon',
        'clearIcon',
        'size',
        'bordered',
      ]);

      const rcSelectRtlDropDownClassName = classNames(dropdownClassName, {
        [`${prefixCls.value}-dropdown-${direction.value}`]: direction.value === 'rtl',
      });
      return (
        <RcSelect
          ref={selectRef}
          virtual={virtual}
          dropdownMatchSelectWidth={dropdownMatchSelectWidth}
          {...selectProps}
          {...attrs}
          placeholder={placeholder}
          listHeight={listHeight}
          listItemHeight={listItemHeight}
          mode={mode.value}
          prefixCls={prefixCls.value}
          direction={direction.value}
          inputIcon={suffixIcon}
          menuItemSelectedIcon={itemIcon}
          removeIcon={removeIcon}
          clearIcon={clearIcon}
          notFoundContent={mergedNotFound}
          class={[mergedClassName.value, attrs.class]}
          getPopupContainer={getPopupContainer || (getContextPopupContainer.value as any)}
          dropdownClassName={rcSelectRtlDropDownClassName}
          onChange={triggerChange}
          onBlur={handleBlur}
          id={id}
          dropdownRender={selectProps.dropdownRender || slots.dropdownRender}
          v-slots={{ option: slots.option }}
          transitionName={transitionName.value}
          children={slots.default?.()}
          tagRender={props.tagRender || slots.tagRender}
          optionLabelRender={slots.optionLabel}
          maxTagPlaceholder={props.maxTagPlaceholder || slots.maxTagPlaceholder}
        />
      );
    };
  },
});
