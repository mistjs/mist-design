import { defineUserConfig } from "vuepress";
import type { ViteBundlerOptions, DefaultThemeOptions } from "vuepress";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import * as navbar from "./configs/navbar";
import * as sidebar from "./configs/sidebar";
export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  locales: {
    "/": {
      lang: "zh-CN",
      title: "mist-ui",
    },
  },
  lang: "zh-CN",
  bundlerConfig: {
    viteOptions: {
      server: {
        fs: {
          strict: false,
        },
      },
      resolve: {
        alias: {
          "mist-ui": resolve(__dirname, "../../packages/mist-ui/components"),
          "mist-ui/es": resolve(__dirname, "../../packages/mist-ui/components"),
        },
      },
      plugins: [vueJsx()],
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
          },
        },
      },
    },
  },
  themeConfig: {
    repo: "mistjs/mist-design",
    logo: "/logo.svg",
    locales: {
      "/": {
        lastUpdatedText: "最后更新时间",
        contributorsText: "贡献者",
        editLinkText: "在 GitHub 上编辑此页",
        navbar: navbar.zh,
        sidebar: sidebar.zh,
      },
    },
  },
  plugins: [
    ["@yanyu-fe/vuepress-plugin-code-block", {}],
    [
      "@vuepress/plugin-search",
      {
        locales: {
          "/": {
            placeholder: "搜索",
          },
        },
      },
    ],
  ],
});
