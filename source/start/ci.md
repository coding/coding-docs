---
title: 编译构建 - CODING 帮助中心
pageTitle: 编译构建
pagePrevTitle: 启动代码扫描
pagePrev: start/scan.html
pageNextTitle: 管理制品
pageNext: start/artifact.html
---

项目代码开发完成之后，可通过[持续集成](/docs/ci/intro.html)功能快速创建构建任务，将项目代码编译打包成软件包。

CODING 提供基于多种应用场景的持续集成模板。本文以自定义构建模板为例进行说明。如需了解更多构建模板的使用方法，参考[快速开始](/docs/ci/start.html)。

本文将通过以下步骤介绍如何使用[持续集成](/docs/ci/intro.html)功能编译构建：

1.  [创建构建计划](#create)
2.  [配置构建流程](#config)
3.  [启动创建并查看构建结果](#start)

### [创建构建计划](#create)

1.  进入已创建的项目，从左侧导航栏选择「持续集成」-> 「构建计划」。


2.  在「构建计划」页面，点击右上角「创建构建计划」。

![](https://help-assets.codehub.cn/enterprise/20210730105117.png)

3.  选择构建计划模板。由于本例中采用自定义构建过程，点击右上角「自定义构建过程」即可。

![](https://help-assets.codehub.cn/enterprise/20210730105502.png)

4.  指定构建计划名称，选择在 CODING 上创建的代码仓库，然后点击「确定」即可创建构建计划。

![](https://help-assets.codehub.cn/enterprise/20210730111309.png)

>如果代码库中存在配置好的 Jenkinsfile，可选择使用。如果使用静态配置的 Jenkinsfile，可在右侧预览配置文件中的构建流程。

构建计划创建完成之后，会显示该计划的配置详情页面。您可以参考下文内容[配置构建流程](#config)或直接[启动创建并查看构建结果](#start)。

### [配置构建流程](#config)

1.  进入已创建的项目，从左侧导航栏选择「持续集成」-> 「构建计划」。


2.  在「构建计划」页面，点击构建计划的名称或点击更多图标选择「设置」进入其设置页面。

![](https://help-assets.codehub.cn/enterprise/20210730112311.png)

3.  在「流程配置」页签，点击蓝色 ➕ 加号添加所需的阶段或任务。CODING 持续集成提供丰富的插件功能，按需选择或[自定义插件](/docs/ci/plugins/customize/overview.html)。

![](https://help-assets.codehub.cn/enterprise/20210730112923.png)

4.  点击右上角「保存」完成流程配置。

### [启动创建并查看构建结果](#start)

1.  进入已创建的项目，从左侧导航栏选择「持续集成」-> 「构建计划」。


2.  在「构建计划」页面，点击需要启动的构建计划卡片中的「立即构建」或播放图标。

![](https://help-assets.codehub.cn/enterprise/20210730113502.png)

3.  在弹出的页面中，指定构建目标分支。如需指定启动参数，参考[环境变量](/docs/ci/env.html)。然后点击「立即构建」启动构建任务。

4.  构建成功之后，点击构建计划的名称，会弹出该计划所有的构建记录。

![](https://help-assets.codehub.cn/enterprise/20210730114254.png)


5.  点击某一个构建记录的构建状态，可以查看构建流程上每一个阶段是否运行成功。

![](https://help-assets.codehub.cn/enterprise/20210730114412.png)

6.  点击流程上的某一步骤，还可以看到该步骤的具体的执行效果和日志。

![](https://help-assets.codehub.cn/enterprise/20210730114753.png)


如需了解更多持续集成的使用方法，参考[在持续集成中使用 Docker](/docs/ci/practice/docker.html)。

==== 2021/10/09 ====
