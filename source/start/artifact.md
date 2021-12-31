---
title: 管理制品 - CODING 帮助中心
pageTitle: 管理制品
pagePrevTitle: 编译构建
pagePrev: start/ci.html
pageNextTitle: 实施持续部署
pageNext: start/cd.html
---

在您将项目代码构建好之后，可以使用[制品管理](/docs/artifacts/intro.html)功能管理构建产物。CODING 支持多种制品库类型，包括 Docker、Maven、Helm 和 npm。本文以 Docker 为例进行说明。如需了解其他类型制品库的内容，参考[制品管理 - 基础操作](/docs/artifacts/quick-start/basic.html)。

本文将通过以下步骤介绍如何使用[制品管理](/docs/artifacts/intro.html)功能管理 Docker 制品：

1.  [创建制品仓库](#create)
2.  [配置认证信息](#authenticate)
3.  [推送 Docker 镜像](#push)
4.  [查看推送的 Docker 镜像](#view)



### [前置准备](#prerequisite)

使用[制品管理](/docs/artifacts/intro.html)功能前，请确保：
-   在 CODING 平台中已创建项目
-   已安装 [Docker](https://www.docker.com/products/docker-desktop) 客户端

### [创建制品仓库](#create)

1.  进入已创建的项目，从左侧导航栏选择「制品管理」-> 「制品仓库」。
2.  在「制品仓库」页面，点击「创建仓库」。
3.  选择 **Docker** 仓库类型，指定仓库名称，提供仓库描述，并确定权限范围（默认将对当前项目成员开放**推送**和**拉取**操作）。
![](https://help-assets.codehub.cn/enterprise/20210730144527.png)

4.  点击「确认」完成制品仓库的创建。

### [配置认证信息](#authenticate)

在对 CODING 制品仓库进行推送或拉取操作之前，需要配置认证信息。

推荐使用**访问令牌**生成认证的配置信息。

1.  进入已创建的项目，从左侧导航栏选择「制品管理」-> 「制品仓库」。
2.  在「制品仓库」页面，点击「仓库管理」页签。
3.  在仓库页面点击「指引」->「使用访问令牌生成配置」。

![](https://help-assets.codehub.cn/enterprise/20191227134858.png)

4.  输入账号密码后确认，复制生成的命令。

![](https://help-assets.codehub.cn/enterprise/20191227140116.png)

5.  在本地 Docker 环境中的命令行中粘贴生成后的命令并执行，即可完成认证。

![](https://help-assets.codehub.cn/enterprise/20191009161317.png)


### [推送 Docker 镜像](#push)

本文将使用 Docker 官方提供的 **hello-world** 镜像为例，演示如何将其推送到 CODING 制品库。
在本地 Docker 环境中执行如下命令：

1.  拉取镜像。

```bash
docker pull hello-world
```

2.  为本地的 Docker 镜像打标签。

```bash
docker tag hello-world artifacts-docker.pkg.coding.net/my-project/my-docker/hello-world
```

3.  推送镜像到 CODING 制品库。

```bash
docker push artifacts-docker.pkg.coding.net/my-project/my-docker/hello-world
```

推送后将会看到如下内容：

![](https://help-assets.codehub.cn/enterprise/20191009161318.png)

上述命令均可直接在仓库页面的「指引」当中直接复制。

![](https://help-assets.codehub.cn/enterprise/20191227140210.png)

### [查看推送的 Docker 镜像](#view)

推送镜像完毕后，您可进入项目，点击左侧导航栏的「项目概览」查看相关推送动态。

如要查看更详细的信息，从左侧导航栏选择「制品管理」->「制品仓库」，再进入「仓库管理」页签。包列表中会显示最新推送的版本信息，即在上一节内容中通过命令行推送的 **hello-world** 镜像。

![](https://help-assets.codehub.cn/enterprise/20191227141700.png)

点击包名，可以在右侧栏查看到该包的完整信息，这里包含了概览、指引、属性、版本列表，您还可以点击右侧栏的包名进一步查看包的详情页。

![](https://help-assets.codehub.cn/enterprise/20191227142736.png)

如需了解更多制品管理的使用方法，参考[最佳实践 - 搭建团队级制品库](/docs/artifacts/practices/team-share.html)。

==== 2021/08/01 ====
