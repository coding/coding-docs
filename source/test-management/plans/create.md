---
title: 创建测试计划 - CODING 帮助中心
pageTitle: 创建测试计划
pagePrevTitle: 用例评审
pagePrev: test-management/cases/review.html
pageNextTitle: 执行测试计划
pageNext: test-management/plans/execute.html
alias: test-management/plans-management.html
---

### [功能介绍](#intro)

测试计划是测试用例的集合，它描述了本次测试活动的对象、范围、方法、工作进度与预期结果。通常在完成编写测试用例后，使用测试计划进行逐项功能测试。

### [创建测试计划](#create)

1.  进入项目之后，点击左侧导航栏「测试管理」->「测试计划」进入测试计划管理页面。

2.  点击页面右上角的按钮创建测试计划。

![](https://help-assets.codehub.cn/enterprise/20210513174913.png)

测试计划分为[迭代测试](#iteration-test)、[发布测试](#release-test)、[普通测试](#common-test)三种类型。

#### [迭代测试](#iteration-test)

[迭代](/docs/collaboration/iterations/basic.html)是项目协同中的常用功能。迭代测试是围绕迭代单位展开的测试计划类型。您可以在迭代测试栏中直接查看位于不同阶段的迭代，快速将测试用例与迭代中的需求进行关联。

![](https://help-assets.codehub.cn/enterprise/20210513201136.png)

> 测试环境的不同将会影响自动化执行的配置。

![](https://help-assets.codehub.cn/enterprise/20210514101700.png)

选择「包含全部用例」后，所有测试用例都将成为当前测试计划下的测试任务；若选择「手动圈选用例」，会弹出筛选器辅助圈定测试用例。

测试计划创建之后会出现在测试计划列表，点击测试计划名称即可进入其详情页面。「未关联需求用例」页签会列出尚未与任何项目需求关联的测试用例，可参考[关联需求](/docs/test-management/cases/requirements.html)进行关联。

![](https://help-assets.codehub.cn/enterprise/20210514113206.png)

#### [发布测试](#release-test)

发布测试用于适配日常小版本发布、持续部署中的紧急发布或 Hotfix 场景下的测试计划类型。填写所属仓库及发布的版本，圈选用例后创建测试计划。

![](https://help-assets.codehub.cn/enterprise/20210507154751.png)

#### [普通测试](#common-test)

即常规的测试计划类型，不与迭代或版本关联。填写标题与勾选所属分组，圈选用例后完成创建。

![](https://help-assets.codehub.cn/enterprise/20210507163014.png)

### [分配至处理人](#allocate)

创建测试计划后，在测试计划列表，点击测试计划名称进入其详情页面。

单个用例仅能将该用例分配至处理人，多选用例后点击右上方的分配按钮可进行批量分配。

![](https://help-assets.codehub.cn/enterprise/20210909170740.png)

==== 2021/09/09 ====
