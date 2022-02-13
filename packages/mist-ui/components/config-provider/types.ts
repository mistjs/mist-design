import { ExtractPropTypes, inject, PropType, provide, reactive } from "vue";

export const MIST_CONFIG_PROVIDER_SYMBOL = Symbol(
  "MIST_CONFIG_PROVIDER_SYMBOL"
);

export type DirectionType = "rtl" | "ltr";
export const configProviderProps = {
  locale: {
    type: String,
    default: "zh-CN",
  },
  prefixCls: {
    type: String,
    default: "mist",
  },
  theme: {
    type: Object,
    default: () => ({}),
  },
  direction: {
    type: String as PropType<DirectionType>,
    default: "ltr",
  },
  autoInsertSpace: {
    type: Boolean,
    default: true,
  },
};

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;

export const useConfigProvider = (provider: ConfigProviderProps) => {
  provide<ConfigProviderProps>(MIST_CONFIG_PROVIDER_SYMBOL, provider);
};

const defaultConfigInject = reactive<Partial<ConfigProviderProps>>({
  prefixCls: "mist",
  locale: "zh-CN",
  theme: {},
  direction: "ltr",
  autoInsertSpace: true,
});

export const useConfigInject = (): Partial<ConfigProviderProps> => {
  return inject<Partial<ConfigProviderProps>>(
    MIST_CONFIG_PROVIDER_SYMBOL,
    defaultConfigInject
  );
};
