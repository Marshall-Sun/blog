import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  hostname: "https://sun-blog.netlify.app",
  author: {
    name: "Marshall Sun",
  },
  iconAssets: "//at.alicdn.com/t/font_2410206_a0xb9hku9iu.css",
  logo: "/logo.svg",

  repo: "Marshall-Sun/blog",
  docsDir: "docs",
  docsBranch: "master",

  navbar: [],
  sidebar: false,

  footer: "Copyright © 2022 Marshall Sun",
  copyright: false,
  displayFooter: true,

  pageInfo: ["Author", "Date", "Tag", "ReadingTime", "Word"],

  blog: {
    description: "一个普通的前端",
    medias: {
      Email: "mailto:themarshallsun@gmail.com",
      GitHub: "https://github.com/Marshall-Sun",
    },
  },

  themeColor: false,
  fullscreen: false,

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
