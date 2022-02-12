import co from "co";
import { filterMonorepoPkg } from "../../common";
import minimist from "minimist";
co(function* () {
  const data = minimist(process.argv.slice(2));
  let source;
  if (data.name) {
    source = yield filterMonorepoPkg(data.name);
  } else {
    source = yield filterMonorepoPkg();
  }
  if (source !== false) {
    source = JSON.stringify(source);
  }
  console.log(source);
}).then(() => {
  //TODO
});
