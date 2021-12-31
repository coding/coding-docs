---
title: 触发方式 - CODING 帮助中心
pageTitle: 触发方式
pagePrevTitle: 持续集成简介
pagePrev: qci/intro/ci.html
pageNextTitle: 快速开始
pageNext: ci/start.html
sitemap: false
---

在持续集成计划的配置过程中，您可以按需设置构建计划运行的触发规则。在触发规则中可以设置构建计划的频率与条件触发。

### 设置触发方式

前往持续集成任务配置界面中的「触发配置」页。在此处你可以为持续集成任务配置多种触发方式。

![](https://help-assets.codehub.cn/enterprise/20211021153256.png)

在「历史构建」页你可以看到构建任务由何种方式进行触发。

![](https://help-assets.codehub.cn/enterprise/20211021153606.png)

### 代码提交触发

顾名思义，当你提交代码时将自动触发持续集成任务，任务的启动者为代码的提交人。在配置文件 CIFile 中还可以通过 `QCI_REPO_BRANCH` 获取到运行分支，`QCI_REPO_COMMIT` 获取到当次执行的版本号。

### 标签触发

若使用代码标签触发方式，任务的启动者为代码标签的推送者。在配置文件 CIFile 中还可以通过 `QCI_REPO_BRANCH` 获取运行分支，`QCI_REPO_TAG` 获取到当次执行的标签名称。若并非使用标签触发方式则 `QCI_REPO_TAG` 为空。

### 合并请求触发

对于合并请求触发方式，任务启动者为发起合并请求的成员。提出合并请求后，首先会触发源分支的集成任务。若此分支无集成任务，将切换触发分支为目标分支的任务。所以当需要监控快速变化的分支时，将监控分支设置为目标分支更为妥当。同一分支和 commit 号与合并请求不会重复触发。

对于合并请求触发，执行脚本中可以通过环境变量 `QCI_MR_SOURCE_BRANCH` 获取到源分支，`QCI_MR_TARGET_BRANCH` 获取到目标分支。当非合并请求触发时，这两个环境变量均为空。

![](https://help-assets.codehub.cn/enterprise/20211021162323.png)

### 忽略触发

对于代码提交触发与合并请求触发方式，在 commit message 中的任何位置标注 `[ci skip]` 或 `[skip ci]`，则本次提交或合并请求不会触发任务。

若有多项 commit message，将会以 head 的 commit message 中是否含有 `[ci skip]` 或 `[skip ci]` 为准。

### 定时触发

除了可以配置定时触发日期，还可以针对分支设置多个触发规则。当选择代码未变更时不触发选项时，如果代码距离上次触发未更改，即使到达触发时间，任务也不会被触发。

![](https://help-assets.codehub.cn/enterprise/20211021164207.png)

### 其他配置

#### 任务并发配置

在触发方式中可以设置是否允许任务并发与配置并发数量。勾选后，并发数为一个任务同时允许运行的构建数目；不勾选时任务同一时刻只能运行一次构建。

![](https://help-assets.codehub.cn/enterprise/20211021164941.png)

> 任务并发时会在编译机上同时生成多个 Workspace。

#### 不清理工作空间

持续集成任务在执行前会执行 git clean 等操作还原工作空间，以确保每次运行的工作空间是干净的。但某些情况下，例如要实现增量编译的效果，需要保留工作空间下的文件，那么就需要勾选不自动清理工作空间。

![](https://help-assets.codehub.cn/enterprise/20211021170703.png)

#### 自动取消排队中的任务

当有多项持续集成任务正在排队时，如果只关心最新的构建结果，持续集成任务提供`自动取消排队的任务`选项，可以无需等待旧的构建。勾选此选项后，有新的构建生成时，队列中排队的构建会自动变为`中止`状态。

![](https://help-assets.codehub.cn/enterprise/20211021172409.png)

> 为了标识本次运行是自动取消的，构建详情将会标识 `stop by auto cancel`。

==== 2021/08/04 ====
