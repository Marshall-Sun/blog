import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  hostname: "https://sun-blog.netlify.app",
  author: {
    name: "Marshall Sun",
  },
  iconAssets: "//at.alicdn.com/t/font_2410206_a0xb9hku9iu.css",
  logo: "/logo.png",

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
    mdEnhance: false,
    pwa: {
      favicon: "/favicon.ico",
      themeColor: "#88c535",
      manifest: {
        name: "Sun's Blog",
        short_name: "Sun's Blog",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#88c535",
        background_color: "#88c535",
        start_url: "https://sun-blog.netlify.app",
        display: "standalone",
      },
      apple: {
        icon: "/apple-touch-icon.png",
        maskIcon: "/safari-pinned-tab.svg",
      },
      msTile: {
        image: "/mstile-150x150.png",
      }
    },
  },
});
