import { cloneVNode } from 'vue';
import { filterEmpty } from './props-util';

export function cloneElement(vnode: any, nodeProps = {}, override = true, mergeRef = false) {
  let ele = vnode;
  if (Array.isArray(vnode)) {
    ele = filterEmpty(vnode)[0];
  }
  if (!ele) {
    return null;
  }
  const node = cloneVNode(ele, nodeProps, mergeRef);
  node.props = override ? { ...node.props, ...nodeProps } : node.props;
  return node;
}

export function cloneVNodes(vnodes: any, nodeProps = {}, override = true) {
  return vnodes.map(vnode => cloneElement(vnode, nodeProps, override));
}
