import { defineClientAppEnhance } from "@vuepress/client";
import mistUI from "mist-ui";
import "mist-ui/style.ts";
import "./custom.css";

export default defineClientAppEnhance(({ app }) => {
  app.use(mistUI);
});
