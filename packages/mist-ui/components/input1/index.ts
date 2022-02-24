import Input from './Input';
import type { App, Plugin } from 'vue';
export * from './InputProps';
Input.install = (app: App) => {
  app.component(Input.name, Input);
  return app;
};

export default Input as typeof Input & Plugin & {};
