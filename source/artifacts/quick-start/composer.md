---
title: Composer - CODING 帮助中心
pageTitle: Composer
pagePrevTitle: Cocoapods 制品库
pagePrev: artifacts/quick-start/cocoapods.html
pageNextTitle: NuGet 制品库
pageNext: artifacts/quick-start/nuget.html
alias: 
-   devops/artifacts/quick-start/docker.html
-   ar/quick-start/docker.html
-   packages/quick-start/docker.html
---

本文档介绍如何快速使用 Composer 制品仓库，方便团队在项目进行统一的制品管理与版本控制。内容包含如何进行制品包制作、认证配置与制品推拉。

> 阅读该篇文档需要准备好以下内容：
> -   安装 Composer
> -   [《基础操作》](/docs/artifacts/quick-start/basic.html)——创建项目
> -   制品仓库选择 Composer 类型。

### [制作 Composer 包（可选阅读）](#composer)

#### [安装 Composer](#install)

在终端中执行下载 Copmoser 命令。

```bash
curl -sS https://getcomposer.org/installer | php
```

添加至环境变量，方便全局运行命令。

```bash
mv composer.phar /usr/local/bin/composer
```

#### [初始化](#init)

新建 Demo 目录。

```bash
mkdir composer-demo && cd composer-demo
```

初始化 Composer 包，按照提示输入初始化信息。

```bash
composer inits
```

初始化完成后会在同一目录下新增 `composer.json` 文件作为该 Composer 包的配置文件。

### [配置认证文件](#config)

前往 Composer 包的文件目录，新建 `auth.json` 文件。输入密码，点击操作指引页面中的「生成个人令牌作为凭据」自动生成推送凭据。

![](https://help-assets.codehub.cn/enterprise/20210922162337.png)

复制凭据后粘贴至 `auth.json` 文件内。

![](https://help-assets.codehub.cn/enterprise/20210128105102.png)

### [推送](#push)

在操作指引页中输入制品名称与版本自动生成推送命令后在终端中运行。

![](https://help-assets.codehub.cn/enterprise/20210922162511.png)

推送完成后即可在 CODING  制品库看到已推送的包。

![](https://help-assets.codehub.cn/enterprise/20210922162645.png)

### [拉取](#pull)

在操作指引页中输入制品名称与版本自动生成拉取命令。

![](https://help-assets.codehub.cn/enterprise/20210922162858.png)

### [设置代理](#proxy)

当 CODING 私有制品仓库不存在想要拉取的制品时，将尝试从配置的代理地址拉取。您可以添加第三方制品源，用以获取特定仓库中的制品。无需额外设置，CODING 将会按照顺序从上到下依次检索相应的制品包。

![](https://help-assets.codehub.cn/enterprise/20210922163013.png)

代理设置的详细说明，请参考[《制品代理》](/docs/artifacts/proxy.html)。

==== 2021/01/18 ====
