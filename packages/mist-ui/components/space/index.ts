import Space from './space';
import type { App, Plugin } from 'vue';
export * from './types';

Space.install = (app: App) => {
  app.component(Space.name, Space);
  return app;
};

export default Space as typeof Space & Plugin;
