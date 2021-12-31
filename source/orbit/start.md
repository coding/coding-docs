---
title: 快速开始 - CODING 帮助中心
pageTitle: 快速开始
pagePrevTitle: 产品介绍
pagePrev: orbit/intro.html
pageNextTitle: 实施持续部署
pageNext: orbit/cd.html
sitemap: false
---

应用可以理解为系统中可执行的服务单位。例如在线商城中的商品展示、购物车、登录注册组件都可以视为应用。你仅需以下五步就能够完成将 demo 应用上线至集群中并完成最终形态的业务交付。

### [前置准备](#prerequisite)

**1. 权限配置**

点击团队首页右上角的齿轮图标 <img src ="https://help-assets.codehub.cn/enterprise/20210928153255.png" style ="margin:0"> 进入团队设置中心，在「权限配置」中，确保所在用户组具备「应用中心」、「基础设施」权限。如果未勾选，请联系团队管理员进行设置。

**2. 导入示例仓库**

访问下文所使用的[示例仓库](https://codingtest-cd.coding.net/public/cd2demo/cd2demo/git/files)，点击克隆按钮获取仓库地址。前往「代码仓库」，新建代码仓库时选择导入外部仓库，粘贴示例仓库地址。

![](https://help-assets.codehub.cn/enterprise/20211101150421.png)

### [1. 接入集群](#1)

基础设施是集群与数据库的调度中心，为应用的最终发布上线提前做准备。点击团队首页左下角的「基础设施」进入管理页。

![](https://help-assets.codehub.cn/enterprise/20211028153129.png)

连接目标集群，在任意路径中运行命令。下载并安装 CD 客户端后完成集群接入。将集群纳入基础设施后，能够与各项运维工具进行数据联动与上报，在弱网络环境及私有云场景下对集群纳管的支持更加友好。

![](https://help-assets.codehub.cn/enterprise/20211028153400.png)

安装时的注意事项：

-   集群版本： K8s version ≥ 1.16

-   集群推荐配置：2 核 2G

-   集群外网访问连通性

> 若希望快速连接集群，不妨尝试 [LENS IDE](https://k8slens.dev/)。

### [2. 创建应用](#2)

进入应用中心后，点击右上角的「创建应用」按钮，在基本信息中填写仓库的所在项目与地址。

![](https://help-assets.codehub.cn/enterprise/20211101173117.png)

> 关联仓库后，将自动在仓库中创建 `.coding-cd-gitops` 目录用作采集。

### [3. 创建环境](#3)

创建应用后，需将已接入的集群指定为应用的运行环境。基于集群的使用目的不同，例如用作生产 / 测试环境，可以在环境 Values 处进行切换。

![](https://help-assets.codehub.cn/enterprise/20211101175302.png)

环境创建完成后，应用中心将自动读取集群信息。除此之外，应用中心还具备集群监控与日志查看能力。

![](https://help-assets.codehub.cn/enterprise/20211101175805.png)

### [4. 部署流程](#4)

部署流程中的阶段决定了应用在发布过程时历经的各项环节。这些阶段包含了应用部署、预置条件检查、人工确认等。建议为每个部署流程添加人工确认阶段，用以二次确认部署的有效性。

本文使用人工确认 + 应用部署阶段组成此次应用发布的部署流程。

![](https://help-assets.codehub.cn/enterprise/20211102100208.png)

在「应用部署」阶段中，选择部署环境后，还可以配置通知选项，用以及时接收发布结果。

![](https://help-assets.codehub.cn/enterprise/20211102100422.png)

配置完成后点击右上角的保存按钮。

### [5. 发布版本](#5)

版本管理机制能够自动将应用的镜像、配置、数据库变更集中展示于版本的创建页面。你可以根据项目协同中的迭代内容，选择应用变更范围并进行版本创建。同时版本还支持关联事项、需求、缺陷，便于用户追溯应用变更的业务侧需求来源。

![](https://help-assets.codehub.cn/enterprise/20211102101849.png)

创建版本后，点击发布按钮后，填写发布单名与选择部署流程完成发布。

![](https://help-assets.codehub.cn/enterprise/20211102102058.png)

### [6. 查看应用](#6)

在[环境](#3)中能够看到已发布的应用服务。

![](https://help-assets.codehub.cn/enterprise/20211102102740.png)

==== 2021/11/2 ====
