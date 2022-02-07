import * as components from "./components";
import { App } from "vue";

export * from "./components";

export const install = function (app: App) {
  Object.keys(components).forEach((key) => {
    // @ts-ignore
    const component = components[key];
    if (component.install) {
      app.use(component);
    }
  });

  return app;
};

export default {
  install,
};
