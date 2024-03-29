---
title: Docker - CODING 帮助中心
pageTitle: Docker
pagePrevTitle: Composer 制品库
pagePrev: artifacts/quick-start/composer.html
pageNextTitle: 使用 Generic 制品库
pageNext: artifacts/quick-start/generic.html
alias: 
-   devops/artifacts/quick-start/docker.html
-   ar/quick-start/docker.html
-   packages/quick-start/docker.html
---

该文档介绍如何将 Docker 镜像存储在 CODING 制品库中，方便团队在项目进行统一的制品管理与版本控制。下文包含如何进行镜像制作、认证配置与制品推拉。

> 阅读该篇文档需要准备好以下内容：
> -   安装 Docker
> -   [《基础操作》](/docs/artifacts/quick-start/basic.html)——创建项目
> -   制品仓库选择 Docker 类型。

### [制作镜像（可选阅读）](#image)

本章节提供两种方法快速创建一个 Demo Docker 镜像，若已熟悉 Docker 镜像制作可以跳过本节。

#### 方法一：本地制作镜像

1.  在本地任意目录创建文件，名称为 Dockerfile，并写入以下内容：

```dockerfile
FROM coding-public-docker.pkg.coding.net/public/docker/nodejs:12
```

2.  在所在目录中调出终端，运行命令构建镜像。

```bash
docker build -t hello-world .
```

镜像制作成功，tag 默认为 hello-world:latest。您可以按照[《Docker——官方手册》](https://docs.docker.com/engine/reference/commandline/tag/)自定义 tag 内容，格式为<镜像名>:<版本>，本章节不再展开。

![](https://help-assets.codehub.cn/enterprise/20210118152615.png)

#### 方法二：从 Docker Hub 拉取镜像

1.  在终端中直接执行命令拉取镜像。

```bash
docker pull hello-world
```
2.  执行命令，查看已拉取的镜像。

```bash
docker images
```

### 配置认证信息

当您已在本地完成制品编译后，就可以将制品推送至远端制品仓库。推送之前需在本地配置远端仓库的认证信息。

#### 访问令牌

推荐使用**访问令牌**生成认证的配置信息。

1.  在仓库页面点击【操作指引】。

![](https://help-assets.codehub.cn/enterprise/20210727205110.png)

2.  输入账号的登录密码 / 两步验证码后确认，复制生成的命令。

![](https://help-assets.codehub.cn/enterprise/20210727205152.png)

3.  在本地 Docker 环境中的命令行中粘贴生成后的命令并执行，即可完成认证。

![](https://help-assets.codehub.cn/enterprise/20191009161317.png)

### 推送镜像

> 希望自动化推送 Docker 镜像？请参考如何在持续集成中使用[制品库插件](/docs/artifacts/plugins/cci-push-docker.html)。

以下命令行仅作示例，命令行会因项目差异而发生改变，请复制项目内制品仓库中直接生成的命令。

1.  给[上文](#image)拉取至本地的 `hello-world` 镜像打标签。

```bash
docker tag hello-world straybirds-docker.pkg.coding.net/coding-demo/coding-demo/hello-world
```

2.  推送您的 docker 镜像至制品仓库。

```bash
docker push straybirds-docker.pkg.coding.net/coding-demo/coding-demo/hello-world
```

成功推送后将看到如下内容

![](https://help-assets.codehub.cn/enterprise/20210118163612.png)

上述操作命令，均会直接显示在操作指引中，可输入替换值后复制命令。

![](https://help-assets.codehub.cn/enterprise/20210727205300.png)

### 查看镜像

推送完毕后，左侧菜单处的【项目概览】会在项目内广播推送动态。

![](https://help-assets.codehub.cn/enterprise/20210118164837.png)

项目的制品列表中，可以看到推送的 **hello-world** 镜像。

![](https://help-assets.codehub.cn/enterprise/20210727205423.png)

点击镜像名，可以在右侧栏查看到该包的完整信息，内含概览、指引、属性、版本列表等信息。

![](https://help-assets.codehub.cn/enterprise/20210727205541.png)

### 拉取镜像

使用 `docker pull` 命令可以拉取在 CODING 制品库中托管的 Docker 镜像。【指引】页面会自动生成相对应的拉取命令。

![](https://help-assets.codehub.cn/enterprise/20210727204331.png)

成功拉取后将会看到如下内容。

![](https://help-assets.codehub.cn/enterprise/20210727205543.png)

==== 2021/01/18 ====
