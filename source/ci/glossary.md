---
title: 词汇表 - CODING 帮助中心
pageTitle: 词汇表
pagePrevTitle: 持续集成与制品库
pagePrev: ci/faq/artifacts.html
---

### 持续集成

从广义而言，持续集成是业界通用的概念。而对于 CODING DevOps 而言，持续集成是一个功能，常用于执行自动化任务。

### 构建计划

构建计划是持续集成功能的基本单位。你可以在构建计划中详细配置构建计划的代码源、配置过程、触发规则、环境变量、通知提醒等信息。在后续使用过程当中，按照既定的规则触发该计划，从而实现自动化的流水线构建。

![](https://help-assets.codehub.cn/enterprise/20210913172812.png)

### 构建任务

构建计划在配置完成后的每次执行，都将会产生一个具体的构建任务。您可以查看每个构建任务的构建过程、改动记录、测试报告、构建产物、构建快照等执行信息。

![](https://help-assets.codehub.cn/enterprise/20210913180412.png)

### Jenkinsfile

Jenkinsfile 定义了持续集成中的工作流水线（pipeline），其不仅实现了对步骤的流式化封装和管理，也是持续集成中的基本功能单位。流水线可以顺序执行，也可以并行执行。

![](https://help-assets.codehub.cn/enterprise/20210913175516.png)

### 构建节点

用以执行构建任务的计算资源 / 服务器资源，分为[默认构建节点](/docs/ci/node/type.html)与自定义构建节点两种类型。默认构建节点为 CODING 官方提供；[自定义构建节点](/docs/ci/node/type.html)需手动接入至节点池后再用于构建任务。
