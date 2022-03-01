import InputNumber from './input-number';
import type { App, Plugin } from 'vue';

InputNumber.install = (app: App) => {
  app.component(InputNumber.name, InputNumber);
  return app;
};

export default InputNumber as typeof InputNumber & Plugin;
