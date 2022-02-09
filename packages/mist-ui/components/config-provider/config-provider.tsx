import { defineComponent, reactive } from "vue";
import {
  ConfigProviderProps,
  configProviderProps,
  useConfigProvider,
} from "./types";
export default defineComponent({
  name: "MConfigProvider",
  props: configProviderProps,
  setup(props, { slots }) {
    const configProvider = reactive<ConfigProviderProps>({
      ...props,
    });
    useConfigProvider(configProvider);
    return () => {
      return slots.default && slots.default();
    };
  },
});
