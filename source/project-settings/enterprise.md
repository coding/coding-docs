---
title: 团队级项目管理 - CODING 帮助中心
pageTitle: 团队级项目管理
pageNextTitle: 项目级成员管理
pageNext: project/members.html
alias: project/list.md
---

团队所有者和管理员可以在【项目】页中快捷进入项目中的功能。点击项目的操作菜单还可以快捷进行项目成员管理、移动分组或项目设置等操作。

### 更新项目信息

1.  团队所有者/管理员在【团队管理】->【项目设置】中，点击【项目设置】按钮。

![](https://help-assets.codehub.cn/enterprise/20200818172221.png)

2.  在项目设置弹窗中可更新项目地址、项目名称、项目描述及项目时间。

*⚠️ 修改项目名称将导致项目的访问 URL（包含 Git 仓库的 URL）改变，在此之前的 URL 将失效。Git 仓库地址修改方法：`git remote set-url origin NEW_URL`* 

![](https://help-assets.codehub.cn/enterprise/20200818172515.png)

### 成员管理

1.  团队所有者/管理员在操作菜单中，点击【成员管理】按钮。

![](https://help-assets.codehub.cn/enterprise/20200818172641.png)

2.  在成员管理弹窗中可添加/移除项目成员、修改项目成员用户组。

![](https://help-assets.codehub.cn/enterprise/20200818172851.png)

*若希望管理项目内的成员及权限组，请阅读[《项目级成员管理》](/docs/project/members.html)。*

### 删除/归档项目

1.  在项目页中，点击每个项目右侧的【操作菜单】，可进行【删除项目】或【归档项目】操作。

![](https://help-assets.codehub.cn/enterprise/20200819113534.png)

2.  删除项目会删除项目内的所有数据，且删除操作无法恢复。若项目内存有重要数据，建议归档项目。

3.  项目归档后，项目内所有成员将无法访问该项目，且不能对该项目进行任何操作。归档后的项目会统一放置在【已归档】tab 页面中，可以在这个页面对项目进行恢复操作。

![](https://help-assets.codehub.cn/enterprise/20200819114035.png)

### 菜单栏

在首页中点击【项目】进入项目列表管理页。

您可以在项目中查看管理所参加的每一个项目。菜单栏上方会按照项目属性分为四大类，其中仅团队管理员才能查看「全部项目」。在对项目进行归档操作后会归纳至已归档栏目中。

![](https://help-assets.codehub.cn/enterprise/20200604155601.png)

### 星标项目

对单独的项目加星标后项目会出现在星标项目栏中，通过鼠标拖拽可以改变星标项目的排序。

![](https://help-assets.codehub.cn/enterprise/20200604162825.png)

在顶部菜单的项目栏中也可以快速添加星标并置顶项目。

![](https://help-assets.codehub.cn/enterprise/20200604174237.png)

### 功能模块

在功能模块中可以快速进入代码仓库 / 构建计划等模块。

![](https://help-assets.codehub.cn/enterprise/20200604163952.png)

### 项目搜索与排序

您可以在搜索框中输入关键词进行相关项目搜索；选择不同的排序方式来让项目井然有序。

![](https://help-assets.codehub.cn/enterprise/20200604173051.png)

### 项目操作

团队管理员可以对项目进行移动分组、成员管理与项目设置。

![](https://help-assets.codehub.cn/enterprise/20200604164455.png)

#### 创建分组

1.  选中目标项目，点击【移动至】按钮，选择【新分组】。

![](https://help-assets.codehub.cn/enterprise/20200604173824.png)

2.  创建分组成功后相应的组名会出现在菜单栏中。

![](https://help-assets.codehub.cn/enterprise/20200604171001.png)

#### 管理分组

在【更多】中点击管理分组，可以对已设置对分组进行排序与快速添加分组。

![](https://help-assets.codehub.cn/enterprise/20200604171911.png)

#### 批量整理项目

在【更多】中点击【批量整理项目】可以多选项目移动至特定分组中。

![](https://help-assets.codehub.cn/enterprise/20200604172628.png)

#### 移除项目分组

将项目添加至未分组中即可移除项目当前所在的项目。

![](https://help-assets.codehub.cn/enterprise/20200604174416.png)

==== 2020/08/19 ====
