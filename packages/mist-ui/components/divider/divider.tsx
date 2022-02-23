import { computed, CSSProperties, defineComponent, toRefs } from 'vue';
import { useConfigInject } from '../config-provider';
import { dividerProps } from './types';
export default defineComponent({
  name: 'MDivider',
  props: dividerProps,
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = toRefs(useConfigInject());
    const classes = computed(() => {
      const pre = prefixCls.value + '-divider';
      const { dashed, plain, orientation, orientationMargin, type } = props;
      const orientationPrefix = orientation.length > 0 ? `-${orientation}` : orientation;
      const hasChildren = !!slots.default;
      const hasCustomMarginLeft = orientation === 'left' && orientationMargin != null;
      const hasCustomMarginRight = orientation === 'right' && orientationMargin != null;
      return {
        [`${pre}`]: true,
        [`${pre}-${type}`]: true,
        [`${pre}-with-text`]: hasChildren,
        [`${pre}-with-text${orientationPrefix}`]: hasChildren,
        [`${pre}-dashed`]: !!dashed,
        [`${pre}-plain`]: !!plain,
        [`${pre}-rtl`]: direction.value === 'rtl',
        [`${pre}-no-default-orientation-margin-left`]: hasCustomMarginLeft,
        [`${pre}-no-default-orientation-margin-right`]: hasCustomMarginRight,
      };
    });

    const dividerStyle = computed<CSSProperties>(() => {
      const { orientation, orientationMargin } = props;
      const hasCustomMarginLeft = orientation === 'left' && orientationMargin != null;
      const hasCustomMarginRight = orientation === 'right' && orientationMargin != null;
      return {
        ...(hasCustomMarginLeft && { marginLeft: orientationMargin }),
        ...(hasCustomMarginRight && { marginRight: orientationMargin }),
      };
    });
    return () => {
      return (
        <div class={classes.value} {...attrs} role="separator">
          {slots.default && (
            <span class={`${prefixCls.value}-divider-inner-text`} style={dividerStyle.value}>
              {slots.default()}
            </span>
          )}
        </div>
      );
    };
  },
});
