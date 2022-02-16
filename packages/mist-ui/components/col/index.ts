import { Col } from "../grid";
import { App, Plugin } from "vue";

Col.install = (app: App) => {
  app.component(Col.name, Col);
  return app;
};

export default Col as typeof Col & Plugin;
