import Select from './select';
import type { App, Plugin } from 'vue';

Select.install = function (app: App) {
  app.component(Select.name, Select);
  return app;
};

export default Select as typeof Select & Plugin & {};
