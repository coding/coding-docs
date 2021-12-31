---
title: 代码扫描 - CODING 帮助中心
pageTitle: 代码扫描
pagePrevTitle: 在阶段末尾执行插件
pagePrev: ci/plugins/post-step.html
pageNextTitle: 将镜像更新至 K8s 集群
pageNext: ci/plugins/mirror-k8s.html
alias: devops/ci/plugins/credentials.html
---

### 功能介绍

持续集成支持执行内置的「代码扫描」插件，通过便捷的设置就能在持续集成任务中触发代码扫描功能。辅以不同的[触发规则](/docs/ci/trigger.html)还能够自定义触发代码扫描的条件，这样便能够及时发现潜藏的代码缺陷、安全漏洞以及不规范代码，把控构建产物质量。

> 目前代码扫描插件仅支持 CODING 代码仓库。 

### 快速开始

本文档通过可视化界面配置代码扫描插件。进入任一项目后，依次点击并进入【持续集成】->【构建计划】->【设置】->【流程配置】。接下来将以扫描 Java 项目为例，说明如何配置并使用代码扫描插件。

#### 添加扫描插件

新建或选择构建计划，进入流程配置界面。建议在较早阶段如「单元测试」环节前就新增代码扫描阶段，然后在「质量管理」环节中添加代码扫描插件。

![](https://help-assets.codehub.cn/enterprise/20201105113302.png)

#### 选择扫描方案

根据项目本身选择开发语言，在此例子中我们选择「Java 推荐扫描方案」。

![](https://help-assets.codehub.cn/enterprise/20201105113326.png)

因该扫描方案中包含编译型规则，所以需要进行配置编译以追踪更深层次的缺陷，添加扫描方案后点击确认。

![](https://help-assets.codehub.cn/enterprise/20201105113359.png)

#### 配置质量门禁

依据团队及项目的实际情况，为团队内不同权限的成员设置合适的质量门禁。在持续集成阶段就实现对错误问题与致命问题的有效管控。

![](https://help-assets.codehub.cn/enterprise/20201105113419.png)

#### 配置插件设置

在插件设置中您还可以决定是否勾选在「质量门禁不通过时继续构建」选项。这取决于该构建计划的业务含义，建议在发布至正式环境的构建计划配置中取消勾选，即若门禁不通过则终止流水线，规避可能存在的风险。

![](https://help-assets.codehub.cn/enterprise/20201105113439.png)

#### 查看扫描结果

扫描执行完成后，可以在插件的日志中了解质量门禁情况。点击日志中的链接，可以跳转至问题列表中进行查看。

![](https://help-assets.codehub.cn/enterprise/20201105113459.png)

==== 2020/11/05 ====
