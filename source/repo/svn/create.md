---
title: 创建 SVN 仓库 - CODING 帮助中心
pageTitle: 创建 SVN 仓库
pagePrevTitle: 代码仓库管理——通过本地命令行管理仓库
pagePrev: repo/manage/cli.html
pageNextTitle: 访问 SVN 仓库
pageNext: repo/svn/access.html
alias: 
-   host/svn.html
-   repo/svn.html
---

目前 CODING 已支持原生的 SVN 仓库，客户端通过 SVN+SSH 协议连接到 CODING 的服务器，数据传输全程走 SSH 加密通道。


1.  进入一个项目之后，点击左侧导航栏「代码仓库」进入代码仓库管理页面。

2.  点击页面右上角「创建代码仓库」，选择仓库类型为「SVN 仓库」。

![](https://help-assets.codehub.cn/enterprise/20210907141727.png)
3.  选择 `创建 SVN 仓库推荐布局` 时，将会自动创建 `tags` `branches` `trunk` 三个目录。这是多数 SVN 仓库的推荐目录布局。

仓库初始化完成之后，即可在代码浏览界面看到 SVN 仓库的内容。

![](https://help-assets.codehub.cn/enterprise/20200326150742.png)

在「代码浏览」界面可以看到这个仓库的 SVN 地址：`svn://subversion.e.coding.net/StrayBirds/svn`：

![](https://help-assets.codehub.cn/enterprise/20200326150903.png)

> 注：目前只支持在创建项目中开启 SVN 仓库，不支持在 Git 仓库中新建 SVN 仓库。

==== 2021/11/07 ====
