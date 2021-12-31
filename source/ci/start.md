---
title: 快速开始 - CODING 帮助中心
pageTitle: 快速开始
pagePrevTitle: 产品简介
pagePrev: ci/index.html
pageNextTitle: 文本编辑器
pageNext: ci/process/text.html
alias: devops/ci/manual.html
---

下文将会演示如何利用 CODING 持续集成模版快速发布一个基于 Node.js + Express + Docker 项目。

### [1.  创建构建计划](#create)

进入项目后，点击左侧的【持续集成】->【构建计划】选择新建构建计划。该计划将会演示如何基于 Nodejs + Express 实现全自动检出代码 -> 单元测试 -> 构建 Docker 镜像 -> 推送到 Docker 制品库 -> 部署到远端服务器（可选）。

![](https://help-assets.codehub.cn/enterprise/20210912163635.png)

### [2.  选择持续集成模版](#template)

选择 Node + Express + Docker 持续集成模版。

![](https://help-assets.codehub.cn/enterprise/20200703163621.png)

### [3.  选择代码源](#code-source)

在代码仓库栏选择【示例代码】作为代码源，系统将自动在您的项目中新建立一个示例代码仓库。

![](https://help-assets.codehub.cn/enterprise/20210913180753.png)

### [4.  选择制品库](#artifacts)

构建计划结束后会生成一个构建结果，在这里选择拟推送到的 Docker 制品库。若项目内尚未存在制品库，可以利用快捷方式进行新建。

![](https://help-assets.codehub.cn/enterprise/20200703150151.png)

### [5.  填写远端服务信息（可选步骤）](#remote-server)

填写拟部署的远端服务器信息，包含 IP 地址及端口等信息并录入服务器 SSH 登录凭据。信息填写正确无误后，待构建计划完成后会将制品发送至远端服务器中，通过一个网址便可预览发布后的效果。如果暂时不需要部署到远端服务器，可跳过此步骤。

![](https://help-assets.codehub.cn/enterprise/20200703163527.png)

点击【录入新凭据并授权】后，若您本身是通过 SSH 私钥登录远程服务器的，在录入方式中则直接点击【手动录入已有 SSH 私钥】。录入完成后可以在【项目设置】->【开发者选项】->【凭据管理】中查看。

![](https://help-assets.codehub.cn/enterprise/20200703154107.png)

若不知道如何使用 SSH 私钥登录远程服务器，请在录入方式中点击【自动创建 SSH 密钥对】，并需要手动将公钥配置到目标远端服务的 `~ssh/authorized_ keys` 文件夹中。

### [6.  点击创建并查看构建结果](#view-results)

点击确定保存构建计划。如果勾选了【创建后触发构建】，构建计划会立即开始执行。在构建计划执行的过程中，可以在构建计划记录列表页查看构建详情。

![](https://help-assets.codehub.cn/enterprise/20200925110426.png)

点击构建记录可以查看流水线上每一个阶段是否运行成功，还可以看到每一个步骤命令的具体的执行效果和日志。

![](https://help-assets.codehub.cn/enterprise/20200825162238.png)

若步骤五运行正常，则可以在构建计划中看到制品输出的网址信息。

![](https://help-assets.codehub.cn/enterprise/20200703155848.png)

### [7.  修改远端服务器信息](#modify)

在步骤五中您已经配置了远端服务器的地址和 SSH 密钥。如果需要更改，可以到【持续集成计划】-> 【设置】->【变量与缓存】中更改。

![](https://help-assets.codehub.cn/enterprise/20200703160526.png)

### [更多内容](#more)

体验示例项目后，你可以通过阅读下文了解更多关于持续集成的内容。

-   [云主机与自定义构建节点](/docs/ci/node/overview.html)

-   [使用图形化界面配置构建流程](/docs/ci/visual-editor.html)

-   [构建不同类型的制品并交付到制品库](/docs/ci/artifacts/docker.html)

-   [配置持续集成的触发方式](/docs/ci/trigger.html)

-   [调取安全凭据并配置到环境变量](/docs/ci/artifacts/docker.html)

-   [配置项目缓存](/docs/ci/cache.html)

### [可选模板](#template)

除了本文中的 `Node.js + Express + Docker` 项目，持续集成还内置了许多模板，你可以按照实际的开发需求选择对应的模板。你也可以将常用模板定义为[团队模板](/docs/ci/manage/team-template.html)，以方便其他团队成员快速复用。

![](https://help-assets.codehub.cn/enterprise/20211124151513.png)

-   Java + Spring + Docker

    该模版演示基于 Java + Spring 实现全自动检出代码 -> 单元测试 -> 构建 Docker 镜像 -> 推送到 Docker 制品库 -> 部署到远端服务器

-   Python + Flask + Docker

    该模版演示基于 Python + Flask 实现全自动检出代码 -> 单元测试 -> 构建 Docker 镜像 -> 推送到 Docker 制品库 -> 部署到远端服务器

-   GoLang + Gin + Docker

    该模版演示基于 GoLang + Gin 实现全自动检出代码 -> 单元测试 -> 构建 Docker 镜像 -> 推送到 Docker 制品库 -> 部署到远端服务器

-   .Net Core + Docker

    该模版演示基于 .Net Core 实现全自动 检出代码 -> 单元测试 -> 编译构建 -> 构建 Docker 镜像 -> 推送到 Docker 制品库 -> 部署到远端服务器 整个流程。

-   PHP + Laravel + Docker

    该模版演示基于 PHP + Laravel 实现全自动 检出代码 -> 单元测试 -> 构建 Docker 镜像 -> 推送到 Docker 制品库 -> 部署到远端服务器 整个流程。

-   React + COS

    该模版演示基于 React 实现全自动 检出代码 -> 单元测试 -> 编译构建 -> 上传到腾讯云 COS 的持续集成构建过程。

-   Angular + COS

    该模版演示基于 Angular 实现全自动 检出代码 -> 单元测试 -> 编译构建 -> 上传到腾讯云 COS 的持续集成构建过程。

-   Vue + COS

    该模版演示基于 Vue 实现全自动 检出代码 -> 单元测试 -> 编译构建 -> 上传到腾讯云 COS 的持续集成构建过程。

-   Java + Spring + Maven

    该模版演示基于 Java + Spring 实现全自动检出代码 -> 编译构建 -> 单元测试 -> 推送到 Maven 制品库

-   Java-Android 编译并签名 Apk

    该模版演示 Java-Android 检出代码、测试、构建、签名并将 Apk 包收集到 Generic 制品库中。

-   基于 Serverless 快速部署 Express 应用

    该模版演示基于腾讯云 Serverless Framework， 实现全自动 检出代码 -> 安装依赖 -> 项目配置 -> 单元测试 -> 上传到腾讯云 Serverless 的持续集成构建过程。

-   基于 Serverless 快速部署静态页面

    该模版演示基于腾讯云 Serverless Framework， 实现全自动 检出代码 -> 安装依赖 -> 项目配置 -> 上传到腾讯云 Serverless 的持续集成构建过程。

-   基于 Serverless 快速部署 Flask 应用

    该模版演示基于腾讯云 Serverless Framework， 实现全自动 检出代码 -> 安装依赖 -> 项目配置 -> 上传到腾讯云 Serverless 的持续集成构建过程。

以上为应用构建模板。持续集成还提供一键上传制品或发布 API 文档等任务模板，欢迎前往「持续集成」功能进行体验。

==== 2021/11/24 ====
