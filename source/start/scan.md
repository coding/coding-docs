---
title: 启动代码扫描 - CODING 帮助中心
pageTitle: 启动代码扫描
pagePrevTitle: 使用代码仓库
pagePrev: start/repository.html
pageNextTitle: 编译构建
pageNext: start/ci.html
---

对于使用 CODING 代码仓库管理的代码，开发者可使用[代码扫描](/docs/code-scan/intro.html)功能进行代码检查，以便及时发现代码缺陷并作出修正，有效管控代码质量。

本文将通过以下步骤介绍如何使用代码扫描协助管理代码质量：

1.  [新建代码扫描任务](#create)
2.  [查看扫描结果](#view)

### [新建代码扫描任务](#create)

1.  进入已创建的项目，从左侧导航栏选择「代码扫描」-> 「扫描任务」。
2.  创建扫描任务。
*   如果在[创建代码仓库](/docs/start/new/repository.html#repo)时已经开启了**代码扫描**，扫描任务列表会显示此仓库的扫描任务。此时点击「启动扫描」即可开始扫描仓库代码。
*   如果尚未有对应的扫描任务，点击页面右上角「新建扫描任务」，然后指定代码仓库、分支（默认选择 master）和扫描方案，即可启动扫描任务。
![](https://help-assets.codehub.cn/enterprise/20210729182124.png)

>扫描方案中有系统内置的各语言扫描方案可供选择，您也可以选择[自定义代码扫描方案](/docs/code-scan/plan/intro.html)，有针对性的扫描代码仓库。

除手动创建扫描任务，还可以在持续集成功能中添加「代码扫描」步骤自动化执行扫描任务。

![](https://help-assets.codehub.cn/enterprise/20210802144416.png)

创建合并请求时亦支持为源分支进行代码扫描检查。



### [查看扫描结果里的问题概览](#view)

待扫描完成后，您可以在「扫描任务」功能页中查看所有扫描任务的信息，包括问题概览、最后一次扫描触发者等。

![](https://help-assets.codehub.cn/enterprise/20210729182826.png)

点击所创建的扫描任务的名称，可进入该任务的详情页面。在问题概览页可以查看本次扫描中所发现的问题，包含圈复杂度、代码行数、代码重复率、问题分布及问题趋势等多维度数据。

![](https://help-assets.codehub.cn/enterprise/20210729183222.png)

-   圈复杂度

圈复杂度是一种代码复杂度的衡量标准，用来表示程序的复杂度。圈复杂度大说明程序代码的判断逻辑复杂，可能存在质量低下且难以测试和维护的问题。

如需了解更多代码扫描的使用方法，参考[扫描任务](/docs/code-scan/task.html)。

