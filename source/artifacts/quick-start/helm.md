---
title: Helm - CODING 帮助中心
pageTitle: Helm
pagePrevTitle: rpm 制品库
pagePrev: artifacts/quick-start/rpm.html
pageNextTitle: Maven 制品库
pageNext: artifacts/quick-start/maven.html
alias: 
-   devops/artifacts/quick-start/generic.html
-   ar/quick-start/generic.html
-   packages/quick-start/generic.html
---

该文档介绍如何将 Helm 类型的制品存储在 CODING 制品库中。其内容包括创建制品库、推送、拉取和删除制品。

> 阅读该篇文档需要准备好以下内容：
> -   [安装 Helm](https://helm.sh/docs/intro/install/)
> -   [《基础操作》](/docs/artifacts/quick-start/basic.html)——创建项目
> -   制品仓库选择 Helm 类型。

### [制作包（可选阅读）](#helm-chart)

本章节提供两种方法快速创建一个 Helm Chart，若您已熟悉制作方法可跳过本节。

#### 方法一：本地制作镜像

1.  在本地任意目录创建 Helm Chart 并自定义包名。

```bash
helm create [name]
```

2.  打包

```bash
helm package [name]
```

#### 方法二：直接拉取 artifacthub 中的制品

搜索任意 Helm Chart 并在本地自定义目录下运行下载命令。

```bash
$ helm repo add [远程仓库名] [远程仓库地址]

$ helm fetch [helm chart 在远程仓库的地址>]--version [版本]
```

![](https://help-assets.codehub.cn/enterprise/20210208110621.png)

运行成功后本地会出现相关制品。

![](https://help-assets.codehub.cn/enterprise/20210208110800.png)

### [配置认证信息](#config)

在本地完成制品编译后，就可以将制品推送至远端制品仓库。你可以选择 Helm+ cURL 或 Helm + CODING Helm 插件两种方法进行制品推拉。

![](https://help-assets.codehub.cn/enterprise/20210922154557.png)

按照指引提示，输入密码后进行信息认证。

### [推送制品](#push)

在操作指引页输入制品名称，自动生成推送命令，复制后使用终端进入 Helm Chart 所在目录执行。

![](https://help-assets.codehub.cn/enterprise/20210922155821.png)

推送成功后，刷新仓库页面即可可以看到最新推送的制品。

![](https://help-assets.codehub.cn/enterprise/20210922155918.png)

### [拉取制品](#pull)

如果您的制品仓库有更新，在操作指引中生成拉取命令进行更新。

![](https://help-assets.codehub.cn/enterprise/20210922160144.png)

==== 2021/09/22 ====
