---
title: 构建节点类型 - CODING 帮助中心
pageTitle: 构建节点类型
pagePrevTitle: 缓存目录
pagePrev: ci/configuration/cache.html
pageNextTitle: 默认节点环境
pageNext: ci/node/env.html
---

### [功能介绍](#intro)

当您在使用 CODING 持续集成进行构建时，本质上是调用计算资源作为「构建节点」完成构建任务。你可以选择使用官方默认提供的云计算资源或自行接入自定义构建节点两种方式运行构建任务。

### [默认构建节点](#default)

CODING 官方提供中国上海、中国香港、美国硅谷三地的计算资源用于执行构建任务，计算资源的限额策略为：

![](https://help-assets.codehub.cn/enterprise/20210915151417.png)

> 基础包/标准版团队为免费，点击[了解更多](https://coding.net/pricing)。

默认节点内置了构建环境，其中预装了开发语言 SDK、命令行工具等服务，点击[阅读详情](/docs/ci/ways.html)。

### [自定义构建节点](#customize)

在实际的开发项目中，所涉及的开发环境可能是多种多样的，当官方节点的构建环境无法承载项目的持续集成要求时，例如需要使用 macOS Xcode 构建 iOS 应用时，就可以通过接入自定义类型节点（物理机/虚拟机/容器等）运行特定任务。

[点击了解](/docs/ci/node/customize.html)更多关于自定义构建节点的内容。

==== 2021/10/19 ====
