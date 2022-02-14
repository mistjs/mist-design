import Button from "./button";
import ButtonGroup from "./button-group";
import { App, Plugin } from "vue";

Button.install = (app: App) => {
  app.component(Button.name, Button);
  app.component(ButtonGroup.name, ButtonGroup);
  return app;
};

export default Button as typeof Button &
  Plugin & {
    readonly Group: typeof ButtonGroup;
  };
