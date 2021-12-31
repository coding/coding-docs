---
title: 制品属性 - CODING 帮助中心
pageTitle: 制品属性
pagePrevTitle: 制品库认证
pagePrev: artifacts/auth.html
pageNextTitle: 制品版本覆盖策略
pageNext: artifacts/version.html
alias: 
-   devops/artifacts/properties.html
-   ar/properties.html
-   packages/properties.html
---

### [功能介绍](#intro)

CODING 制品属性支持用户对制品版本的自定义属性，可以进行**查询**、**新增**、**删除**、**修改**的操作。制品属性同时支持通过**页面操作**以及 **REST API** 进行管理。

> 制品属性制品元数据的区别：制品属性不同于制品元数据，**制品元数据通常为制品类型的原生属性**，如: npm 的 packageName 和 version 等信息。**制品属性更多的是用来描述元数据无法定义的内容**，您可以利用制品属性写入在  CODING 持续集成中的制品产出信息，或其它自定义内容。


### **通过页面操作管理属性**

在【制品库】页面，点击指定仓库下的指定包名，进入包页面后，点击【属性】，可在页面上进行**查看**、**新增**、**修改**、**删除**操作。

![](https://help-assets.codehub.cn/enterprise/20210923110912.png)


### [收集制品属性](#collect)

推荐使用持续集成任务自动将构建过程中的代码仓库、分支、commit、构建计划、测试结果等关键信息写入制品属性。

点击访问 [CODING CI 制品属性设置插件](/docs/artifacts/plugins/artifact-set-properties.html) 了解详情。

### [通过 REST API 管理属性](#rest-api)

点击访问 [CODING OPEN API](https://help.coding.net/openapi#e8fdb3363a50c4409ba92cf7ef6df4ec) 了解详情。

==== 2020/08/13 ====
