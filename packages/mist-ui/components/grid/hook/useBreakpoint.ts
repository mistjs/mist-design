import type { Ref } from "vue";
import { onMounted, onUnmounted, ref } from "vue";

import type { ScreenMap } from "../../_utils/tools/responsiveObserve";
import ResponsiveObserve from "../../_utils/tools/responsiveObserve";
function useBreakpoint(): Ref<ScreenMap> {
  const screens = ref<ScreenMap>({});
  let token = null;
  onMounted(() => {
    token = ResponsiveObserve.subscribe((screen) => {
      screens.value = screen;
    });
  });
  onUnmounted(() => {
    ResponsiveObserve.unsubscribe(token);
  });
  return screens;
}

export default useBreakpoint;
