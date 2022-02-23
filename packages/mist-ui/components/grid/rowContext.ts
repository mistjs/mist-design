import { computed, ComputedRef, inject, provide, ref } from 'vue';
import type { Ref, InjectionKey } from 'vue';

export interface RowContext {
  gutter?: ComputedRef<[number, number]>;
  wrap?: Ref<boolean>;
  supportFlexGap?: ComputedRef<boolean>;
}

export const RowContextKey: InjectionKey<RowContext> = Symbol('rowContextKey');

const useProvideRow = (state: RowContext) => {
  provide(RowContextKey, state);
};

const useInjectRow = () => {
  return inject(RowContextKey, {
    gutter: computed(() => undefined),
    wrap: ref(undefined),
    supportFlexGap: computed(() => undefined),
  });
};
export { useInjectRow, useProvideRow };
export default useProvideRow;
