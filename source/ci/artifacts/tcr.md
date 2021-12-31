---
title: 推送至 TCR 镜像仓库 - CODING 帮助中心
pageTitle: 推送至 TCR 镜像仓库
pagePrevTitle: 自动生成版本号
pagePrev: ci/artifacts/version.html
pageNextTitle: 自动部署——COS 存储桶
pageNext: ci/deploy/cloud-storage.html
alias: ci/artifacts/tcr.html
---

本文将通过示例项目介绍如何使用持续集成构建制品并交付至腾讯云 TCR 镜像仓库。

### [前置准备](#prerequisite)

-   导入[示例仓库](https://straybirds.coding.net/public/coding-demo/python-flask-example/git/files)
-   开通 [TCR 服务](https://cloud.tencent.com/product/tcr)并创建镜像仓库
-   绑定[腾讯云账号](/docs/admin/service-integration/cloud.html)

### [创建持续集成任务](#create)

进入任一项目，点击进入左侧菜单栏的「持续集成」功能，创建构建计划后选择「构建镜像并推送至 TCR 企业版」模板。

![](https://help-assets.codehub.cn/enterprise/20211116150210.png)

### [配置持续集成任务](#deploy)

在构建过程中需选择「示例仓库」，在环境变量中选择已在腾讯云中创建的 TCR 镜像仓库服务。

![](https://help-assets.codehub.cn/enterprise/20211116151118.png)

其中，访问凭据需点选一键录入 TCR 凭据并使用。

![](https://help-assets.codehub.cn/enterprise/20211116151226.png)

### [触发任务](#trigger)

配置完成后，触发持续集成任务即可自动构建制品并完成发布。你可以在构建过程中查询各项步骤的运行详情与完成情况。

![](https://help-assets.codehub.cn/enterprise/20211116173900.png)

持续集成任务完成后，制品将自动交付至 TCR 服务中的镜像仓库。

![](https://help-assets.codehub.cn/enterprise/20211116151619.png)

> 如果你希望通过手动方式直接推送制品至 TCR 镜像仓库，请[阅读此处](https://cloud.tencent.com/document/product/1141/39287#.E6.AD.A5.E9.AA.A47.EF.BC.9A.E6.8E.A8.E9.80.81.E6.8B.89.E5.8F.96.E9.95.9C.E5.83.8F)。

==== 2021/11/16 ====
