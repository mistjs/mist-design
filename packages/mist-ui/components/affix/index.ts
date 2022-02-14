import Affix from "./affix";
import { App } from "vue";

Affix.install = (app: App) => {
  app.component(Affix.name, Affix);
  return app;
};

export default Affix as typeof Affix & Plugin;
