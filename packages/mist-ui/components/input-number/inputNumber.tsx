import { defineComponent } from 'vue';
import inputNumberProps from './types';
import VcInputNumber from './src/InputNumber';
export default defineComponent({
  name: 'MInputNumber',
  props: inputNumberProps,
  setup(props) {
    return () => {
      return <></>;
    };
  },
});
