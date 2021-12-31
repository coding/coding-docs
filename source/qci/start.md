---
title: 快速开始 - CODING 帮助中心
pageTitle: 快速开始
pagePrevTitle: 产品能力
pagePrev: qci/intro/ci.html
pageNextTitle: 触发方式
pageNext: ci/start.html
sitemap: false
---

创建[项目](/docs/start/project.html)后，点击左侧产品栏的「持续集成（beta）」开始使用新版持续集成引擎。下文将引导你创建一个简单的流水线，并简要概述其中的基础功能。

在功能页中，你可以看到项目内所有的流水线，支持通过筛选栏或标签快速找到目标流水线。此页面还可以对流水线进行快速操作。

![](https://help-assets.codehub.cn/enterprise/20210804195809.png)

### [新建流水线](#init)

轻点右上角「新建流水线」，填写名称与选择代码库。流水线本质上由配置文件生成，故该文件的内容决定了本次构建的阶段与任务，而生成方式决定了文件内容的来源，以下是各选项的差别。

-   **UI 配置流水线**

    将通过图形化方式配置流水线，编辑完成后将生成静态的 `.coding-ci.yml` 配置文件并内嵌于持续集成任务中，不再使用代码仓库中的配置文件。选择此模式的优点在于流程固定，不易受到更改。

-   **代码库读取 YAML 文件**

    此选项将读取代码仓库中的 `.coding-ci.yml` 配置文件，你可以参考[示例 CIFile](#wip) 自行编写流水线的阶段与任务，完成后上传至代码仓库中并严格命名为 `.coding-ci.yml`。选择此模式的优点在于灵活变更，能够根据开发任务的实际需要进行变更。

-   **手动上传**

    将使用你手动上传至的 Web 页面中的配置文件，编写指引请参考[示例 CIFile](#wip)。

标签功能用于为流水线分类，方便快速找到目标构建计划。

### [配置流水线](#deploy)

为方便理解，本文档使用 UI 配置流水线方式进行演示与说明。点击新建流水线后，按照提示依次输入任务名，选择代码源等内容。

![](https://help-assets.codehub.cn/enterprise/20211020171643.png)

在流水线编辑页中新建阶段，在阶段中新建任务。

![](https://help-assets.codehub.cn/enterprise/20211020172301.png)

在任务中填写执行内容，并将任务命名为“测试任务”。点击「增加新步骤」后选择命令行脚本，并在其中填入：`echo 'hello CODING-CI!'`，其他配置均使用默认，点击右上角的保存按钮。

![](https://help-assets.codehub.cn/enterprise/20211020173118.png)

CODING 持续集成支持丰富的插件库，也支持接入新的插件以运行不同的开发任务，点击[了解详情](/docs/ci/plugins/customize/overview.html)。

![](https://help-assets.codehub.cn/enterprise/20211020173238.png)

点击右上角的触发按钮，在任务执行页面可以查看配置任务与任务的执行详情、执行历史等。

![](https://help-assets.codehub.cn/enterprise/20211020173707.png)

==== 2021/08/04 ====
