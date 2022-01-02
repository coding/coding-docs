---
title: 构建节点池 - CODING 帮助中心
pageTitle: 构建节点池
pagePrevTitle: Worker 常用命令
pagePrev: ci/node/worker.html
pageNextTitle: 分组管理
pageNext: ci/manage/group.html
alias: devops/ci/node/pool.html
---

### 功能介绍

构建节点池是构建节点的集合，在使用自定义的构建节点时，需要将构建节点接入构建节点池，并通过将构建计划节点池配置来指定构建节点池。

![](https://help-assets.codehub.cn/enterprise/20210915170500.png)

### 权限控制

用户组需具备「团队构建节点」权限才能进行创建/删除构建节点池等操作。点击右上角头像下拉处的「团队管理」→「权限配置」为用户组勾选开启相应的权限。

![](https://help-assets.codehub.cn/enterprise/20210915171405.png)

单个项目内支持设置多个构建节点池，每个构建节点池支持接入多个构建节点。在构建节点池详情中的节点列表可以查看节点状态并对其进行管理。

### 节点状态

-   闲置：构建节点此时空闲。
-   占用：构建节点已被分配到构建任务中使用。
-   准备中：构建节点正在准备构建环境。
-   开启：只有处于开启状态的节点才能被分配使用，如果关闭节点不会影响正在运行的构建任务。
-   删除：节点将会脱离 CODING 持续集成服务，但只会删除工作空间和相关的配置信息，之前产生的全局缓存文件仍会保留。
-   构建节点池详情内可以查看节点的构建记录。

![](https://help-assets.codehub.cn/enterprise/20200624153054.png)

构建节点池默认授权给所有构建计划，您也可以选择只授权给指定的构建计划（支持多选）。

![](https://help-assets.codehub.cn/enterprise/20200624153211.png)

在构建计划的基础信息设置中可以修改相应的节点池配置。构建计划默认使用 CODING 提供的云主机，您也可以选择其它项目内配置的节点池进行构建。

![](https://help-assets.codehub.cn/enterprise/20200624153449.png)

==== 2020/08/13 ====
