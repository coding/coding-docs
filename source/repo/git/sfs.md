---
title: 保护目录 - CODING 帮助中心
pageTitle: 保护目录
pagePrevTitle: LFS 大文件支持
pagePrev: repo/git/lfs.html
pageNextTitle: Go get 支持
pageNext: repo/git/go-get.html
alias:  host/sfs.html
sitemap: false
---

> ⚠️ 此功能仍在内测阶段，如有需要请点击[发送邮件](mailto:support@coding.net)联系我们。

### [功能简介](#intro)

在细粒度的权限管理上，git 的权限控制弱于 Subversion。 git 原生不支持目录级别权限控制，业界通过服务端钩子实现写入级别的权限控制，而读取级别的权限控制一直是难点，保护目录功能支持读取级别的目录权限控制，解决了这一难题。

设置保护目录后，受限成员在本地检出时、或在 Web 端中都都无法查看、修改保护目录下的文件。为了实现该功能，您需要安装我们的保护目录客户端扩展 `git-sfs`，并按照本文档进行操作。

### [下载与安装插件](#download)

我们目前提供了构建好的 git-sfs 二进制文件，点击访问其[下载地址](https://codingcorp.coding.net/public-artifacts/git-sfs/release/packages)。

#### [Windows](#windows)

在 Windows 下，我们目前提供了 x64 位二进制，用户下载 **git-sfs-windows-amd64.zip** 后解压到对应的目录，将 `bin/git-sfs.exe` 所在目录添加到环境变量即可。

也可以使用包管理器 [baulk](https://github.com/baulk/baulk/releases/tag/2.1.0) 安装：

```powershell
baulk u
baulk i git-sfs
```

目前我们也提供了 Windows 安装程序，点击访问[下载地址](https://codingcorp.coding.net/public-artifacts/git-sfs/release/git-sfs-x64-setup.exe/version/5591696/overview)，下载后双击运行 `git-sfs-x64-setup.exe` 即可完成 git-sfs 插件的安装。

默认情况下，我们建议用户将 git-sfs 添加到环境变量，因此，在安装程序中，我们默认勾选了相关选项：

![](https://help-assets.codehub.cn/enterprise/20210608162232.png)

#### [Linux & macOS](#linux-mac)

目前我们提供了 Linux/macOS AMD64/ARM64 的二进制文件，你可以下载 `.tar.gz` 文件并解压，将 `bin/git-sfs` 软连接到 PATH （`/usr/local/bin`） 目录下，或者下载对应平台的 `.sh` STGZ 安装包进行安装，以 Linux AMD64 为例：

```shell
chmod +x git-sfs-linux-amd64.sh
sudo ./git-sfs-linux-amd64.sh --prefix=/usr/local
git-sfs --version
```

### [开始使用](#getting-started)

开始使用 git-sfs 插件之前，本地需要运行 git sfs install 命令完成初始化配置。

```shell
git sfs install
```

完成后，需提前在 Web 端开启保护目录功能。git-sfs 的命令说明如下：

```usage
git-sfs - Git Secure File Storage (SFS)  0.2.4
usage: git-sfs.exe <option> args ...
  -h|--help        Show usage text and quit
  -v|--version     Show version number and quit
  -V|--verbose     Make the operation more talkative

Command:
  clean             Git clean filter that converts secret files to pointers
  smudge            Git smudge filter that converts pointer in blobs to the actual content
  install           Install Git SFS configuration.
  pre-push          Git pre-push hook implementation
  track             Track coding protection directory settings
```

### [如何配置保护目录](#how-to-configure)

在仓库设置中开启保护目录。

![](https://help-assets.codehub.cn/enterprise/20210608163534.png)

勾选特定用户组。

![](https://help-assets.codehub.cn/enterprise/20210608163658.png)

设置目标目录为保护目录，此处暂不支持通配符设置，仅支持路径前缀匹配。例如添加保护目录规则 `src` 后，那么 `src` 目录下的文件，或者路径为 `src` 的文件都会被视为保护文件。

⚠️ 设置保护目录后，将代码仓库克隆至本地并在工作目录下运行 `git sfs track` 同步保护目录配置。`git-sfs` 依赖本地 `.gitattributes` 配置触发。

![](https://help-assets.codehub.cn/enterprise/20210608170619.png)

### [使用效果](#effect)

不同的角色在操作保护目录的效果不一样，对于能够访问保护目录的用户，修改保护目录下的文件后推送时会显示上传保护目录对象：

![](https://help-assets.codehub.cn/enterprise/20210608170851.png)

对于没有权限的用户，修改保护目录时，上传保护目录对象失败，推送被拦截：

![](https://help-assets.codehub.cn/enterprise/20210608170905.png)

对于没有权限的用户，下载保护目录对象失败，工作区内该文件不可见：

![](https://help-assets.codehub.cn/enterprise/20210608171126.png)

对于有权限的用户，下载保护目录对象成功，工作区该文件可见：

![](https://help-assets.codehub.cn/enterprise/20210608171142.png)


### [功能限制](#restriction)

+   目前有权限的用户在 Web 上看到的 git-sfs 文件是指针文件，将逐步优化。
+   当前版本仅对新文件/目录设置生效，仓库已有的文件/目录无法设置为保护文件。
+   在当前版本中设置为保护文件后，无法恢复为普通文件，普通文件和保护文件转换功能正在开发中。

==== 2021/07/12 ====
