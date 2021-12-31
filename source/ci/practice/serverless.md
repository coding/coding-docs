---
title: 快速上手 Serverless 应用 - CODING 帮助中心
pageTitle: 快速上手 Serverless 应用
pagePrevTitle: 持续集成与制品库
pagePrev: ci/faq/artifacts.html
pageNextTitle: 使用凭据进行认证 
pageNext: ci/credential.html
alias: devops/ci/practice/serverless.html
---

CODING DevOps 与腾讯云 Serverless Framework 团队珠联璧合，共同打造了从需求计划、编码、测试、构建、发布部署、运营监控的一站式解决方案。自此开发者可以借助腾讯云、CODING、Serverless 资源，只需专注业务逻辑即可敏捷交付 web 应用。

![](https://help-assets.codehub.cn/enterprise/20200430111624.png)

无服务器架构所提供的 Serverless 应用建立在下一代公共云服务之上，它具备以下几个特点：

**1. 一站式服务**
体验从**计划 -> 编码 -> 构建 -> 测试 -> 发布 -> 部署 -> 运营 -> 监控** DevOps 全流程。

**2. 极速创建**
CODING 提供了预置的部署脚本，您不需要深入了解 Serverless、Jenkins、云密钥等概念，只需扫码授权，就能完成使用了函数服务的持续部署的配置，开发者在一分钟内便能够完成创建 Serverless Framework 应用。

**3. 多方兼容**
得益于使用了前沿技术概念 FaaS，能够同时使用 CODING、腾讯云、Serverless 平台多方提供的资源构建应用。并且还可以部署在免费的 SCF + API 网关上，可以实践更多强大的功能。

### 快速上手

下文将会演示如何利用 CODING DevOps 中的持续集成快速部署 Serverless 全栈 WEB 应用（Vue.js）。仅需一杯咖啡的时间，即可在项目公告中访问已部署好的 Serverless 应用网站。

#### 创建 Serverless Component 示例项目

1.  在团队页面单击页面右上角的 <img src ="https://main.qcloudimg.com/raw/d94a8e60dd3a41d0af07d72ae0e9d70e.png" style ="margin:0">，点击【创建项目】中的【从范例项目开始】，选择 Serverless 全栈 WEB 应用。填写完项目基本信息后，请扫码获取临时授权并完成创建。目前支持「扫码临时授权」和「云 API 密钥授权」。关于权限及云 API 秘钥的配置可以参考[配置文档](https://cloud.tencent.com/document/product/1154/43006)。

![](https://help-assets.codehub.cn/enterprise/20200423103504.png)

> **我们很在意您的数据安全**：在持续集成中部署 Serverless 需要腾讯云授权，授权后的凭据将会收录在 CODING 的[凭据管理](/docs/project/features/credential.html#pageTitle)中以加密存储用户凭据，以保证仅在持续集成执行过程中使用，规避将密钥存储在代码仓库中的风险，最大程度保障授权密钥的安全性。

#### 初始化持续集成
进入项目后，在左侧菜单栏中选择【持续集成】->【构建计划】进入欢迎页面。单击【新建构建计划配置】，初始化持续集成。

#### 创建并执行构建计划

按照提示，依次填写构建计划的基本信息：“构建计划名称”、“代码源”、“代码仓库”以及“配置来源”。在 Serverless 项目中，默认选择使用代码库中已内置好的的 Jenkinsfile 文件。如果你想自定义你的 Serverless Component 项目自动构建配置，可以修改 Jenkinsfile 或者构建计划中的配置。

![](https://help-assets.codehub.cn/enterprise/20200416114102.png)

填写完成后一经触发构建计划后便会自动进行构建。

![](https://help-assets.codehub.cn/enterprise/20200427143433.png)

如果提示构造失败，请确保您已经在环境变量中导入了相应的授权凭据。

![](https://help-assets.codehub.cn/enterprise/20200423142233.png)

#### 查看应用

自动构建成功后，项目助手会在项目概览中的公告发布应用地址。自此您已经成功部署了一个具备完整前后端的 Serverless 全栈应用。

![](https://help-assets.codehub.cn/enterprise/20200427143720.png)

### 运行环境

当前 Serverless Full Stack 项目使用了如下云服务：

-   API 网关 - API 网关将会接受外部请求并且转发到 SCF 云函数中。
-   SCF 云函数 - 云函数将承载 Express.js 应用。

![](https://help-assets.codehub.cn/enterprise/20200427150317.png)

-   CAM 访问控制 - 该组件会创建默认 CAM 角色用于授权访问关联资源。
-   COS 对象存储 - 为确保上传速度和质量，云函数压缩并上传代码时，会默认将代码包存储在特定命名的 COS 桶中。此外，会通过 COS bucket 支持静态资源托管。

![](https://help-assets.codehub.cn/enterprise/20200427151159.png)

如果希望查看部署完成的 Serverless 应用和状态信息，可以通过 [Serverless Framework 控制台](https://serverless.cloud.tencent.com)进行查看和管理。

### 常见问题

**1. 从 CODING 上拉取 Serverless 全栈 WEB 应用（Vue.js）源码却无法正常运行。**

请参照仓库 README.md 在项目资源下配置 .env 文件；

**2. 如何处理报错 "The appid is unavailable for legal reasons"？**

该报错是由于账户欠费，无法创建新的后付费资源所导致的。请您检查账户是否欠费，账户冲正后即可解决。

**3. 如何处理“Cannot get secretId/Key, your account could be sub-account or does not have access”报错？**

该报错为账户权限不足，可以参考[账号和权限配置](https://cloud.tencent.com/document/product/1154/43006)进行配置更新。更多的问题和反馈，可以参考[GitHub 仓库 Issues](https://github.com/serverless-components?q=tencent),也欢迎联系我们。

### 视频演示

<video src='https://help-assets.codehub.cn/resources/help-coding-net/serverless.mp4' type='video/mp4' controls='controls'  width='100%' height='100%'>
</video>

==== 2020/08/13 ====
