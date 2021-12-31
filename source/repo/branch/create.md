---
title: 创建分支 - CODING 帮助中心
pageTitle: 创建分支
pagePrevTitle: SSH 协议使用——通过 SSH 协议推拉代码
pagePrev: repo/ssh/pull-push.html
pageNextTitle: 设置默认分支
pageNext: repo/branch/default.html
alias: 
-   host/branch.html
-   repo/branch/settings.html
---

分支是 Git 中的常用功能。常用的开发模式是保留一个主干，各项开发或修补工作在其他分支进行，完成后再合并入主干。因为直接在主干开发是一件危险系数较高的活动，分支功能可以视为一道安全的阀门，将各项开发工作分隔开来，它能够保证主要版本的稳定性不被破坏，不同的人可以专注于不同的开发任务。

> 下文中简称 CODING 代码仓库中的分支为远程分支、本地 Git 代码仓库的分支为本地分支。在本地终端运行相关命令也可以快速创建分支，请参考 [Git 常用命令速查表](/docs/repo/git/commands.html)。


1.  进入代码仓库的详情页面之后，点击「分支」页签即可查看目前远端仓库中的所有分支。
你可以在此处进行新建分支、启用保护分支等操作，分支列表页会显示当前相比于默认分支提前或落后多少提交。

![](https://help-assets.codehub.cn/enterprise/20210521111003.png)

2.  点击右上角的新建分支按钮后，在弹窗中按照提示输入相关配置信息，默认以 master 分支作为创建来源，相当于基于源分支衍生出新分支。

![](https://help-assets.codehub.cn/enterprise/20210115153236.png)

3.  新建分支时可以添加一个简单的描述信息用以记录分支用途，当分支名称不能完整描述分支用途时，就可以使用分支备注来完善信息。

![](https://help-assets.codehub.cn/enterprise/20210115154253.png)





==== 2021/11/04 ====
