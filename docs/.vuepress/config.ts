import { defineUserConfig } from "vuepress"
import type { ViteBundlerOptions,DefaultThemeOptions } from "vuepress"
import vueJsx from "@vitejs/plugin-vue-jsx";
export default defineUserConfig<DefaultThemeOptions,ViteBundlerOptions>({
    locales:{
        '/':{
            lang:"zh-CN",
            title:"mist-ui"
        }
    },
    lang:"zh-CN",
    bundlerConfig: {
        viteOptions: {
            server: {
                fs: {
                    strict: false,
                },
            },
            plugins: [vueJsx()],
        },
    },
    themeConfig:{
        repo:"mistjs/mist-design",
        logo:"/logo.svg",
        locales:{
            '/':{
                lastUpdatedText:"最后更新时间",
                contributorsText:"贡献者",
                editLinkText: '在 GitHub 上编辑此页',
            },
        }
    },
    plugins:[
        ['@yanyu-fe/vuepress-plugin-code-block', {}],
        [
            '@vuepress/plugin-search',
            {
                locales:{
                    '/':{
                        placeholder:"搜索"
                    }
                }
            }
        ],
    ]
})
