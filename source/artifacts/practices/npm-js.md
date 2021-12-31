---
title: 使用 npm 仓库管理 Javascript 私有依赖包 - CODING 帮助中心
pageTitle: 使用 npm 仓库管理 Javascript 私有依赖包
pagePrevTitle: 搭建团队级制品库
pagePrev: artifacts/practices/team-share.html
pageNextTitle: 词汇表
pageNext: artifacts/glossary.html
alias: best-practices/artifacts/npm-js.html
---

### 前言

在日常的前端开发工作中，可能会遇到这样的问题，建立新的项目的时候，需要用到其他项目中的某个模块的代码，如果每次都通过复制粘贴的形式把代码拷贝到新项目，会出现这样的情况，某个项目更新了这个公共模块，那么其他的项目可能都需要去同步这个公共模块的代码，随着项目数量增加，代码增加，管理也越来越混乱。

为此，我们可以建立一个私有的 npm 仓库，然后把这些公共模块以 npm 包的形式发布在私有的 npm 库上，其他项目想要使用的时候直接以 npm 包形式引入即可。

接下来，我们看一下如何在 CODING 中发布一个 npm 包。

### 准备阶段

-   本地需提前安装好 [node](https://nodejs.org) ，根据自己习惯可选择性安装 [yarn](https://yarnpkg.com)

步骤一：创建一个 npm 类型的制品仓库

-   进入项目，在左侧栏选择【制品库】，再点击【创建仓库】。

![](https://help-assets.codehub.cn/enterprise/20200930162153.png)

-   仓库类型选中 npm，并填写仓库名称

![](https://help-assets.codehub.cn/enterprise/20200930162223.png)

-   根据实际情况设置该仓库的权限以及代理。

![](https://help-assets.codehub.cn/enterprise/20200930171358.png)

**对于权限以及代理的具体介绍可点击下方的链接查看**

-   [制品库权限](/docs/artifacts/permission.html)
-   [制品代理](/docs/artifacts/proxy.html)
<br />

-   准备就绪，点击【确认】

![](https://help-assets.codehub.cn/enterprise/20200930171431.png)

### 配置凭证信息

以下介绍两种配置凭证信息的方式，[点击此处可查看所有认证方式](/docs/artifacts/auth.html)

方式一：使用访问令牌生成凭证

-   在仓库的指引页面中，点击【使用访问令牌生成配置】

![](https://help-assets.codehub.cn/enterprise/20200930171827.png)

-   随后在弹出框中输入 CODING 账号的登录密码

![](https://help-assets.codehub.cn/enterprise/20200930171838.png)

-   复制弹窗中的凭证信息，并将其添加到您项目的 `package.json` 同一级目录下的 `.npmrc` 文件。

![](https://help-assets.codehub.cn/enterprise/20200930171854.png)

方式二：使用交互式命令行设置凭证

-   执行 npm config 命令设置 npm registry 为当前制品库仓库。

![](https://help-assets.codehub.cn/enterprise/20200930171916.png)

-   执行 npm login ，按照提示输入帐号名、密码、邮箱信息。

![](https://help-assets.codehub.cn/enterprise/20200930171941.png)

### 推送 npm 包

-   如果您的 npm 项目还未初始化，请在推送前初始化您的 `package.json`，您可以通过执行 `npm init -y` 命令快速进行初始化。<br>

![](https://help-assets.codehub.cn/enterprise/20200930172001.png)

-   执行 npm publish 命令推送 npm 包<br>

![](https://help-assets.codehub.cn/enterprise/20200930172019.png)

-   推送成功后，刷新页面，就可以看到刚刚推上来的 npm 包了

![](https://help-assets.codehub.cn/enterprise/20200930172033.png)

### 更新一个已推送的 npm 包

-   在修改自己的 npm 包后，可以使用 `npm version <NEW_VERSION>` 命令来自动更改版本号
npm 的 version 字段是 `1.0.0` 这样的结构，有三位版本号，分别对应 `<NEW_VERSION>` 中的：`major`,`minor`,`patch`
更新大版本时版本号会从 `1.0.0` 升级为 `2.0.0`，更新小版本会升级为 `1.1.0`，更新一些小修复会升级为 `1.0.1`。

在这里，以更新一些小修复为例，在当前 npm 包的目录下，执行 `npm version patch`

![](https://help-assets.codehub.cn/enterprise/20200930172102.png)

可以看到 npm 自动帮你把版本号从 `1.0.0` 更新到了 `1.0.1`

-   执行 npm publish 命令推送 npm 包

此处与 [步骤三](#user-content-步骤三推送-npm-包) 中的推送操作相同，不再赘述。

### 在项目中使用 npm 包

-   点击你要安装的 npm 包，在弹出的抽屉中切换到【指引】，复制拉取命令

![](https://help-assets.codehub.cn/enterprise/20200930172116.png)

![](https://help-assets.codehub.cn/enterprise/20200930172135.png)

-   在需要使用到的项目中，执行刚才复制的命令进行拉取，执行完毕后，便能看到拉取成功的提示信息<br>

![](https://help-assets.codehub.cn/enterprise/20200930172150.png)

### 总结

现在，你已经掌握如何用 CODING 制品库管理 npm 包啦，有需要 demo 源码的童鞋可[点击源码](https://coding-public.coding.net/p/artifacts-npm-demo/d/artifacts-npm-demo/git)。

==== 2020/09/30 ====
