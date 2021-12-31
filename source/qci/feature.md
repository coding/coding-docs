---
title: 产品能力 - CODING 帮助中心
pageTitle: 产品能力
pagePrevTitle: 产品简介
pagePrev: qci/intro/ci.html
pageNextTitle: 自研引擎优势
pageNext: ci/start.html
sitemap: false
---

新版持续集成引擎所带来的全新功能涵盖更为易读易写的配置语法、插件扩展能力、优秀的资源调度等，以下是部分能力概览。

### [配置文件易读易写](#cifile)

基于 Pipeline as Code 理念，配置流程文件使用代码化配置与存储机制，点击[了解 CIFile 详情](/docs/qci/cifile/intro.html)。

### [构建过程编排](#choreography)

#### [分布式运行](#distributed)

你可以选择使用不同的[构建节点](/docs/ci/node/qci_worker.html)执行各个阶段下的任务，例如将下图阶段中的两个任务交由不同的构建节点运行，持续优化构建任务的运行效率。

![](https://help-assets.codehub.cn/enterprise/20210817165721.png)

#### [条件执行](#conditional-execution)

流水线中支持通过条件触发下一项任务执行，例如需要获取由上个阶段生成的制品或历经人工确认等预设条件，才能继续执行下一阶段。

![](https://help-assets.codehub.cn/enterprise/20210817170524.png)

勾选失败继续执行后，若上一个任务或阶段运行失败，也不会影响下一阶段的任务运行。

![](https://help-assets.codehub.cn/enterprise/20210817173035.png)

流水线运行详情：

![](https://help-assets.codehub.cn/enterprise/20211019163227.png)

#### [自定构建时长](#limited)

你可以为流水线整体设置超时时间，避免长时间占用团队的计算资源，灵活管控 CI 任务时长。

![](https://help-assets.codehub.cn/enterprise/20210817173709.png)

#### [插件能力](#plugin)

没有插件能力的流水线注定无法胜任复杂多变的开发需求，新版持续集成引擎不仅内置了许多实用的插件能力，更令人称赞的地方在于它支持[自定义插件](/docs/ci/plugins/customize/overview.html)能力接入。仅需满足[声明文件规范要求](/docs/ci/plugins/customize/format.html)，你可以自由创作得心应手的持续集成插件，持续优化你的开发效率。

![](https://help-assets.codehub.cn/enterprise/20210629103457.gif)

### [禁用流水线](#auto)

配置流水线后，若需要暂时冻结此条任务线，可以选择将流水线设置为禁用状态，避免意外触发造成计算资源的浪费。

![](https://help-assets.codehub.cn/enterprise/20210817195938.png)

### [环境变量分组](#group)

持续集成过程中，我们总会将一些配置（如：账号密码/版本号等）信息以环境变量的形式注入到构建过程中。环境变量分组功能可以让一条流水线在不同场景下，切换并使用不同的环境变量。

![](https://help-assets.codehub.cn/enterprise/20211020143509.png)

### [触发细则](#trigger)

持续集成任务的触发方式支持使用更多细则，例如按路径、人员监听等条件触发任务，满足单体仓库及复杂场景下的使用需求。

![](https://help-assets.codehub.cn/enterprise/20210817195524.png)

### [版本管理能力](#version-control)

通过引入版本号，能够对持续集成任务进行追溯与版本控制能力，具备更加强大的构建任务版本号管理策略。

![](https://help-assets.codehub.cn/enterprise/20211020145015.png)

支持查看任务变更记录，追溯任务变更来源和差异详情。

![](https://help-assets.codehub.cn/enterprise/20210817200134.png)

### [日志功能](#logs)

持续集成的构建任务日志能够帮助开发人员监控整体任务流程，及时发现与定位问题。新版引擎优化了实时日志刷新体验，支持快速跳转及分段展示及收起。

![](https://help-assets.codehub.cn/enterprise/20210817200052.png)

==== 2021/10/21 ====
