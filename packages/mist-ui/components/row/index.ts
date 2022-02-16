import { Row } from "../grid";
import { App, Plugin } from "vue";

Row.install = (app: App) => {
  app.component(Row.name, Row);
  return app;
};

export default Row as typeof Row & Plugin;
