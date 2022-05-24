import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";

export default hopeTheme({
  hostname: "https://vuepress-theme-hope-v2-demo.mrhope.site",

  author: {
    name: "Marshall Sun",
    url: "https://mrhope.site",
  },

  iconAssets: "//at.alicdn.com/t/font_2410206_a0xb9hku9iu.css",

  logo: "/logo.svg",

  repo: "vuepress-theme-hope/vuepress-theme-hope",

  docsDir: "demo/src",

  navbar: navbar,
  sidebar: false,

  footer: "Copyright © 2022 Marshall Sun",
  copyright: false,
  displayFooter: true,

  pageInfo: ["Author", "Date", "Tag", "ReadingTime", "Word"],

  blog: {
    description: "一个普通的前端",
    intro: "/intro.html",
    medias: {
      Email: "https://example.com",
      GitHub: "https://example.com",
    },
  },

  themeColor: false,
  fullscreen: false,
  pure: true,

  plugins: {
    blog: {
      autoExcerpt: true,
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
