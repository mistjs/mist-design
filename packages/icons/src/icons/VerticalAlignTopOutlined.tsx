// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import { FunctionalComponent } from 'vue';
import VerticalAlignTopOutlinedSvg from '@ant-design/icons-svg/lib/asn/VerticalAlignTopOutlined';
import AntdIcon, { AntdIconProps } from '../components/AntdIcon';

export interface VerticalAlignTopOutlinedIconType extends FunctionalComponent<AntdIconProps> {
  displayName: string;
}

const VerticalAlignTopOutlined: VerticalAlignTopOutlinedIconType = (props, context) => {
  const p = { ...props, ...context.attrs };
  return <AntdIcon {...p} icon={VerticalAlignTopOutlinedSvg}></AntdIcon>;
};

VerticalAlignTopOutlined.displayName = 'VerticalAlignTopOutlined';
VerticalAlignTopOutlined.inheritAttrs = false;
export default VerticalAlignTopOutlined;
