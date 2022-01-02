---
title: 访问 SVN 仓库 - CODING 帮助中心
pageTitle: 访问 SVN 仓库
pagePrevTitle: 创建 SVN 仓库
pagePrev: repo/svn/create.html
pageNextTitle: 管理 SVN 目录权限
pageNext: repo/svn/permission.html
---


SVN 仓库服务目前支持大多数主流 SVN 客户端。推荐使用各客户端的最新稳定版本。

### [Mac 环境](#mac)

在 Mac 环境，可使用 Homebrew 安装 SVN 客户端。

1.  运行下面命令安装 Homebrew：

```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2.  Homebrew 安装好之后，在终端输入以下命令完成 SVN 安装：

```shell
brew install subversion
```
3.  使用命令 `svn --version` 验证 SVN 是否已正确安装：

```shell
svn, version 1.9.7 (r1800392)
compiled Feb 28 2018, 15:54:50 on x86_64-apple-darwin17.3.0
Copyright (C) 2017 The Apache Software Foundation.
This software consists of contributions made by many people;
see the NOTICE file for more information.
Subversion is open source software, see http://subversion.apache.org/
The following repository access (RA) modules are available:

* ra_svn : Module for accessing a repository using the svn network protocol.
- with Cyrus SASL authentication
- handles 'svn' scheme
* ra_local : Module for accessing a repository on local disk.
- handles 'file' scheme
* ra_serf : Module for accessing a repository via WebDAV protocol using serf.
- using serf 1.3.9 (compiled with 1.3.9)
- handles 'http' scheme
- handles 'https' scheme
The following authentication credential caches are available:
* Plaintext cache in /Users/Liwenqiu/.subversion
* Mac OS X Keychain
```

4.  使用命令 `svn checkout svn://subversion.e.coding.net/example/example-project` （请将地址替换为**你的 SVN 仓库地址**）来检出 SVN 仓库：

![img](https://dn-coding-net-production-pp.codehub.cn/79f4f1d8-1284-4e25-80c8-c772d8d3d46b.png)

5.  接下来可以使用 `add`、`commit` 命令往仓库中新添加内容：

![img](https://dn-coding-net-production-pp.codehub.cn/953883c3-303c-4e19-97d8-90a9f4d82999.png)

6.  除了使用 `svn` 协议之外，还可以使用 `svn+ssh` 协议来访问仓库，如下图所示：

![img](https://dn-coding-net-production-pp.codehub.cn/5998416a-1067-49a0-b30b-d425f586ce1d.png)

### [Cornerstone 工具](#cornerstone)

您可以通过 Cornerstone 来使用 SVN 仓库。

1.  打开 Cornerstone 后，点击 `Add Repostory` 来添加 SVN 仓库（请将地址替换为**你的 SVN 仓库地址**）引用：

![img](https://dn-coding-net-production-pp.codehub.cn/b3074e45-1961-4bb9-94f7-e0efecb6c627.png)

然后可以看到仓库的内容：

![img](https://dn-coding-net-production-pp.codehub.cn/364bdabe-4454-4fa1-acb1-75665eed00ef.png)

2.  把仓库 `checkout` 出来，并且编辑文件之后，就可以 `commit` 进仓库，如下图：

![img](https://dn-coding-net-production-pp.codehub.cn/fcc69ab7-b645-40a8-9ed1-3f046c9f2f59.png)

### [Windows 环境](#windows)

在 Windows 平台，推荐使用 `TortoiseSVN`。

1.  [下载](https://tortoisesvn.net/downloads.html) 安装完成之后，在任意文件目录单机鼠标右键，选择 `Checkout` 把 SVN 仓库 checkout 到本地（请将地址替换为**你的 SVN 仓库地址**）：

![](https://help-assets.codehub.cn/enterprise/20190717172527.png)
![](https://help-assets.codehub.cn/enterprise/20191204174703.png)

2.  第一次 checkout 需要输入用户名和密码。勾选 `Save authentication` 保存认证信息之后就不需要每次都输入密码。

![](https://help-assets.codehub.cn/enterprise/20191204174739.png)

3.  进入检出的文件夹，新建 `README.md` 文件，在空白处右键鼠标，选择`SVN commit...` 将新建的文件保存进版本库：

![](https://help-assets.codehub.cn/enterprise/20191204174903.png)
![](https://help-assets.codehub.cn/enterprise/20191204174935.png)

### [Linux 环境](#linux)

在 Linux 下可以直接用系统的包管理工具安装 SVN。

#### [在 Fedora 上用 yum 安装](#yum)

```shell
$ sudo yum install subversion
```

#### [在 Ubuntu 或 Debian 上用 apt-get 安装](#apt)

```shell
$ sudo apt-get install subversion
```

安装成功之后，就可以用 `svn checkout / commit` 来访问 SVN 仓库，使用方法与在 Mac 平台使用命令行没有太大区别，这里就不再一一举例。

#### [Ubuntu 下使用 SVN 命令行出现协商认证机制错误](#error)

在 ubuntu 下使用 SVN 命令行客户端可能出现以下错误：

> svn: E210007: Cannot negotiate authentication mechanism

这是由于 SVN 的认证过程使用到了 SASL 库来完成，所以需要运行以下命令安装依赖库来使用 SASL 认证：

```shell
$ sudo apt-get install cyrus-sasl2-dbg
```



==== 2021/09/07 ====
