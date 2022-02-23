import { computed, CSSProperties, defineComponent, toRefs } from 'vue';
import { colProps } from './types';
import { useConfigInject } from '../config-provider';
import { FlexType, ColSize } from './types';
import { useInjectRow } from './rowContext';
import { omit } from 'lodash';
function parseFlex(flex: FlexType): string {
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`;
  }

  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`;
  }

  return flex;
}
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
export default defineComponent({
  name: 'MCol',
  props: colProps,
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = toRefs(useConfigInject());
    const { gutter, wrap, supportFlexGap } = useInjectRow();
    const classes = computed(() => {
      const { span, offset, order, pull, push, ...others } = props;
      const pre = prefixCls.value + '-col';
      let sizeClassObj = {};
      if ('flex' in others) {
        delete others['flex'];
      }
      sizes.forEach(size => {
        let sizeProps: ColSize = {};
        const propSize = props[size];
        if (typeof propSize === 'number') {
          sizeProps.span = propSize;
        } else if (typeof propSize === 'object') {
          sizeProps = propSize || {};
        }

        delete others[size];

        sizeClassObj = {
          ...sizeClassObj,
          [`${pre}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
          [`${pre}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
          [`${pre}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
          [`${pre}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
          [`${pre}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
          [`${pre}-rtl`]: direction.value === 'rtl',
        };
      });
      return {
        [`${pre}`]: true,
        [`${pre}-${span}`]: span !== undefined,
        [`${pre}-order-${order}`]: order,
        [`${pre}-offset-${offset}`]: offset,
        [`${pre}-push-${push}`]: push,
        [`${pre}-pull-${pull}`]: pull,
        ...sizeClassObj,
      };
    });
    const mergedStyle = computed<CSSProperties>(() => {
      const { flex } = props;
      const mergedStyle: CSSProperties = {};
      if (gutter.value && gutter.value[0] > 0) {
        const horizontalGutter = gutter.value[0] / 2;
        mergedStyle.paddingLeft = horizontalGutter ? `${horizontalGutter}px` : undefined;
        mergedStyle.paddingRight = horizontalGutter ? `${horizontalGutter}px` : undefined;
      }
      // Vertical gutter use padding when gap not support
      if (gutter.value && gutter.value[1] > 0 && !supportFlexGap.value) {
        const verticalGutter = gutter.value[1] / 2;
        mergedStyle.paddingTop = verticalGutter ? `${verticalGutter}px` : undefined;
        mergedStyle.paddingBottom = verticalGutter ? `${verticalGutter}px` : undefined;
      }
      if (flex) {
        mergedStyle.flex = parseFlex(flex);

        // Hack for Firefox to avoid size issue
        // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
        if (wrap.value === false && !mergedStyle.minWidth) {
          mergedStyle.minWidth = 0;
        }
      }

      return mergedStyle;
    });
    const attrs1 = omit(attrs, ['class']);
    return () => {
      return (
        <div style={mergedStyle.value} class={classes.value} {...attrs1}>
          {slots?.default()}
        </div>
      );
    };
  },
});
