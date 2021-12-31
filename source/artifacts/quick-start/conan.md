---
title: Conan - CODING 帮助中心
pageTitle: Conan
pagePrevTitle: conan 制品库
pagePrev: artifacts/quick-start/conan.html
pageNextTitle: Generic 制品库
pageNext: artifacts/quick-start/generic.html
alias: 
-   devops/artifacts/quick-start/npm.html
-   ar/quick-start/npm.html
-   packages/quick-start/npm.html
---

该文档介绍如何将 conan 类型制品存储在 CODING 制品库中，方便团队在项目进行统一的制品管理与版本控制。下文包含如何进行制品制作、认证配置与制品推拉。

> 阅读该篇文档需要准备好以下内容：
> -   安装 Python3
> -   [《基础操作》](/docs/artifacts/quick-start/basic.html)——创建项目
> -   制品仓库选择 conan 类型。


### 安装 Conan

使用 pip 安装，需要 python3.5 及以上的版本。

```bash
pip3 install conan
```

使用 brew 安装。

```bash
brew install conan
```

### [新建 conan 包](#init)

在本地新建 Demo 目录。

```bash
mkdir mypkg && cd mypkg
```

创建 Demo 项目。

```bash
conan new hello/0.1 -t
```

将项目打包成二进制包。

```bash
conan create . demo/testing
```

如果执行报错 `/bin/sh: cmake: command not found`，需要执行命令安装 `cmake`。

```bash
$ pip3 install cmake
# 或
$ brew install cmake
```

### [配置仓库认证信息](#config)

在操作指引中输入密码后，点击「生成个人令牌作为凭据」将会自动生成执行命令。

![](https://help-assets.codehub.cn/enterprise/20210922170730.png)

### [推送制品](#push)

运行页面指引上的命令行，将变量替换为拟推送的制品名称与版本号。

```bash
conan upload [包名称]/[自定义版本号] --all -r=conan-go
```

### [拉取制品](#pull)

执行页面指引中的拉取命令，从当前仓库拉取制品。

```bash
conan install <包名称>/<自定义版本号>@ -r conan-go
```

==== 2021/02/09 ====
