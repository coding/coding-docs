---
title: 自定义事项类型 - CODING 帮助中心
pageTitle: 自定义事项类型
pagePrevTitle: 导入&导出事项
pagePrev: collaboration/customize/import-export.html
pageNextTitle: 自定义事项属性
pageNext: collaboration/customize/attributes.html
alias: collaboration/customize/type.html
---

### [功能介绍](#intro)

事项类型是项目协同中的主体，例如需求与任务都可以被抽象为「事项类型」。你可以新增如「运维」事项类型、修改类型图标、定义其在项目中的[属性](/docs/collaboration/customize/attributes.html)与[工作流](/docs/collaboration/customize/workflow.html)。事项类型依照场景分为团队级类型与项目级类型，需先行定义团队级事项类型，再在项目内应用生效。

### [团队级事项类型](#global)

团队管理员点击团队首页右上角的齿轮图标 <img src ="https://help-assets.codehub.cn/enterprise/20210928153255.png" style ="margin:0"> 进入团队设置中心，选择「功能设置」→「项目协同」→「事项类型」进入团队级事项类型列表。

团队级事项类型列表将展示团队内所有的事项类型。分为系统内置类型与自定义类型，系统类型不可修改图标与名称（例：史诗、需求、任务、缺陷、用户故事和与工作项）。

**用户故事**是新增的系统内置类型，其是敏捷框架中最小的工作单元，旨在从用户角度描述软件如何为其带来特定的价值。

![](https://help-assets.codehub.cn/enterprise/20211009143924.png)

新建自定义事项类型时可以选择类型图标与添加相关描述，事项类型创建后支持复制并自动创建副本。

自定义事项类型支持创建自定义需求与自定义任务；允许自行删除，删除事项前需解除与项目的关联。

![](https://help-assets.codehub.cn/enterprise/20210603151936.png)

### [项目级事项类型](#project)

在「项目设置」→「项目协同」中添加已设置的团队级事项类型。

![](https://help-assets.codehub.cn/enterprise/20210621112857.png)

[敏捷模式](/docs/collaboration/pattern/scrum/intro.html)下将自动引入子工作项类型，[经典模式](/docs/collaboration/pattern/classic/intro.html)下无法使用史诗与子工作项类型。

![](https://help-assets.codehub.cn/enterprise/20210531195453.png)

[敏捷模式](/docs/collaboration/pattern/scrum/intro.html)下的属性无法开启预估工时，因敏捷概念本身使用了[*故事点*](/docs/collaboration/pattern/scrum/story-points.html) 进行工作量的估算。工时记录仅能够在[经典模式](/docs/collaboration/pattern/classic/intro.html)下开启。

![](https://help-assets.codehub.cn/enterprise/20211103181311.png)

### [事项类型配置](#config)

你可以为事项类型设置层级关系、属性与工作流。

#### [层级关系](#level)

经典协同模式下的**用户故事**、**需求**与**自定义需求**三种事项类型支持设置层级关系。

![](https://help-assets.codehub.cn/enterprise/20210621141122.png)

设置层级关系后，在向下分解需求时能够选择多种事项类型，灵活满足团队实际的工作流。

![](https://help-assets.codehub.cn/enterprise/20210621141619.png)

#### [配置属性](#attributes)

属性可以理解为事项的「描述信息」，用于快速说明此事项目前的状态、截止日期、处理人、优先级等信息，但不包含基本属性信息（标题、描述、附件、关联资源等）。 属性配置页的所有属性将会在事项的详情页展示，并且可用于搜索控件和筛选器。

前往阅读[《自定义事项属性》](/docs/collaboration/customize/attributes.html)了解更多。

![](https://help-assets.codehub.cn/enterprise/20210621142153.png)

#### [配置工作流](#workflow)

自定义工作流能够满足不同团队的个性化需求，既能够构建敏捷开发工作流，也可以适应经典项目协同模式。更重要的是，通过定义团队级工作流状态，能够实现状态定义的一致性，提高跨项目与跨部门协作的效率。

前往阅读[《自定义工作流》](/docs/collaboration/customize/workflow.html)了解更多。

![](https://help-assets.codehub.cn/enterprise/20210621142452.png)

==== 2021/07/02 ====
