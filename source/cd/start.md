---
title: 快速开始 - CODING 帮助中心
pageTitle: 快速开始
pagePrevTitle: 功能介绍
pagePrev: cd/overview.html
pageNextTitle: 权限控制
pageNext: cd/rbac.html
---

### [功能介绍](#intro)

CODING 持续部署用于把控构建之后的项目发布与部署交付流程。能够无缝对接上游 Git 仓库、制品仓库以实现全自动化部署。在稳定的技术架构、运维工具等基础上，具备蓝绿发布，灰度发布（金丝雀发布），滚动发布，快速回滚等能力。

下文将以一个简单的 Demo 项目为例，演示如何使用 CODING 持续部署控制台将应用发布至腾讯云集群。

### [前置准备](#prerequisite)

-   开启持续部署部署设置权限，点击了解[权限详情](/docs/cd/rbac.html)。

-   导入[示例代码库](https://codingtest-cd.coding.net/public/k8sdemo/k8sDemo/git/files)。

-   Docker 制品仓库，点击了解如何使用项目中的 [Docker 制品仓库](/docs/artifacts/quick-start/docker.html)。

-   一个可被 CODING 持续部署访问的 Kubernetes 集群，点击了解如何申请[腾讯云标准集群](https://cloud.tencent.com/document/product/457/54231)。

> 集群的推荐配置为 8 核 32 GB，需开启公网访问权限。

### [1. 获取并关联云账号](#1)

> 因使用了腾讯云容器服务，部署后应用将发布至集群，本示例使用的团队账号已在「团队管理」→「服务集成」中关联[腾讯云账号](/docs/admin/service-integration/cloud.html)。

点击首页左侧的「部署控制台」，在「云账号」中绑定腾讯云账号。云账号名称可以自拟，选择地域后将自动获取对应集群。

![](https://help-assets.codehub.cn/enterprise/20210727153013.png)

在集群中新建**命名空间（Namespace）**用于存储自动生成的制品仓库访问凭证，本文中所使用的集群命名为： cd-demo。

![](https://help-assets.codehub.cn/enterprise/20210727154650.png)

### [2. 配置应用](#2)

成功添加云账号后，在部署控制台中点击「创建应用」，填写应用名与选择部署方式。

![](https://help-assets.codehub.cn/enterprise/20210727160537.png)

选择「部署到 Kubernetes 集群」模板，填写名称与描述后完成创建。

![](https://help-assets.codehub.cn/enterprise/20210727161253.png)

### [3. 初始化项目](#3)

此步骤主要用于配置持续部署所涉及代码仓库与制品仓库。在【代码仓库】中点选导入外部仓库，访问[示例仓库](https://codingtest-cd.coding.net/public/k8sdemo/k8sDemo/git/files)并克隆仓库地址。

![](https://help-assets.codehub.cn/enterprise/20210727172808.png)

导入完成后进行制品管理，将拟发布的 Docker 制品托管至 CODING 制品仓库，详情请点击[参考阅读](/docs/artifacts/quick-start/docker.html)。

![](https://help-assets.codehub.cn/enterprise/20210728103011.png)

推送至制品仓库后，获取制品的拉取地址并填写至代码仓库中 `/k8s/deployment.yaml` 中的 `image` 地址。

![](https://help-assets.codehub.cn/enterprise/20210727192224.png)

接下来需导入云账号的 `imagePullSecrets` 至代码仓库中。在「部署控制台——云账号」中点击查看详情后，复制名称。

![](https://help-assets.codehub.cn/enterprise/20211203162004.png)

粘贴至代码仓库中的 `deployment.yaml` 文件中，同时在 `namespace` 参数一栏中填写在上文中所创建的命名空间 `cd-demo`。

![](https://help-assets.codehub.cn/enterprise/20210727175119.png)

同一层级的 `service.yaml` 文件中的 `namespace` 内容也需保持一致。

![](https://help-assets.codehub.cn/enterprise/20210727175905.png)

### [4. 配置部署流程](#4)

进入部署流程配置页面，可以为此流程设定：

-   流程的执行选项（在此示例中保持默认即可）
-   部署 Deployment 阶段以及部署 Service 阶段所需制品
-   手动或自动触发

首先配置部署（Manifest）阶段。基础设置选择已绑定的云账号，在 Manifest 来源选择「CODING 代码库」，填写相应的路径。

![](https://help-assets.codehub.cn/enterprise/20210727193004.png)

配置部署 Service 阶段时步骤同上，但在文件路径处需选择 `k8s/service.yaml` 文件。

![](https://help-assets.codehub.cn/enterprise/20211221155220.png)

镜像版本配置默认选择自动获取镜像来源。若设置自定义版本规则，将仅传送特定的 image 版本信息号至集群中。

![](https://help-assets.codehub.cn/enterprise/20211221155645.png)

### [5. 触发器配置](#5)

完成部署阶段配置后，你可以使用自动化触发器、手动提交发布单执行部署。

#### [自动触发](#auto)

在「基础配置」中点选触发器类型，选择 Docker 仓库触发器。当开发人员更新代码仓库并使用 CI 将镜像打包推送至制品库后，Docker 镜像版本的更新将自动触发部署流程并将应用发布至 Kubernetes(TKE) 集群，完成后可以在基础设施页面查看并确认应用是否发布成功。

![](https://help-assets.codehub.cn/enterprise/20210727194941.png)

#### [手动提交发布单](#manual)

若希望通过手动提交发布单的形式触发部署流程，那么可以将**应用**（如本范例的 flaskapp）与项目关联。在部署控制台的【应用列表】中搜索项目名称进行关联：

![](https://help-assets.codehub.cn/enterprise/20210616102741.png)

关联完成后，点击项目中的「持续部署-Kubernetes」手动提交发布单。

![](https://help-assets.codehub.cn/enterprise/20210727195459.png)

### [6. 发布完成](#6)

发布成功后，可以查看发布的制品及启动参数及阶段执行详情等信息。

![](https://help-assets.codehub.cn/enterprise/20210727195619.png)

当需要查看某个资源在集群中的运行状态时，点击「集群」下的工作负载即可查看详情（如工作负载的 Pod 实例，日志等信息）。

![](https://help-assets.codehub.cn/enterprise/20210727195749.png)

在腾讯云的容器服务中查看工作负载。

![](https://help-assets.codehub.cn/enterprise/20210727200007.png)

发布成功后，可以查看发布的制品及启动参数及阶段执行详情等信息。

![](https://help-assets.codehub.cn/enterprise/20210727195619.png)

### [配置自动化构建流程](#7)

若在后期需要频繁开发项目，能否仅依靠代码推送就能够自动完成发布呢？答案是肯定的。经典的持续交付工作流设计思路如下：

1.  配置持续集成任务，设置监听代码更新后触发

![](https://help-assets.codehub.cn/enterprise/20211221150409.png)

2.  将项目代码打包成制品后，发布至制品仓库

![](https://help-assets.codehub.cn/enterprise/20211221150447.png)

3.  持续部署监听到制品版本号更新后，自动发布至集群

![](https://help-assets.codehub.cn/enterprise/20210727194941.png)

你可以阅读[《最佳实践——将 Ruby + 项目发布至腾讯云 TKE》](/docs/ci/practice/quick/ruby-sinatra.html)一文了解如何搭建自动化持续交付流水线。

==== 2021/12/21 ====
