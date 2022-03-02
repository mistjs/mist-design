import Checkbox from './checkbox';
import Group from './group';
import type { App, Plugin } from 'vue';

Checkbox.Group = Group;

Checkbox.install = (app: App) => {
  app.component(Checkbox.name, Checkbox);
  app.component(Group.name, Group);
  return app;
};

export { Group as CheckboxGroup };

export default Checkbox as typeof Checkbox &
  Plugin & {
    readonly Group: typeof Group;
  };
