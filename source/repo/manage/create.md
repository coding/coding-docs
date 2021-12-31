---
title: 创建仓库 - CODING 帮助中心
pageTitle: 创建仓库
pagePrevTitle: 快速开始
pagePrev: repo/start.html
pageNextTitle: 导入或关联外部仓库
pageNext: repo/manage/sync-relate.html
alias: 
-   host/manage.html
-   host/git/manage.html
-   host/browsing.html
-   host/plot.html
-   host/repository.html
-   repo/repository.html
---


CODING 支持[直接创建 Git/SVN 仓库](#common-create)、或[使用模板创建代码仓库](#template-create)，亦支持直接[导入外部仓库](/docs/repo/sync-relate.html)。一个项目内可以创建一个或多个代码仓库。

进入项目后，点击左侧导航栏的「代码仓库」按钮进入代码仓库列表。

![](https://help-assets.codehub.cn/enterprise/20210915150129.png)

> 若左侧未显示代码仓库，需项目管理员前往「项目设置」->「项目与成员」->「功能开关」打开开关。
> ![](https://help-assets.codehub.cn/enterprise/20210528111850.png)

### [普通创建 Git/SVN 仓库](#common-create)
#### [创建 Git 仓库](#git)

1.  在代码仓库列表，点击右上角「创建代码仓库」，选择「普通创建」。

2.  仓库类型选择 Git，输入符合条件的仓库名称。

3.  建议打开「生成 README 文件」开关。该功能开启之后，Git 仓库创建完成后会自动初始化。
4.  建议选择「私有仓库」，按需开启「代码扫描」功能， 以及时发现和规避潜在的代码问题。
5.  点击「完成创建」。

![](https://help-assets.codehub.cn/enterprise/20210915150910.png)

在完成代码仓库初始化后，你可以使用 Git 命令来与本地仓库进行联动。详情请参考 [Git 快速入门](/docs/repo/start.html)。

#### [创建 SVN 仓库](#svn)

CODING 支持创建 SVN 仓库。有关如何创建与使用 SVN 仓库，请参考 [SVN 支持](/docs/repo/svn.html)。

### [模板创建](#template-create)

CODING 提供预置的代码仓库模块。你可以通过示例代码快速体验代码仓库模块是如何与持续集成或构建产物进行关联的。

![](https://help-assets.codehub.cn/enterprise/20210915154432.png)

### [导入外部仓库](#import-create)

你可以将已有的 Git 仓库快速迁移至 CODING DevOps 平台。详情请参考[导入外部仓库](/docs/repo/sync-relate.html)。


==== 2021/11/04 ====
