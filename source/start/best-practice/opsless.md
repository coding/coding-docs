---
title: Serverless 驱动的 DevOps 新形态 - CODING 帮助中心
pageTitle: Serverless 驱动的 DevOps 新形态
pagePrevTitle: DevOps 的分与合
pagePrev: start/best-practice/devops-inside.html
pageNextTitle: CODING 微服务架构演进之路
pageNext: start/best-practice/microservice.html
alias: best-practices/opsless.html
---

### [前言](#foreword)

很高兴能在 ServerlessDay 这样的大会上跟大家交流。Serverless 是云计算能力的新形式，以云函数为代表的新形式彻底变革了传统的运维工作。而 DevOps 作为开发运维一体化的协作文化，在 Serverless 对 Ops 工作产生冲击的时候也有了一些新形态的变化，本文将从云的弹性能力发展讲起，帮大家窥探由 Serverless 驱动的 DevOps 新形态。

### [从弹性计算说起](#start)

在没有云的时代，没有弹性计算的能力，算力的交付往往以月为单位进行计算，很多人不得不走预算审批，采购服务器，安装测试、试运行投产等过程。效率低，浪费严重，成本高，交付慢。下图展示了一个全年峰值 600 核，但平时负载压力不大导致的浪费情况。

![](https://help-assets.codehub.cn/enterprise/20200930173933.png)

逐渐的人们开始意识到不必要的浪费和交付的效率，开始出现了虚拟化和云技术，弹性能力开始逐步展现。在这样一个时代，企业可以把租用云计算供应商的资源整合为算力池，以虚拟（云主机）机的形式进行快速交付。算力以虚拟云服务器方式提供，涉及到数据持久化，环境预装等问题，开始有了弹性，可以以天为单位进行算力的弹性伸缩，但效果一般。

![](https://help-assets.codehub.cn/enterprise/20200930173948.png)

随之而来更轻量化的以 Docker 为代表容器技术开始出现，弹性能力进一步增强，企业无需租用或者购买服务器，只要规划好容器实例的计算算力规模，直接使用弹性容器集群，按需付费即可。
算力以分钟级扩缩容容器来实现，弹性能力大幅提升，但仍受制于针对进程负载算力的预估，能实现以分钟为单位的算力伸缩，但这仍有浪费。

![](https://help-assets.codehub.cn/enterprise/20200930174010.png)

新一代的 Serverless 彻底把弹性能力做到了机制，弹性能力粒度到毫秒级，而且最关键的是企业彻底不用评估具体应用的预计算力规模了，全自动伸缩。

![](https://help-assets.codehub.cn/enterprise/20200930174025.png)

总而言之，弹性能力的发展是伴随着云的发展的，同时云的发展也是 Cloud Native 概念的发展。

FaaS（函数即服务）,fPaaS(函数平台即服务)是国际上 Gartner 等机构看好的方向，从 Cloud Native 对系统的要求的四个方面也可以看出以 FaaS/fPaaS 和 Serverless 容器为代表的新型 Serverless 运行时能很好的满足 Cloud Native 的要求。

![](https://help-assets.codehub.cn/enterprise/20200930174102.png)

### [如何驱动新形态](#how-to)

回顾下云的发展，再对比下 DevOps 过程中软件交付这个环节，我们会发现，每次云基础设施的变动都几乎会伴随着交付方式的变革，DevOps 的持续部署和交付过程整体呈现出自动化加深的趋势。

![](https://help-assets.codehub.cn/enterprise/20200930174119.png)

这里稍微补充下对 DevOps 概念的说明，以免对 DevOps 概念不理解的读者产生迷惑。

DevOps 是使软件开发和 IT 团队之间的流程自动化的一组实践，以便他们可以更快，更可靠地构建，测试和发布软件。 DevOps 的概念建立在建立团队之间协作文化的基础上，这些团队过去一直在相对孤岛中运作。

![](https://help-assets.codehub.cn/enterprise/20200930174134.png)

DevOps 本质上是一种协作文化，只有实践的深与不深，好与不好，不存在是与否的问题。

软件交付过程好比建筑公司交付楼宇给物业公司。

![](https://help-assets.codehub.cn/enterprise/20200930174158.png)

![](https://help-assets.codehub.cn/enterprise/20200930174213.png)

这中间的交叉区域也就是 DevOps 的核心部分，Ops 部分和交叉区域的持续交付部分是会被云的不断发展所影响的重点部分。

Ops 工作事实上随着云的发展开始慢慢被解构，以前的运维工程师在基础设施运维工作上需要扛服务器，管理磁盘，网线，内存等，有了云之后，大体上运维工程师只需要关注软件层面的操作系统等即可，再到后来有了托管容器服务，运维也不需要再关心操作系统了。而 DevOps 的发展逐渐的提倡把业务运维交给开发负责，由此就形成运维工作解构为基础设施运维向右，业务运维向左的趋势。

![](https://help-assets.codehub.cn/enterprise/20200930174229.png)

### [新形态是什么样的](#what-is)

如上文所说，Ops 阶段和软件交付变动是较大的，整体上 DevOps 的形态新在这些地方：

![](https://help-assets.codehub.cn/enterprise/20200930174246.png)

对比一下固化流程的旧形态

![](https://help-assets.codehub.cn/enterprise/20200930174300.png)

再看一个以开发者为中心的新形态

![](https://help-assets.codehub.cn/enterprise/20200930174314.png)

新的形态以开发者为中心，所有的自动化过程包括构建、质量扫描、单元测试等等都是为开发者服务的，是提供给开发者参考编码成果的。开发者编码完毕即可即时部署到云环境中，测试再根据具体情况来进行测试质检等工作，最终发布函数。

以开发为中心，即时部署函数，那么新版本的函数什么时间发布投产呢，事实上 Serverless 甚至可以实现模糊测试环境、生产环境的概念，实现从测试到生产的一键化操作。

![](https://help-assets.codehub.cn/enterprise/20200930174346.png)

你只需要一个承载云函数的平台，并为函数打上各种各样的分类标签。通过函数控制台定义策略的机制实现一个标签选择器再配合 API 网关之类的负载入口机制即可。在这样的基础上，发布过程就是变更标签的过程，而且控制标签可以非常方便的按地域、流量、客群等形式做灰度发布。

测试人员在确认无误后直接修改一个标签即可实现一键发布。

再对比下以 Service Mesh 为代表的微服务架构和 Serverless 云函数架构运维视角的架构图新形态

![](https://help-assets.codehub.cn/enterprise/20200930174402.png)


### [我们能实现 Opsless 么](#question)

![](https://help-assets.codehub.cn/enterprise/20200930174422.png)

![](https://help-assets.codehub.cn/enterprise/20200930174437.png)

Serverless 顾名思义是无服务器，而 Opsless 是想实现的是无运维。虽然说运维确实大多数时间都是在跟服务器（Server）打交道，当我们实现了无服务器（Serverless）的时候，确实也减轻了运维的大多数工作负担，但这离真的 Opsless 还是有一定距离，不过 Serverless 和云未来也会朝着 Opsless 方向迈进。

![](https://help-assets.codehub.cn/enterprise/20200930174452.png)

想实现 Opsless, 还需要开发者需要关注的是上述四个点，在有了配置即代码，函数平台即服务，云原生 DevOps 工具和靠谱的云厂商之后我相信对于中小型团队来说，Opsless 就是近在眼前的事情，真正能实现“开发者只关注代码开发，云处理好所有基础设施”。

![](https://help-assets.codehub.cn/enterprise/20200930174523.png)

感谢大家的参与，希望广大开发者携手共建 Serverless 生态！

==== 2020/09/30 ====
