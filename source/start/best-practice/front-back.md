---
title: DevOps 视角的前后端分离 - CODING 帮助中心
pageTitle: DevOps 视角的前后端分离
pagePrevTitle: 常见问题
pagePrev:  start/faq.html
pageNextTitle: DevOps - 从渐进式交付说起（含 Demo）
pageNext: start/best-practice/pro-delivery.html
alias: best-practices/front-back.html
---

<! [](https://help-assets.codehub.cn/enterprise/20200603144947.png)

随着微前端、微服务等技术理念和架构的蓬勃发展，已经没有必要再次讨论为什么需要前后端分离。因为前后端分离已成为互联网项目开发的标准模式——两者在各自的领域发展愈发地纵深。用不一样的角度观察前后端分离会得出许多有意思而独特的结论，我们今天从 DevOps 的视角聊聊前后端分离。

### [项目协同](#collaboration)

DevOps 体系中包含了敏捷开发方法论，而在前后端分离前的开发模式无法完美践行敏捷宣言。开发过程中前后端强依赖，需多次反复集成才有可能发布可用版本，违背了敏捷开发“适应性”的特点（即拥抱变化）。此外，前后端串行工作的方式还拉长了版本发布周期，违背了敏捷开发“快速发布小版本”的理念。下面用简单的流程概括前后端分离前后的协作模式。

**前后端分离前的协作模式**

1.  产品经理根据需求出原型。
2.  UI 出设计图。
3.  前端做 html 页面。
4.  后端将 html 页面套成 jsp 页面（前后端强依赖，后端必须要等前端的 html 做好才能套 jsp。若过程中 html 发生变更，后端也要被迫调整，开发效率随之降低。）
5.  集成出现问题。
6.  前端返工。
7.  后端返工。
8.  二次集成。
9.  集成成功。
10. 交付。

![](https://help-assets.codehub.cn/enterprise/20200603160655.png)

**前后端分离后的协作模式**

1.  产品经理根据需求出原型。
2.  UI 出设计图。
3.  前后端约定接口、数据和参数。
4.  前后端并行开发（无强依赖，可前后端并行开发，如果需求变更，只要接口和参数不变，就不用两边都修改代码，开发效率高）。
5.  后端 API 自动化测试。
6.  前后端集成。
7.  前端页面调整。
8.  集成成功。
9.  交付。

![](https://help-assets.codehub.cn/enterprise/20200603161355.png)

### [代码管理](#code-manage)

前后端分离后，两者的代码分开独立进行管理。后端作出变更后不需要合并前端代码，大幅减少代码合并冲突问题。此外，前后端分离后，后端可以根据业务类型自由选用编程语言开发不同的组件，实现松耦合，这与微服务架构理念不谋而合。

![](https://help-assets.codehub.cn/enterprise/20200603161921.png)

### [测试管理](#test-manage)

前后端分离后，对应的测试也分离了。由于后端只需负责输出 api 接口，于是可以很方便地进行自动化测试，提早排查出问题，降低测试成本。而前端可以不依赖后端，在本地独立 mock 数据，待前后端接口对接后，测试便可以开始进行功能测试。

![](https://help-assets.codehub.cn/enterprise/20200603164454.png)

### [交付部署](#delivery)

1913 年，福特汽车开发了世界上第一条流水线，每 24 秒，一辆汽车就能从流水线中被生产出来，人类也第一次在真正意义上实现了汽车的规模化生产，福特也因此成了美国最大的汽车制造商。

而交付部署包含持续集成和持续部署，其核心就是流水线。从代码分离开始，前后端就形成了两条并行的流水线，它们能够独立编译，构建，打包，发布。发布全程中不需要对方在场，出现了问题各自回退。

![](https://help-assets.codehub.cn/enterprise/20200603164945.png)

从项目协同、代码管理、测试到交付部署，需要一套完整的 DevOps 工具链支撑。一个典型的解决方案便是如 Jira + GitLab + Jenkins + Nexus + Kubernetes。但这些工具之间账户体系皆不互通，操作习惯需要重新学习。试想团队每加入一个新成员管理者都要在每个工具平台为其添加账户，新成员也要花时间去逐一熟悉。这对管理者和新人都是不必要的负担。在这样的背景下，我们可以采用 CODING 所提供的一站式 DevOps SaaS 服务，快速实现前后端分离的 DevOps 最佳实践。

### [快速实践 DevOps](#practice)

下文将以一个信奉敏捷开发理念的互联网团队`突突突小分队`为例，演示如何基于 CODING DevOps，以项目管理为起点，持续部署为终点，快速实现前后端分离项目 DevOps 最佳实践。相关人员设置如下：

![](https://help-assets.codehub.cn/enterprise/20200604103535.png)

#### [技术栈](#stack)

-   [后端（Python + Flask)](https://linrp.coding.net/p/front-back-cd/d/flask-backend/git)
-   [前端（React）](https://linrp.coding.net/p/front-back-cd/d/react-frontend/git)
-   [运维（Docker + Kubernetes）](https://linrp.coding.net/p/k8s-yaml/d/k8s-yaml/git)

#### [前提准备](#prerequisite)

-   使用腾讯云 TKE 创建一个 [Kubernetes 集群](https://cloud.tencent.com/document/product/457/11741)

#### [创建项目和代码仓库](#create)

2020 年 4 月 26 日，上午 11：00 整，`突突突小分队 Leader` 老李在周会上召开了新项目启动大会，由于是新项目，老李引进了 CODING DevOps 产品，目的是将 DevOps 理念和工作流贯彻到团队实际工作中，规范团队的开发、测试和运维流程，并进一步提升产品发布效率。散会前老李当场创建两个项目分别为 front-backend-cd 和 k8s-yaml，并表示给大家一天的时间了解 CODING DevOps 产品。

![](https://help-assets.codehub.cn/enterprise/20200603172117.png)

`突突突小分队` 成员之间配合已经有相当的默契，在了解完 CODING DevOps 产品后，第二天（4 月 27 日）各自开始了有条不紊的工作。

-   后端大熊在项目 `front-backend-cd` 中创建后端代码仓库 `flask-backend`

-   前端阿强在项目 `front-backend-cd` 中创建前端代码仓库 `react-frontend`

-   运维小胖在项目 `k8s-yaml` 中创建代码仓库 `k8s-yaml`

-   测试小莉整理测试用例，根据 `Leader` 老李提供的接口文档编写后端 API 自动化测试代码

> 将 k8s-yaml 作为独立项目维护的原因是除了 front-backend-cd 项目，k8s-yaml 也管理着其他项目的 Kubernetes yaml 文件，单独建库的目除了方便对 yaml 文件做版本控制，也便于开发和运维职责分明，开发不需要关注太多的运维基础设施（Kubernetes），主要精力放在编码、编译和构建镜像。

#### [持续集成](#ci)

代码仓库初始化后，后端大熊和前端阿强开始了愉快的编码，在同时完成第一次代码提交前，Leader 老李已经为团队搭建好持续集成，并分别交由大熊和阿强维护。

在下班前大熊和阿强完成了脚手架代码，提交了代码合并请求。

细心的前端阿强发现合并请求详情页正运行一个叫 `合并状态检查` 的任务，请教 Leader 老李后得知是合并请求触发的自动构建计划， 其作用是：自动构建源分支与目标分支合并后的结果，能够尽可能早地发现集成中的错误。如果合并状态检查失败，评审者不用过早介入代码 review 流程，开发者可以自行检查代码。

![](https://help-assets.codehub.cn/enterprise/20200603172832.png)

合并状态检查处点击 详情 可查看构建计划的执行详情：

![](https://help-assets.codehub.cn/enterprise/20200603172951.png)

果然，第一次合并状态检查失败，前端阿强根据构建日志，发现了一个低级的字符拼写错误，在内心深深的对自己鄙视一番后，立即修复，再次提交合并请求。

前后端代码经 Leader 老李评审合并至 release 后，会触发相应的构建计划，其起点都是代码检出，终点是将镜像推送到制品库。

![](https://help-assets.codehub.cn/enterprise/20200603173106.png)

#### [持续部署](#cd)

在后端大熊、前端阿强忙得热火朝天的同时，运维小胖也没有闲着，老李将小胖添加到团队的【运维】用户组，并授予【运维】用户组部署设置权限，小胖跟着 CODING 持续部署的文档开始一步步配置。

![](https://help-assets.codehub.cn/enterprise/20200603173151.png)

#### [添加云账号](#add-account)

作为云原生的先行团队，`突突突小分队`很早就采用腾讯云 TKE 作为生产环境，于是运维小胖添加了 TKE 类型的云账号。

![](https://help-assets.codehub.cn/enterprise/20200603173317.png)

#### [配置应用和部署流程](#config-deployment)

添加完云账号后，运维小胖根据使用引导跳转到 CODING 部署控制台，分别创建了应用 flaskBackend 和 reactFrontend。

![](https://help-assets.codehub.cn/enterprise/20200603173356.png)

接着配置部署流程，运维小胖将 k8s-yaml 项目中的 manifest 文件以及制品库中的 docker 镜像配置为部署流程制品，并在 Kubernetes 资源部署阶段（Deploy(Manifest)-Deployment）引用。

> 如图只有以 release- 为前缀的 docker 镜像才会成功匹配为发布制品。

![](https://help-assets.codehub.cn/enterprise/20200603173450.png)

在人工确认阶段，运维小胖将自己设置为确认人，并将测试小莉加入通知人列表。测试小莉也会接收到人工确认通知，虽然没有权限进行确认操作，但可以对发布过程 review，以降低发布故障率。

![](https://help-assets.codehub.cn/enterprise/20200603173537.png)

#### [将应用与项目关联](#relate-with-project)

配置部署流程的过程中，由于对 CODING 部署控制台不够熟悉，一些小差错让运维小胖有点烦躁，但这些繁琐的步骤不过是第一次麻烦点，接下来将应用与项目关联后，发布过程就可以交给开发同学提交了，想到这儿小胖露出邪魅的微笑。

![](https://help-assets.codehub.cn/enterprise/20200603173610.png)

#### [版本发布](#release)

新项目启动的第三天（4 月 28 日），测试小莉上班第一件事是查看后端 API 自动化测试报告，中午饭点前前后端完成接口联调，下午小莉在测试环境上完成了功能测试。是时候开始激动人心的 Staging（预发布）了。

> Staging 虽然不是最终的生产环境，但在 DevOps 实践中其代码、制品、应用配置等跟生产环境都是保持一致的，除了意外情况，Staging 发布验证无误后，就可以随时发布到生产坏境。

老李新建了一个版本发布，命名为 release-20200428.1（相应地创建了同名的 tag），表示 2020 年 4 月 28 日的第一次发布。

![](https://help-assets.codehub.cn/enterprise/20200603173925.png)

此 tag 会触发 CI 构建，在 Jenkinsfile 中获取此 tag 的名称并应用到 docker 镜像。

![](https://help-assets.codehub.cn/enterprise/20200603174009.png)

#### [在项目内提交发布](#submit)

后端大熊和前端阿强在项目内提交发布单，选择部署流程执行必需的制品（docker 镜像选择最新的版本 release-20200428.1）。

![](https://help-assets.codehub.cn/enterprise/20200603174134.png)

#### [人工确认](#confirm)

部署流程执行到 `人工确认` 阶段，Leader 老李和运维小胖收到了人工确认通知，小胖点击部署详情跳转到发布单详情页，确认制品信息无误后点击 继续执行。

![](https://help-assets.codehub.cn/enterprise/20200603174225.png)

2 分 43 秒后，发布成功！

#### [查看发布信息](#view-release)

在【基础设施】->【集群】中查看发布成功的 Deployment 信息，可看到镜像版本与代码版本一致，如果生产环境出现故障，可快速追踪到对应的代码版本，进行修复工作。

![](https://help-assets.codehub.cn/enterprise/20200603174258.png)

测试小莉早已在运维小胖的提示下本地配置了 hosts，打开浏览器输入 <http://react-frontend.com> 即可查看发布内容。这样的版本肯定是不能发布到线上的，不过作为前后端分离的 DevOps 最佳实践 Demo，它成功的完成了使命。

![](https://help-assets.codehub.cn/enterprise/20200603174318.png)

#### [结语](#conclusion)

突突突小分队成功在五一劳动节前发布了第一个小版本，这次发布过程中，大家都感觉比以前舒心多了。

后端大熊和前端阿强不需要自己写 k8s manifest，可以将时间和精力专注在业务代码；
而运维小胖也不用像以前和女朋友约会时还担心开发请自己在测试环境拉取更新镜像，现在他们可以实现自助发布，小胖想，如果以后 CODING 开发了 APP，打开手机即可一键完成人工确认操作，那小日子不要太爽；
Leader 老李则表示对 CODING DevOps 是相见恨晚呐，早些年手工停服、 ftp 上传代码、手工启服的骚操作一去不复返了。

### [本文涉及的最佳实践要点](#key-point)

前后端代码仓库分离：如本文中的 flask-backend 和 react-frontend
开发和运维职责分离：运维配置云账号、应用和部署流程，开发提交发布单
从代码管理到制品发布，保持一致的版本规则，生产环境发现故障时可及时追溯相应的代码版本
Docker 作为交付标准，保证开发、测试、生产环境依赖一致
运维人员使用独立的 Git 仓库管理 yaml 文件，方便对 yaml 文件做版本控制，开发不需要关心云基础设施

### [DevOps 泳道图](#swimlane)

![](https://help-assets.codehub.cn/enterprise/20200603174413.png)

### [参考资料](#reference)

[前端开发的历史和趋势](https://github.com/ruanyf/jstraining/blob/master/docs/history.md)

[DevOps 的分与合](https://cloud.tencent.com/developer/article/1610668)

[《凤凰项目：一个 IT 运维的传奇故事》](https://book.douban.com/subject/34820436)

[《DevOps 实践指南》](https://book.douban.com/subject/30186150)

==== 2020/08/13 ====
