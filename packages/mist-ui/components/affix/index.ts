import Affix from './affix';
import { App, Plugin } from 'vue';

export * from './types';
Affix.install = (app: App) => {
  app.component(Affix.name, Affix);
  return app;
};

export default Affix as typeof Affix & Plugin;
