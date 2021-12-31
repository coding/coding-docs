---
title: 快速开始 - CODING 帮助中心
pageTitle: 快速开始
pagePrevTitle: 自动化用例库
pagePrev: test-management/automatic.html
pageNextTitle: 测试活动概览
pageNext: test-management/overview.html
---

### [设置部门负责人](#head-of-department)

在使用工作负载前，需先行指定部门负责人。团队所有者 / 团队管理员点击团队首页右上角的齿轮图标 <img src ="https://help-assets.codehub.cn/enterprise/20210928153255.png" style ="margin:0"> 进入团队设置中心，点击「成员管理」→「部门菜单按钮」设置负责人。仅部门负责人具备观测成员工作负载的权限。

![](https://help-assets.codehub.cn/enterprise/20211228153534.png)

> 若还没有创建部门，请参考阅读[创建部门](/docs/admin/member/organization.html#create)，创建部门后需[将成员添加至部门](/docs/admin/member/members-organization.html#set-department)，再为部门设置负责人。若为企业微信组织架构类型团队，请参考[此处](/docs/workload/permission.html#wechat-import)设置部门负责人。

### [创建分组](#group)

设置负责人后，需建立分组并圈选需纳入负载观察的团队成员，通常情况下以部门或小组为单位进行分组。

#### [添加成员](#add)

1.  首次进入工作负载后，已存在默认分组。在下拉菜单中选择「创建分组」，根据部门确定分组名称后完成创建。

![](https://help-assets.codehub.cn/enterprise/20210909170006.png)

2.  创建完成后点击上方蓝色➕ 号按钮添加组内成员。

3.  在搜索栏中直接搜索并添加指定成员，或根据部门组织架构选择「从负责部门选择」批量添加成员。

![](https://help-assets.codehub.cn/enterprise/20210909173115.png)

4.  如未设置组织架构，请参考[《管理组织架构》](https://help.coding.net/docs/admin/member/organization.html)自定义部门/子部门。

5.  添加完毕后选择「确认添加」即可。

#### [编辑分组](#modify-group)

在上方分组右侧的下拉菜单中，选择指定分组右侧「···」菜单，可以对该分组进行「重命名」或「删除」操作。

![](https://help-assets.codehub.cn/enterprise/20210909181505.png)

#### [查看成员详情](#user-detail)

在分组内指定成员右侧的「···」菜单中，选择「成员详情」，即可查看该成员的参与项目、近期事项完成情况汇总和工作动态。

 ![](https://help-assets.codehub.cn/enterprise/20210909182608.png)

![](https://help-assets.codehub.cn/enterprise/20210909182712.png)

#### [移除成员](#remove-user)

在分组内指定成员右侧的「···」菜单中，选择「移除」，即可将该成员移除出该分组。

![](https://help-assets.codehub.cn/enterprise/20210909182310.png)

### [查看成员工作量](#view-user-workload)

进入已添加成员的分组后，左侧展示该组内所有成员，右侧展示组内所有成员近一段时间，每天/每周同时进行的事项数。

以图中红圈标识为例，说明在 9 月 1 日周三当天，成员 Livia 有 1 项事项，成员刘周有 1 项事项，成员潘潘有 2 项事项。

![](https://help-assets.codehub.cn/enterprise/20210909183856.png)

成员的工作量可「按日」或「按周」统计，可在右上方切换统计方式。

![](https://help-assets.codehub.cn/enterprise/20210909184025.png)

#### [查看事项](#view-issue)

选择指定成员，右侧将展开显示该成员的详细事项日历。

![](https://help-assets.codehub.cn/enterprise/20210909182953.png)

在事项日历内，展示了该成员在近段时间内的事项安排情况，默认显示事项标题。将光标移动到指定事项上，将显示事项简介，包括事项编号、标题、状态、进度、周期和所属项目，点击即可打开并查看事项详情页。事项进度条颜色则根据事项进度不同有所区别。

![](https://help-assets.codehub.cn/enterprise/20210909184314.png)

![](https://help-assets.codehub.cn/enterprise/20210909184443.png)

在分组内的成员头像下，将提示未规划时间事项数，选择「详情」可快速查看所有事项。进入事项详情页并设置事项时间后，该事项将记入统计。

![](https://help-assets.codehub.cn/enterprise/20210909184602.png)

可以通过页面下方的横轴左右拖拽调整日期，并通过右侧「今天」选项返回当天。

![](https://help-assets.codehub.cn/enterprise/20210909184835.png)

#### [视图设置](#setting)

可在右上方「视图设置」中，调整「默认每日事项数」。该数值作为一个衡量指标，表示成员每天同时处理的饱和事项数。该设置仅在日视图下生效。
-   若当天事项数小于该值，则统计数字为黑色，表示工作量适中或偏少；
-   若大于该数值，则统计数字为红色，表示工作量偏多。

![](https://help-assets.codehub.cn/enterprise/20210909185040.png)

==== 2021/12/29 ====
