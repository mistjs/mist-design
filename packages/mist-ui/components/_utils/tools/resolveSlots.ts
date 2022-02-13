import { Fragment, isVNode, VNode, Slots } from "vue";

export const getScopedSlots = (element: any) => {
  return (element.data && element.data.scopedSlots) || {};
};

export const getPropsSlot = (slots: Slots, props: any, prop = "default") => {
  return props[prop] ?? slots[prop]?.();
};

export const flattenChildren = (children = [], filterEmpty = true) => {
  const temp = Array.isArray(children) ? children : [children];
  const res = [];
  temp.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty));
    } else if (child && child.type === Fragment) {
      res.push(...flattenChildren(child.children, filterEmpty));
    } else if (child && isVNode(child)) {
      if (filterEmpty && !isEmptyElement(child)) {
        res.push(child);
      } else if (!filterEmpty) {
        res.push(child);
      }
    } else if (isValid(child)) {
      res.push(child);
    }
  });
  return res;
};

export const isValid = (value: any): boolean => {
  return value !== undefined && value !== null && value !== "";
};

export const isEmptyElement = (c?: VNode) => {
  return (
    c &&
    (c.type === Comment ||
      (c.type === Fragment && c.children.length === 0) ||
      (c.type === Text && typeof c.children === "string" && c.children?.trim()))
  );
};
