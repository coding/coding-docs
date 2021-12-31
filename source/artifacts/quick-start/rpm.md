---
title: Rpm - CODING 帮助中心
pageTitle: Rpm
pagePrevTitle: npm 制品库
pagePrev: artifacts/quick-start/maven.html
pageNextTitle: Helm 制品库
pageNext: artifacts/quick-start/helm.html
alias: 
-   devops/artifacts/quick-start/npm.html
-   ar/quick-start/npm.html
-   packages/quick-start/npm.html
---

该文档介绍如何将 rpm 类型制品存储在 CODING 制品库中，方便团队在项目进行统一的制品管理与版本控制。下文包含如何进行制品制作、认证配置与制品推拉。

> 阅读该篇文档需要准备好以下内容：
> -   Linux 环境
> -   [《基础操作》](/docs/artifacts/quick-start/basic.html)——创建项目
> -   制品仓库选择 rpm 类型。

### [初始化](#init)

Linux 系统自带 rpm，您可以直接在运行 Linux 系统的终端直接运行命令，若置于其他操作系统，则可以使用 Docker 安装 Centos：

```bash
docker run -it --name centos centos:8 /bin/bash
```

### [下载 Demo 项目](#download)

[点击](https://www.rpmfind.net/)进入 rpm 制品下载地址，搜索制品包并下载至本地后进行安装。

例如：

```bash
wget -N --no-check-certificate "https://www.rpmfind.net/linux/fedora/linux/development/rawhide/Everything/aarch64/os/Packages/h/hello-2.10-5.fc34.aarch64.rpm" && rpm -i hello-2.10-5.fc34.aarch64.rpm
```

### [配置仓库认证信息](#config)

点击「操作指引」上的「生成个人令牌作为凭据」将会自动生成设置凭证。

![](https://help-assets.codehub.cn/enterprise/20210922165242.png)

将生成的代码复制至本地的 `/etc/yum.repos.d/rpm-go.repo` 文件中，如果没有该文件请新建。

![](https://help-assets.codehub.cn/enterprise/20210209152632.png)

### [推送制品](#push)

执行 rpm publish 命令推送 rpm 包。

```bash
curl -u [用户名/邮箱] -X POST [推送指引中提供的仓库地址信息] -T [制品名称].rpm
```

推送成功后，刷新仓库页面，您可以看到最新推送上来的制品。

![](https://help-assets.codehub.cn/enterprise/20210922165617.png)

### [拉取制品](#pull)

运行页面指引上的命令，完成拉取操作。

![](https://help-assets.codehub.cn/enterprise/20210922165650.png)

### [制品代理](#proxy)

rpm 仓库已有默认代理地址，可以自定义配置其他地址。

![](https://help-assets.codehub.cn/enterprise/20210922165757.png)

配置需要代理的远程仓库地址，拉取仓库中的制品至本地后，将自动备份至 CODING 制品仓库列表。

如果 rpm 制品仓库中没有储存代理的 rpm 制品，可能是因为以下两点原因：

1.  您没有该仓库的推送权限。

2.  您的本地缓存中已有该制品包。

==== 2021/02/09 ====
