---
title: Npm - CODING 帮助中心
pageTitle: Npm
pagePrevTitle: 基础操作
pagePrev: artifacts/quick-start/basic.html
pageNextTitle: rpm 制品库
pageNext: artifacts/quick-start/rpm.html
alias: 
-   devops/artifacts/quick-start/npm.html
-   ar/quick-start/npm.html
-   packages/quick-start/npm.html
-   best-practices/artifacts/npm-js.html
-   artifacts/practices/npm-js.html
---

该文档介绍如何将 npm 类型制品存储在 CODING 制品库中，方便团队在项目进行统一的制品管理与版本控制。下文包含如何进行制品制作、认证配置与制品推拉。

> 阅读该篇文档需要准备好以下内容：
> -   安装 Node.js
> -   [《基础操作》](/docs/artifacts/quick-start/basic.html)——创建项目
> -   制品仓库选择 npm 类型。

### [初始化本地 npm 项目（可选阅读）](#init)

若您已熟悉 npm 制品的操作，则可以跳过此章节。

1.  新建 Demo 目录作为 npm 的项目地址。
    
```bash
mkdir npm-demo
```

2.  初始化 npm 项目。

```bash
cd npm-demo && npm init
```

根据提示在新增的 `package.json` 填入该 npm 包的配置文件。

参考内容：

```json
{
    "name": "example",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "author": "",
    "license": "MIT"
}
```

3.  新建 `.npmrc` 文件。

```bash
touch .npmrc
```

### [配置认证信息](#config)

在对制品进行推送或拉取操作之前，需要配置认证信息。

有两种方式可以配置认证信息：
-   使用配置文件设置凭证
-   使用交互式命令行设置凭证

#### 方式一：使用配置文件设置凭证

1.  在制品仓库的指引页面，输入密码后点击生成个人令牌作为凭据。

![](https://help-assets.codehub.cn/enterprise/20210922152002.png)

2.  复制弹窗中的配置并将其添加到您项目的 `package.json` 同一级目录下的 `.npmrc` 文件。

#### 方式二：使用交互式命令行设置凭证

1.  复制网页上的 `npm config` 命令设置 `npm registry` 为当前制品库仓库。

![](https://help-assets.codehub.cn/enterprise/20210119150351.png)

2.  执行 `npm login` ，按照提示输入帐号名、密码、邮箱信息。

```bash
npm login
```

### [推送制品](#push)

在网页上的操作指引中输入制品名称与版本号，按照提示先初始化后再推送制品。

![](https://help-assets.codehub.cn/enterprise/20210922152501.png)

推送成功后，刷新仓库页面，您可以看到最新推送上来的制品。

![](https://help-assets.codehub.cn/enterprise/20210922152555.png)

### [拉取制品](#pull)

在操作指引中输入制品名称与版本号，自动生成拉取命令。

![](https://help-assets.codehub.cn/enterprise/20210922152751.png)

执行完毕后，您可以看到拉取成功的信息提示：

![](https://help-assets.codehub.cn/enterprise/20210119151653.png)

### [设置代理](#proxy)

当 CODING 制品仓库尚未托管想要拉取的制品时，将尝试从配置的代理地址拉取。您可以添加第三方制品源，用以获取特定仓库中的制品。无需额外设置，制品仓库将会按照顺序从上到下依次检索相应的制品包。

![](https://help-assets.codehub.cn/enterprise/20210922153504.png)

使用操作指引中的拉取命令，替换 `< package >` 的包名，完成拉取。

![](https://help-assets.codehub.cn/enterprise/20210922153653.png)

拉取的制品及依赖会成功拉取到本地，并且还会同步至 CODING 制品仓库中，详情页会显示包的来源。

![](https://help-assets.codehub.cn/enterprise/20210922153759.png)

点击了解更多关于[制品代理](/docs/artifacts/proxy.html)。

==== 2021/09/22 ====
