---
title: 引用资源&上传附件 - CODING 帮助中心
pageTitle: 引用资源&上传附件
pagePrevTitle: 筛选事项
pagePrev: collaboration/customize/filter.html
pageNextTitle: 管理版本
pageNext: collaboration/customize/version-control.html
alias: 
-   agile-development/basis/resource.html
-   collaboration/agile/references.html
-   collaboration/customize/references.html
-   collaboration/settings/txc.html
---

CODING 引用资源功能为资源的引用提供了场景化支持，方便团队成员了解事项上下文，快速定位资源并解决问题。在史诗、用户故事、需求、任务、缺陷、子任务详情页的描述或评论中均可以引用资源，或被其他资源引用。

### [引用与被引用](#references)

#### [引用资源](#resource)

在史诗、需求、任务、缺陷、子任务详情页的描述或评论中，可通过「 # + 引用 ID/标题」形式选择资源，引用的资源将会在引用列表中展示；如果当前事项是被其他资源引用的，那么其他资源将会显示在该事项的被引用列表中。下文将以需求为例，演示具体使用方法。

1.  可以在事项详情页的「描述」中以「 # + 引用 ID/标题」形式选择资源。

![](https://help-assets.codehub.cn/enterprise/20210617111914.png)

2.  也可以在事项详情页的「评论」中以「 # + 引用 ID/标题」形式选择资源。

![](https://help-assets.codehub.cn/enterprise/20210617114654.png)

#### [添加外部链接](#link)

通过史诗、需求、任务、缺陷、子任务详情页上方的「引用资源」，或在描述/评论中，通过「#」展开资源列表，选择「更多资源」。

![](https://help-assets.codehub.cn/enterprise/20210730175920.png)

进入资源列表后，可切换至「添加外部链接」，输入资源名称、粘贴链接并「确定」，该资源将会在描述/评论中显示，选择「发表」即可引用该资源。例如：各类在线文档、设计图等等。

![](https://help-assets.codehub.cn/enterprise/20210730180738.png)

![](https://help-assets.codehub.cn/enterprise/20210730180855.png)

#### [被引用资源](#referenced)

在 A 事项中引用 B 资源，在 B 资源事项列表页的引用列表中，将显示被 A 事项引用。

#### [代码提交引用](#code)

1、引用资源功能支持将代码提交和事项进行关联。代码执行提交时，需在提交信息中插入关联事项的「 # + 引用 ID/标题」信息（例如：这是一次提交 #4）；如果代码提交所关联的事项与仓库不在同一个项目中，则需要在提交信息中插入「仓库名 + # + 引用 ID」（例如：这是一次跨项目提交 code-repo #4）。

![](https://help-assets.codehub.cn/enterprise/20191223160636.png)

2、在事项详情页的被引用列表中，可查看到关联的代码提交列表；同时在代码的提交历史中，通过提交信息中的「 # + 引用 ID」即可跳转至事项详情页。

![](https://help-assets.codehub.cn/enterprise/20210617175403.png)

#### [引用列表](#list)

引用列表汇总并展示了当前事项中引用或被引用的所有其他资源，包括史诗、迭代、需求、任务、缺陷、子任务、合并请求、代码版本、代码提交、Wiki、文件以及外部链接，选择任意资源，即可跳转至相关页面。

![](https://help-assets.codehub.cn/enterprise/20210730181332.png)

#### [资源定位](#positioning)

在引用列表中，通过任意资源右侧的放大镜选项，可定位至资源被引用的位置，了解资源被关联的上下文。如果该资源在当前事项中被引用了多次，可选择跳转至指定的任一引用位置。

![](https://help-assets.codehub.cn/enterprise/20210617142920.png)

### [上传附件](#annex)

可以通过事项详情页的「上传附件」功能上传与事项有关的文件，也可直接拖拽文件至事项详情页完成上传，可最多上传不超过 300M 的文件并且总个数不超过 10 个。

![](https://help-assets.codehub.cn/enterprise/20210617165821.png)

### [CoDesign 设计稿](#codesign)

> *CoDesign 是腾讯自研的一站式产品设计协作平台，支持在线导入和预览设计稿，可以帮助互联网产品设计团队提升协作效率，让产品设计更加高效。*

CODING 事项内的「上传附件」功能，支持从外部引入 CoDesign 设计稿，团队能够将产品设计稿与相关事项准确关联，通过在线预览随时沟通交流，并借助 CODING 快速完成从设计定稿到开发直至最终发布的全流程，实现轻松交付。

1.  前往事项详情页，在「上传附件」中选择「CoDesign 设计稿」。

![](https://help-assets.codehub.cn/enterprise/20210714182812.png)

2.  如果是首次引入 CoDesign 设计稿，需要在弹框内选择登录方式，登录 CoDesign 账号。

![](https://help-assets.codehub.cn/enterprise/login.png)

3.  登录完成后，即可选择需要关联的设计稿。事项内均可关联多个设计稿。

![](https://help-assets.codehub.cn/enterprise/linkpage.png)

4.  完成关联后，相关设计稿将展示在「附件」列表中，点击即可进行预览。可以继续添加，或者通过指定设计稿右下方图标取消关联。

![](https://help-assets.codehub.cn/enterprise/20210714184248.png)

### [墨刀原型](#modao)

CODING 事项内的「上传附件」功能支持从外部引入墨刀原型，团队能够在事项当前页直接查看设计原型图，快捷高效地对设计原型进行讨论、修改、更新，带来更加顺滑的工作体验。

首先需要您登录[墨刀](https://org.modao.cc/dashboard/okcwtseuldpj2pth9)，选择需要导入 CODING 事项的墨刀原型，点击分享按钮，选择嵌入第三方，复制嵌入代码。

![](https://help-assets.codehub.cn/enterprise/20200723143609.png)

然后前往 CODING 事项管理，进入任一史诗、需求、任务或缺陷中，在「上传附件」中选择「第三方引入 - 墨刀原型」。

![](https://help-assets.codehub.cn/enterprise/20210617143833.png)

粘贴墨刀分享中的嵌入代码，即可将原型与事项关联。上传完成后，在 CODING 中即可直接预览墨刀原型。

![](https://help-assets.codehub.cn/enterprise/20210617144133.png)

### [兔小巢反馈](#txc)

兔小巢是腾讯推出的一款用户意见反馈平台，用户能够在该平台以帖子的形式发布产品意见与反馈，帮助研发团队提升服务水平与使用体验。

CODING 支持在兔小巢反馈贴中直接创建、关联与查看 CODING 事项，或解除事项关联；同时在 CODING 事项详情页也可以查看已关联的兔小巢帖子列表。

#### [授权绑定](#authorize)

前往任一项目，通过左下方的「项目设置」->「项目协同」->「集成配置」->「前往绑定」即可绑定兔小巢。

![](https://help-assets.codehub.cn/enterprise/20210629191138.png)

兔小巢内的单个产品能够绑定多个 CODING 项目，扫码登录兔小巢后选择对应的产品完成绑定即可。

![](https://help-assets.codehub.cn/enterprise/20210617150159.png)

#### [创建或关联事项](#create)

授权绑定后，在兔小巢反馈页中选择任意一条反馈，通过右侧 CODING 图标关联 CODING 事项。

![](https://help-assets.codehub.cn/enterprise/20210617150521.png)

确定项目后，可以选择关联已有事项，或者创建新事项进行关联。

![](https://help-assets.codehub.cn/enterprise/20210617150625.png)

选择「创建新事项」，则将跳转至 CODING，选择对应的事项类型（需求、任务或缺陷），填写事项内容后即可完成创建。

![](https://help-assets.codehub.cn/enterprise/20210617151717.png)

#### [查看关联事项](#check)

关联完成后，在兔小巢页面即可查看关联事项。

![](https://help-assets.codehub.cn/enterprise/20210617152136.png)

> 注意：您在兔小巢事项页移除关联事项时，并不会删除 CODING 项目内的事项，仅会视为两者 **「取消关联」**。

在 CODING 侧的项目内，您也可以查看事项与兔小巢的关联关系。

![](https://help-assets.codehub.cn/enterprise/20210617152318.png)

### [移除引用](#delete)

在事项详情页的描述或评论中，删除含有「 # + 引用 ID」的描述或评论内容，则相应的资源在引用列表中会被移除。若该资源在多处被引用，则需要删除多处含有「 # + 引用 ID」的描述或评论内容。

![](https://help-assets.codehub.cn/enterprise/20210617162005.png)

==== 2021/07/02 ====
