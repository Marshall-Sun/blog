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

本文囊括了 package.json 中所有需要知道的细节。需要注意的是，package.json 是一个纯 JSON 文件，而不是一个 JavaScript 对象。

本文中描述的许多行为都会被 [npm config](https://docs.npmjs.com/cli/v8/using-npm/config) 中的配置所影响。

## name

如果计划发布一个包，package.json 中最重要的字段就是 `name` 和 `version`，它们构成一个唯一标识符。对包的更改应该与对版本的更改一起出现。如果不计划发布这个包，那么 `name` 和 `version` 字段就是可选的。

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

版本号必须能够被 [node-semver](https://github.com/npm/node-semver) 解析，它作为依赖捆绑进了 npm 中。（可以通过 `npm install semver` 来体验它）

## description

类型：`string`

建议填写，描述文字会在 `npm search` 中列出，这有助于别人搜到这个包。

## keywords

类型：`string[]`

建议填写，关键字会在 `npm search` 中列出，这有助于别人搜到这个包。

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

建议填写，以便别人知道是否允许使用这个包，以及对使用施加的限制。

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

## 人员相关字段：author, contributors

```ts
type Person = string | {
  name: string;
  email?: string;
  url?: string;
};
```

author 类型：`Person`，contributors 类型：`Person[]`

当 Person 为 string 时，需要遵循以下例子的格式，Email 和 URL 仍可选：

```json
{
  "author": "Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"
}
```

npm 会使用你的 npm 账户信息来填写一个顶级的 `maintainers` 字段。

## funding

```ts
type Funding = string | {
  type: 'individual' | 'patreon';
  url: string;
};
```

类型：`Funding | Funding[]`

当 Person 为 string 时，内容为资助的 URL。

若提供了 projectname，那么就可以通过 `npm fund <projectname>` 来展示资助的 URL（funding 为数组时展示第一个）。

## files

可选字段，类型：`string[]`

files 字段是一个字符串数组，通过 [文件匹配模式](https://docs.microsoft.com/zh-cn/azure/devops/pipelines/tasks/file-matching-patterns) 匹配项目内文件，匹配到的文件将会被包含进项目中（除非在其他规则中已被忽略）。

> **💡提示**
>
> 可以在包的根目录或子目录下创建一个 `.npmignore` 文件来忽略已被匹配的文件。如果它在根目录，则不会覆盖 file 字段，但是在子目录就会覆盖。
>
> 它和 `.gitignore` 的功能很像，若 `.gitignore` 文件存在而 `.npmignore` 缺失，则系统会使用 `.gitignore` 的内容。
>
> file 字段中包含的文件不能通过 `.gitignore` 或者 `.npmignore` 来排除。

下面一些文件是默认配置包含 / 忽略的，无论是否出现在配置中：

| 包含 | 忽略 |
| --- | --- |
| package.json | .git |
| README | CVS |
| LICENSE / LICENCE | .svn |
| main 字段匹配的文件 | .hg |
|  | .lock-wscript |
|  | .wafpickle-N |
|  | .loc |
|  | .*.swp |
|  | .DS_Store |
|  | ._* |
|  | npm-debug.log |
|  | .npmrc |
|  | node_modules |
|  | config.gypi |
|  | *.orig |
|  | package-lock.json（若打算发布这个包，使用 [npm-shrinkwrap.json](https://docs.npmjs.com/cli/v8/configuring-npm/npm-shrinkwrap-json)） |

## main

可选字段，类型：`string`，默认值：`index.js`

main 字段是模块 ID，指定了模块的入口。就是说，如果包名是 foo，用户安装且调用了 `require("foo")`，则 main 字段指定的模块的导出对象会被返回。

这应该是一个相对于包根目录的模块标识。

## browser

如果打算在浏览器使用，则应使用 browser 字段而不是 main 字段。这有助于提示用户，这个包能够使用 Node.js 中不可用的原语。（例如 `window`）

## bin

许多包都有一个或多个可执行文件希望安装到 PATH 中。npm 使这非常容易。（事实上 npm 就是这么运行的）

bin 字段配置了这个功能，它是命令名称到本地文件名的映射。

当全局安装一个包时，该文件将链接到全局 bin 所在的位置，因此可以通过包名调用；当此包作为依赖项安装时，该文件将被链接到相应位置，可以直接通过 `npm exec` 或 `npm run-script` 调用它。

例如， myapp 可以有这个：

```json
{
  "bin": {
    "myapp": "./cli.js"
  }
}
```

因此，当安装 myapp 时，它会创建一个从 `cli.js` 脚本到 `/usr/local/bin/myapp` 的链接。

如果有一个可执行文件，并且它的名称是包名，那么可以将其作为字符串提供。例如：

```json
{
  "name": "my-program",
  "version": "1.2.5",
  "bin": "./path/to/program",

  // 与这个写法效果相同
  "bin": {
    "my-program": "./path/to/program"
  }
}
```

请确保在 bin 中引用的文件以 `#!/usr/bin/env` 节点开头，否则脚本将会在没有节点可执行文件的情况下启动！

还可以使用 [directories.bin](#directories-bin) 设置可执行文件。

有关可执行文件的更多信息，请参阅 [folders](https://docs.npmjs.com/cli/v8/configuring-npm/folders)。

## man

类型：`string | string[]`

指定单个文件或文件名数组以供 `man` 命令使用。

如果字段类型是 string，那么无论它的实际文件名如何，它都是 `man <pkgname>` 的结果。例如：

```json
{
  "man": "./man/doc.1"
}
```

上面这个配置在执行 `man foo` 时，就会使用 `./man/doc.1` 这个文件。

如果文件名不以包名开头，那么它会被冠以前缀。举例：

```json
{
  "man": [
    "./man/foo.1",
    "./man/bar.1"
  ]
}
```

将创建文件来执行 `man foo` 和 `man foo-bar`。

man 文件必须以数字结尾，如果被压缩，还可以选择 `.gz` 后缀。数字指示文件安装到哪个 man 部分：

```json
{
  "man": [
    "./man/foo.1",
    "./man/bar.2"
  ]
}
```

将为 `man foo` 和 `man 2 foo` 而创建。

## directories

CommonJS 包规范详细介绍了几种使用 directories 对象表示包结构的方法。如果你查看 [npm 的 package.json](https://registry.npmjs.org/npm/latest)，会看到它包含 doc、lib 和 man 的目录。

### directories.bin

如果在 `directories.bin` 中指定一个 `bin` 目录，则该文件夹中的所有文件都将被添加。

由于 `bin` 指令的工作方式，同时指定 `bin` 路径和设置 `directory.bin` 是错误的。如果要指定单个文件，使用 `bin`；对于现有 `bin` 目录中的所有文件，使用 `directory.bin`。

### directories.man

一个充满[手册页（man page）](https://zh.wikipedia.org/zh-cn/%E6%89%8B%E5%86%8C%E9%A1%B5)的文件夹。Sugar 通过遍历文件夹来生成一个手册数组。

## repository

类型：`object | string`

指定代码所在的位置，这能帮助想贡献代码的用户。举例：

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/npm/cli.git"
  }
}
```

该 URL 应该是一个公开的（可能是只读的）URL，可以直接交给 VCS 程序而无需任何修改。它不应该是放在浏览器中的 HTML 项目页面的 URL，是给电脑用的。

对于 GitHub、GitHub gist、Bitbucket 或 GitLab 存储库，可以使用与 `npm install` 相同的快捷方式语法：

```json
{
  "repository": "npm/npm",
  "repository": "github:user/repo",
  "repository": "gist:11081aaa281",
  "repository": "bitbucket:user/repo",
  "repository": "gitlab:user/repo"
}
```

如果包的 `package.json` 不在根目录中（例如它是 monorepo 的一部分），那么也可以指定它所在的目录：

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/facebook/react.git",
    "directory": "packages/react-dom"
  }
}
```

## scripts

这个字段是一个由脚本命令构成的 Map，键是生命周期事件名，值是要运行的命令。

参阅 [scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts) 以了解有关编写包脚本的更多信息。

## config

可用于配置包中的跨版本参数。例如一个包有以下内容：

```json
{
  "name": "foo",
  "config": {
    "port": "8080"
  }
}
```

它还可以有一个引用 `npm_package_config` 端口环境变量的 `start` 命令。

## dependencies

dependencies 字段是一个 Map，它指定了依赖的包名和其版本范围。版本范围是有一个或多个空白分隔描述符的字符串。它也可以用 [tar 包](https://zhuanlan.zhihu.com/p/54144904)或者 git URL 来标识。

**请不要将测试性的依赖、编译工具或其他过渡性的依赖放到 dependencies 中。** 具体可参考下文的 devDependencies。