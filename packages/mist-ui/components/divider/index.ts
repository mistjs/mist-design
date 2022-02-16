import Divider from "./divider";
import { App, Plugin } from "vue";

export * from "./types";

Divider.install = (app: App) => {
  app.component(Divider.name, Divider);
  return app;
};

export default Divider as typeof Divider & Plugin;
