import { ComponentInternalInstance } from "vue";

export const findDOMNode = (instance: ComponentInternalInstance | null) => {
  let node =
    instance?.vnode.el || (instance && ((instance as any).ctx.$el || instance));
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
};

export const isHidden = (element: any) => {
  return !element || element.offsetParent === null;
};

export const isNotGrey = (color: string) => {
  const match = (color || "").match(/rgba?\((\d*), (\d*), (\d*)(, [.\d]*)?\)/);
  if (match && match[1] && match[2] && match[3]) {
    return !(match[1] === match[2] && match[2] === match[3]);
  }
  return true;
};
