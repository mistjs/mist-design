import { inject, provide, shallowRef } from 'vue';
import type { Ref } from 'vue';

export const SpaceContextKey = Symbol('SpaceContextKey');

export interface SpaceContext {
  supportFlexGap: Ref<boolean>;
  latestIndex: Ref<number>;
  verticalSize: Ref<number>;
  horizontalSize: Ref<number>;
}

export const useSpaceProvide = (context: SpaceContext) => {
  provide<SpaceContext>(SpaceContextKey, context);
};

export const useSpaceInject = (): SpaceContext => {
  return inject<SpaceContext>(SpaceContextKey, {
    supportFlexGap: shallowRef(false),
    latestIndex: shallowRef(0),
    verticalSize: shallowRef(0),
    horizontalSize: shallowRef(0),
  });
};
