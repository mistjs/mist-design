import ConfigProvider from './config-provider';
import { App, Plugin } from 'vue';

export * from './types';

ConfigProvider.install = (app: App) => {
  app.component(ConfigProvider.name, ConfigProvider);
  return app;
};

export default ConfigProvider as typeof ConfigProvider & Plugin;
