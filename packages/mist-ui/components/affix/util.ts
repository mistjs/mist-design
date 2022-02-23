import { Ref } from 'vue';

export const getScrollContainer = (scrollContainer: Ref<Window | HTMLElement>) => {
  if (scrollContainer.value === window) {
    return document.documentElement;
  } else {
    return scrollContainer.value;
  }
};
export type Rect = ClientRect | DOMRect;
export const getTargetNode = (target: Ref<Window | HTMLElement>): Rect => {
  if (target.value !== window) {
    return (target.value as HTMLElement).getBoundingClientRect();
  } else {
    return { top: 0, bottom: window.innerHeight } as ClientRect;
  }
};

// 获取位移的位置顶部的信息
export const getFixedTop = (
  placeholderReact: Rect,
  targetRect: Rect,
  offsetTop: number | undefined,
) => {
  // TODO
  if (offsetTop !== undefined && targetRect.top > placeholderReact.top - offsetTop) {
    return `${offsetTop + targetRect.top}px`;
  }
  return undefined;
};

// 获取位移位置底部的信息
export const getFixedBottom = (
  placeholderReact: Rect,
  targetRect: Rect,
  offsetBottom: number | undefined,
) => {
  // TODO
  if (offsetBottom !== undefined && targetRect.bottom < placeholderReact.bottom + offsetBottom) {
    const targetBottomOffset = window.innerHeight - targetRect.bottom;
    if (targetBottomOffset < 0) return undefined;
    return `${offsetBottom + targetBottomOffset}px`;
  }
  return undefined;
};
