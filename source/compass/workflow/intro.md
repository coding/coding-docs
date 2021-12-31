---
title: 功能介绍 - CODING 帮助中心
pageTitle: 功能介绍
pagePrevTitle: 产品简介
pagePrev: compass/intro.html
pageNextTitle: 快速开始
pageNext: compass/workflow/start.html
alias: compass/workflow.html
sitemap: false
---

Compass 工作流是企业级 DevOps 全过程的微观透视。

### [功能介绍](#what-is-step)

项目管理员可针对特定类型的事项（如需求），定义该类型事项在项目内推进时需经历的完整工作流程，并以此为基准，观测项目成员实际开展的研发活动。

借助工作流的数据统计，项目管理员可随时查看事项流转过程中各个步骤的平均耗时，识别流程中滞留时间较长或存在阻塞的环节，并以此为依据持续改进 DevOps 流程，提高项目运转的效率。

>目前，工作流功能只适用于 [Scrum 敏捷管理模式](/docs/collaboration/pattern/scrum/intro.html)的项目。

### [基本概念](#basic-concept)

在使用工作流功能之前，你需要了解以下常用概念。

*   **步骤**：工作流的最小组成部分。每一个步骤均有特定的开始事件（不可修改），在开始事件被触发后即开始运转，直至下一步骤被触发时结束。

*   **工作流**：由不同的步骤编排而成的流程，支持并行与串行步骤。每一种事项类型只支持配置一条工作流。

*   **运行记录**：工作流的运行实例，映射了一个事项的工作流运行情况。
每创建一个事项，会产生一条运行记录，两者为 1:1 的对应关系。


![](https://help-assets.codehub.cn/enterprise/20211103175121.png)



==== 2021/11/03 ====
