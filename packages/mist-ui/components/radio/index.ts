import Radio from './radio';
import RadioButton from './radio-button';
import RadioGroup from './group';
import type { App, Plugin } from 'vue';

Radio.Group = RadioGroup;
Radio.Button = RadioButton;

Radio.install = (app: App) => {
  app.component(Radio.name, Radio);
  app.component(RadioGroup.name, RadioGroup);
  app.component(RadioButton.name, RadioButton);
  return app;
};

export { RadioButton, RadioGroup };

export default Radio as typeof Radio & Plugin;
