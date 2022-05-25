import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Sun's Blog",
  description: "一个普通的博客",
  shouldPrefetch: false,
  theme,
});
