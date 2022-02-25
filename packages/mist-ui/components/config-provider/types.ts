import { ExtractPropTypes, inject, PropType, provide, reactive } from 'vue';

export const MIST_CONFIG_PROVIDER_SYMBOL = Symbol('MIST_CONFIG_PROVIDER_SYMBOL');

export type DirectionType = 'rtl' | 'ltr' | undefined;

export type SizeType = 'small' | 'middle' | 'large' | undefined;

export interface ThemeColorConfig {
  default?: string;
  hover?: string;
  active?: string;
  outline?: string;
  1?: string;
  2?: string;
  3?: string;
  4?: string;
  5?: string;
  6?: string;
  7?: string;
  'deprecated-pure'?: string;
  'deprecated-l-35'?: string;
  'deprecated-l-20'?: string;
  'deprecated-t-20'?: string;
  'deprecated-t-50'?: string;
  'deprecated-f-12'?: string;
  'active-deprecated-f-30'?: string;
  'active-deprecated-d-02'?: string;
  'deprecated-bg'?: string;
  'deprecated-border'?: string;
}

export type OtherThemeColor = Pick<
  ThemeColorConfig,
  'hover' & 'active' & 'outline' & 'deprecated-border' & 'deprecated-bg' & 'default'
>;

export interface ThemeColor {
  primary?: Omit<ThemeColorConfig, 'deprecated-bg' & 'deprecated-border'>;
  success?: OtherThemeColor;
  error?: OtherThemeColor;
  warning?: OtherThemeColor;
}

export interface ConfigProviderThemeOptions {
  dark?: boolean;
  darkTheme?: ThemeColor;
  theme?: ThemeColor;
}

export const configProviderProps = {
  locale: {
    type: String,
    default: 'zh-CN',
  },
  prefixCls: {
    type: String,
    default: 'mist',
  },
  theme: {
    type: Object as PropType<ConfigProviderThemeOptions>,
    default: () => ({
      dark: false,
    }),
  },
  direction: {
    type: String as PropType<DirectionType>,
    default: 'ltr',
  },
  autoInsertSpaceInButton: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<SizeType>,
    default: undefined,
  },
  input: {
    type: Object as PropType<{ autocomplete: string }>,
    default: undefined,
  },
};

export type ConfigProviderProps = Partial<ExtractPropTypes<typeof configProviderProps>>;

const defaultConfigInject = reactive<ConfigProviderProps>({
  prefixCls: 'mist',
  locale: 'zh-CN',
  theme: {
    dark: false,
  },
  direction: 'ltr',
  autoInsertSpaceInButton: true,
  input: {
    autocomplete: undefined,
  },
  size: undefined,
});

export const useConfigProvider = (provider: ConfigProviderProps) => {
  provide<ConfigProviderProps>(MIST_CONFIG_PROVIDER_SYMBOL, provider);
};

export const useConfigInject = (): ConfigProviderProps => {
  return inject<ConfigProviderProps>(MIST_CONFIG_PROVIDER_SYMBOL, defaultConfigInject);
};
