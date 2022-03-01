import { Fragment, Slot, VNode } from 'vue';
import type { PropType } from 'vue';
import type { VueTypeValidableDef, VueTypeDef } from 'vue-types';

export function isFragment(c) {
  return c.length === 1 && c[0].type === Fragment;
}
export function isEmptyElement(c: any) {
  return (
    c &&
    (c.type === Comment ||
      (c.type === Fragment && c.children.length === 0) ||
      (c.type === Text && c.children.trim() === ''))
  );
}

export function filterEmpty(children = []) {
  const res = [];
  children.forEach(child => {
    if (Array.isArray(child)) {
      res.push(...child);
    } else if (child.type === Fragment) {
      res.push(...child.children);
    } else {
      res.push(child);
    }
  });
  return res.filter(c => !isEmptyElement(c));
}

export type PropsVNode = VNode | Slot | VNode[];

export function isValidValue(val: any) {
  return val !== undefined && val !== null;
}

export const initDefaultProps = <T>(
  types: T,
  defaultProps: {
    [K in keyof T]?: T[K] extends VueTypeValidableDef<infer U>
      ? U
      : T[K] extends VueTypeDef<infer U>
      ? U
      : T[K] extends { type: PropType<infer U> }
      ? U
      : any;
  },
): T => {
  const propTypes: T = { ...types };
  Object.keys(defaultProps).forEach(k => {
    const prop = propTypes[k] as VueTypeValidableDef;
    if (prop) {
      if (prop.type || prop.default) {
        prop.default = defaultProps[k];
      } else if (prop.def) {
        prop.def(defaultProps[k]);
      } else {
        propTypes[k] = { type: prop, default: defaultProps[k] };
      }
    } else {
      throw new Error(`not have ${k} prop`);
    }
  });
  return propTypes;
};
