---
icon: edit
date: 2022-05-26
tag:
  - 译文
  - 文档
  - npm
---

# package.json 详解

## 前言

本文囊括了 package.json 中所有你需要知道的细节。需要注意的是，package.json 是一个纯 JSON 文件，而不是一个 JavaScript 对象。

本文中描述的许多行为都会被 [npm config](https://docs.npmjs.com/cli/v8/using-npm/config) 中的配置所影响。

## name

如果你计划发布一个包，package.json 中最重要的字段就是 `name` 和 `version`，它们构成一个唯一标识符。对包的更改应该与对版本的更改一起出现。如果你不计划发布这个包，那么 `name` 和 `version` 字段就是可选的。

`name` 字段的含义就是 npm 包名，不需要过多解释。

一些命名规则：

- 长度必须小于等于 214 个字符。这其中包含[作用域](https://docs.npmjs.com/cli/v8/using-npm/scope)的长度。

- 当且仅当这个包是作用域包时，`name` 可以以点或下划线开头。

- 不能有大写字母。

- 不能包含任何非 URL 安全字符。因为它会成为 URL 的一部分、命令行参数和文件夹名称。

一些命名建议：

- 不要使用与 Node.js 核心模块相同的名称。

- `name` 中不需要包含 "js" 或者 "node" ，这会假定这个包是 JavaScript。可以用 package.json 中的 `engine` 字段指定解释器引擎。（见下文）

- `name` 可能会作为参数传递给 `require()`，所以它应该简短，但也要具有合理的描述性。

- 在命名之前检查 npm 源，看看这个包是否重名。

## version

版本号必须能够被 [node-semver](https://github.com/npm/node-semver) 解析，它作为依赖捆绑进了 npm 中。(可以通过 `npm install semver` 来体验它)

## description

类型：`string`

建议填写，描述文字会在 `npm search` 中列出，这有助于别人搜到你的包。

## keywords

类型：`string[]`

建议填写，关键字会在 `npm search` 中列出，这有助于别人搜到你的包。

## homepage

项目主页链接。

## bugs

类型：`object | string`

可包含项目的 Issue 页和相关的 Email，这能帮助想反馈问题的用户。举例：

```json
{
  "url": "https://github.com/owner/project/issues",
  "email": "project@hostname.com"
}
```

可以指定其中一到两个值。也可以直接指定为一个字符串，而不是一个对象。

如果提供了 URL，它将被 `npm bug` 命令使用。

## license

类型：`string`

建议填写，以便别人知道是否允许使用这个包，以及你对使用施加的限制。

可以查看 [SPDX 许可证的完整列表](https://spdx.org/licenses) ，推荐选择一个 OSI 认可的许可证。同时，语法应该遵循 [SPDX 许可证表达式语法](https://npmjs.com/package/spdx)。

```json
{
  // 一般情况，使用了 MIT 许可证
  "license": "MIT",

  // 使用多个许可证
  "license": "(ISC OR GPL-3.0)",

  // 使用自定义许可证
  "license": "SEE LICENSE IN <filename>",

  // 不授予许可证，考虑同时使用 private 字段（见下文）
  "license": "UNLICENSED",
}
```

> **💡提示：** 有的旧包中的 license 是一个对象，也有一些旧包使用了 licenses 数组，这些方式都已被弃用。新的包中的 license 字段应该遵循 SPDX 许可证表达式语法。