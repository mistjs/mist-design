import { defineClientAppEnhance } from "@vuepress/client"
// @ts-ignore
import mistUI from "mist-ui";
export default defineClientAppEnhance(({ app }) => {
    app.use(mistUI);
})
