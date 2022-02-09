import { ExtractPropTypes, inject, provide, reactive } from "vue";

export const MIST_CONFIG_PROVIDER_SYMBOL = Symbol(
  "MIST_CONFIG_PROVIDER_SYMBOL"
);

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
};

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;

export const useConfigProvider = (provider: ConfigProviderProps) => {
  provide<ConfigProviderProps>(MIST_CONFIG_PROVIDER_SYMBOL, provider);
};

const defaultConfigInject = reactive<Partial<ConfigProviderProps>>({
  prefixCls: "mist",
  locale: "zh-CN",
  theme: {},
});

export const useConfigInject = (): Partial<ConfigProviderProps> => {
  return inject<Partial<ConfigProviderProps>>(
    MIST_CONFIG_PROVIDER_SYMBOL,
    defaultConfigInject
  );
};
