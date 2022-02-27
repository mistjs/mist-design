import Input from './Input';
import type { App, Plugin } from 'vue';
import Password from './password';
import Search from './search';
import Textarea from './textarea';
import Group from './group';
export * from './InputProps';

Input.Password = Password;
Input.Search = Search;
Input.TextArea = Textarea;
Input.Group = Group;
export { Password as InputPassword };
Input.install = (app: App) => {
  app.component(Input.name, Input);
  app.component(Password.name, Password);
  app.component(Search.name, Search);
  app.component(Textarea.name, Textarea);
  app.component(Group.name, Group);
  return app;
};

export default Input as typeof Input &
  Plugin & {
    readonly Password: typeof Password;
    readonly Search: typeof Search;
    readonly TextArea: typeof Textarea;
    readonly Group: typeof Group;
  };
