---
title: 部署流程 -   CODING 帮助中心
pageTitle: 部署流程
pagePrevTitle: 示例项目实践
pagePrev: cd/start.html 
pageNextTitle: 阶段类型
pageNext: cd/pipe/stages.html
---

### [功能介绍](#intro)

部署流程是实现持续部署最核心的模块。其强大之处在于支持阶段以任意的顺序组合，这样的能力让部署流程具备出色的灵活性、一致性和可重复性。

-   灵活性：支持串行、并行控制
-   一致性：支持多种部署策略，回滚能力，确保发布结果符合预期
-   可重复性：部署流程可重复执行，阶段可被其他部署流程复制使用

用户可以配置完全自动化的部署流程，也可以在某些阶段加入手工判断条件。此外部署流程支持多种事件的自动化触发，如 Webhook 触发、由其他部署流程触发等。

### [新建部署流程](#new)

前往部署控制台，点击应用卡片右下方的部署流程按钮。

![](https://help-assets.codehub.cn/enterprise/20210625154201.png)

1.  点击右上角的创建流程按钮。

![](https://help-assets.codehub.cn/enterprise/20210625154601.png)

2.  你可以复制在其他应用中创建的流程，或通过空白流程自行创建。CODING 亦提供了 Kubernetes 与腾讯云弹性伸缩参考流程模板。

![](https://help-assets.codehub.cn/enterprise/20210625155313.png)

### [基础配置](#basic)

应用的基础配置可以理解为构建整体的初始环节，既可以设置触发条件，也可以配置部署流程的通知方式等。

![](https://help-assets.codehub.cn/enterprise/20210625161919.png)

#### [自动触发器](#3.1)

自动触发器支持 CODING Docker 制品仓库、TCR 个人版仓库触发器、Git 仓库触发器等触发条件。

![](https://help-assets.codehub.cn/enterprise/20210625162621.png)

#### [添加部署流程参数](#3.2)

在部署流程配置页面，点击【添加参数】，即可开始填写参数。

![](https://help-assets.codehub.cn/enterprise/20210625162712.png)

#### [添加阶段](#3.3)

1.  在部署流程配置页面点击加号即可添加新的阶段，右侧列表中支持选择阶段类型。

![](https://help-assets.codehub.cn/enterprise/20210625162804.png)

### [执行部署流程](#execute)

部署流程配置完成后，你可以通过设置好的触发器依提交自动执行，或在持续部署中提交发布单手动触发部署流程。

![](https://help-assets.codehub.cn/enterprise/20210625163858.png)

### [部署流程配置](#config)

部署流程支持删除、禁用、锁定、查看历史版本与编辑 JSON 配置。

![](https://help-assets.codehub.cn/enterprise/20210628142443.png)

#### [删除部署流程](#4.1)

设置后，将删除此部署流程。

#### [禁用部署流程](#4.2)

设置后，将禁止任意触发器启动部署流程，包括手动触发。可以选择在团队内整体禁用或仅在项目内禁用。

![](https://help-assets.codehub.cn/enterprise/20210628154648.png)

#### [锁定部署流程](#4.5)

锁定部署流程后，将不能通过部署控制台编辑部署流程。可以选择是否允许通过 API 接口对部署流程进行更新。

![](https://help-assets.codehub.cn/enterprise/20210628150223.png)

#### [查看修订历史](#4.4)

保存新的部署流程配置后，旧版本将会添加到修订历史。你可以在修订历史页对比各版本信息，选择并还原到任意历史版本。

![](https://help-assets.codehub.cn/enterprise/20210628144601.png)

#### [编辑 JSON 配置](#4.3)

在部署控制台中所做的任何更改最终都会以 JSON 格式文件保存，直接编辑部署流程的 JSON 内容可以为部署流程添加新属性或自定义 UI 界面尚未显示的配置项。

> ⚠️ *此种方式允许用户将在文本框内自由编辑部署流程，但有可能会破坏部署流程的可用性，我们提供了从修订历史中恢复到任意指定版本的能力。*

![](https://help-assets.codehub.cn/enterprise/20210628143521.png)

==== 2021/06/28 ====
