---
title: 分支监控 - CODING 帮助中心
pageTitle: 分支监控
pagePrevTitle: 持续集成简介
pagePrev: qci/intro/ci.html
pageNextTitle: 快速开始
pageNext: ci/start.html
sitemap: false
---

CODING-CI 可以在任务上配置多个分支，当这些分支做 CI、MR 等操作时都会触发任务的执行。

### 新建和编辑任务时选择多个分支

在新建或编辑界面上，分支列表会从 GIT 库中获取所有分支供用户选择，用户也可以填写正则表达式进行匹配。

![](https://help-assets.codehub.cn/enterprise/20211026105907.png)

**注意：写正则表达式请在开始和结尾处使用/， 例如:/\d+/**

设置多分支后，CI、MR 等操作，只要是匹配到了设置的分支，均为触发任务

![](https://help-assets.codehub.cn/enterprise/20211026105653.png)

### 定时触发支持多分支

在新建或编辑界面上，定时触发可以设置多个触发条件

![定时触发](../../_static/muti_branch_2.png)

**注意：选择的分支上必须存在配置的 CIFile**

### 支持启动任务时指定分支

启动任务时，可以从所有分支的下拉列表中，选择某一个分支进行启动

为方便使用，CODING-CI 会将用户配置的多分支监控的第一个分支（正则匹配的表达式除外）做为默认值，同时，会把用户配置的分支（正则匹配的表达式除外）做为优先的分组放在前面，供用户快速选择

![](https://help-assets.codehub.cn/enterprise/20211026105716.png)

**注意：选定的分支上也必须存在配置的 CIFile**

==== 2021/10/26 ====
