---
title: Cocoapods - CODING 帮助中心
pageTitle: Cocoapods
pagePrevTitle: Generic 制品库
pagePrev: artifacts/quick-start/generic.html
pageNextTitle: Cocoapods 制品库
pageNext: artifacts/quick-start/cocoapods.html
alias: 
-   devops/artifacts/quick-start/npm.html
-   ar/quick-start/npm.html
-   packages/quick-start/npm.html
---

该文档介绍如何将 Cocoapods 类型制品存储在 CODING 制品库中，方便团队在项目进行统一的制品管理与版本控制。下文包含如何进行制品制作、认证配置与制品推拉。

> 阅读该篇文档需要准备好以下内容：
> -   安装 Cocoapods
> -   [《基础操作》](/docs/artifacts/quick-start/basic.html)——创建项目
> -   制品仓库选择 Cocoapods 类型。


### [安装](#install)

执行命令安装 Cocoapods

```bash
$ sudo gem install cocoapods
-- 或
$ brew install cocoapods
```

### [新建 Demo 项目](#init)

在任意目录执行创建命令，并根据命令行提示选择需要的示例模版：

```bash
pod lib create <自定义 pod 名称>
```

该命令会将 Cocoapods 官方的示例代码从 GitHub 仓库克隆至本地。

### [配置认证信息](#config)

首先安装 CODING Cocoapods 插件。

```bash
sudo gem install cocoapods-coding-ar
```

在操作指引中输入密码，点击「生成个人令牌作为凭据」，系统将自动生成配置凭证。

![](https://help-assets.codehub.cn/enterprise/20210922172350.png)

复制命令至您的 `~/.netrc` 文件中。若没有该文件，运行 `vim ~/.netrc` 新建并粘贴内容。

### [推送制品](#push)

在操作指引中输入制品名称，按照指引步骤执行命令。

![](https://help-assets.codehub.cn/enterprise/20210922172614.png)


### [拉取制品](#pull)

根据 Cocoapods 制品仓库中具体制品的拉取指引可以拉取指定的 Cocoapods 制品与版本。

![](https://help-assets.codehub.cn/enterprise/20210922172914.png)

==== 2021/09/22 ====
