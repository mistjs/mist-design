import { defineComponent } from "vue";
import MWave from "../_utils/wave";
export default defineComponent({
  name: "MButton",
  setup(_props, { slots }) {
    return () => {
      return (
        <MWave>
          <button>{slots.default && slots.default()}</button>
        </MWave>
      );
    };
  },
});
