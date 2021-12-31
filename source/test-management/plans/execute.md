---
title: 执行测试计划 - CODING 帮助中心
pageTitle: 执行测试计划
pagePrevTitle: 创建测试计划
pagePrev: test-management/plans/create.html
pageNextTitle: 管理测试计划
pageNext: test-management/plans/manage.html
---

### [功能介绍](#intro)

测试计划由测试用例组成，执行测试计划本质上是对其中的每一条测试用例进行逐一审阅，我们提供了手动与自动化两种执行方式。

### [手动执行](#manual)

手动执行的特点在于需要手动逐个审阅并得出测试结果。
1.  进入项目之后，点击左侧导航栏「测试管理」->「测试计划」。
2.  在测试计划列表，点击需要执行的测试计划。进入其详情页面之后，点击页面右上角「开始测试」即可开始手动执行测试计划。

![](https://help-assets.codehub.cn/enterprise/20210909173727.png)

在测试计划的执行过程中可以进行记录结果与备注、上传附件、对测试未通过的用例进行缺陷关联等操作。

#### [记录测试结果](#record-result)

测试计划开始之后，可针对计划内的每一条测试用例进行结果记录，直至所有测试用例完成结果记录。

1.  点击测试用例下方的「记录结果」按钮进行记录。记录测试过程中的结果或上传相关附件，[步骤类型用例](/docs/test-management/cases/create.html#type)支持更加细分的步骤结果记录，为开发人员提供清晰了然的闭环信息。

![](https://help-assets.codehub.cn/enterprise/20210517142859.png)

2.  结果记录完成之后，点击「添加结果并下一条」可自动进入下一条测试用例进行评审。

#### [关联缺陷](#allocate-defect)

若测试结果为失败，可以直接在详情页创建缺陷并提交给研发人员。相关人员在收到缺陷事项类型后可以立即查看对应的测试用例。点击「记录结果」->「关联缺陷」即可关联或新建缺陷。

![](https://help-assets.codehub.cn/enterprise/20210517145128.png)

关联后，缺陷详情页亦会出现已关联的测试用例。

![](https://help-assets.codehub.cn/enterprise/20210517151808.png)

完成所有的测试用例结果记录后，也就意味着一项测试计划的完成。

### [自动执行](#auto)

自动化执行可以避免因个人的惯性思维所导致的纰漏，也可以减少由于重复工作所导致的人为差错。自动执行将逐一比对代码仓库与中的预期结果，自动得出测试报告，详情请参考[自动化用例库](/docs/test-management/automatic.html)。

==== 2021/09/09 ====
