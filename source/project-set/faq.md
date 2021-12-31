---
title: 常见问题 - CODING 帮助中心
pageTitle: 常见问题
pagePrevTitle: 成员与权限管理
pagePrev: project-set/members.html
---

以下是项目集使用过程中的常见问题。

### [项目集与项目的数据互通吗？](#1)

项目集与项目的数据互通。如果一个项目加入了项目集，在项目集中可以关联该项目下的任一事项。同理，在项目中，也可以将任一事项关联至项目集工作项。具体关联方法可参考[在项目集中分解工作项到项目](/docs/project-set/start.html#project-set-allocate)和[在项目中关联事项至项目集工作项](/docs/project-set/start.html#project-allocate)。

**注意**：

-   项目集工作项支持关联项目中的需求、缺陷、任务等事项类型；暂不支持关联 [Scrum 敏捷项目](/docs/collaboration/pattern/scrum/intro.html)中的[子工作项](/docs/collaboration/pattern/scrum/requirements.html#decompose)。
-   在项目集中引用资源时，仅支持引用项目集中创建的工作项（包括子工作项），尚不支持引用项目中的资源。


### [同一事项的状态是否在项目与项目集中保持同步？](#2)

是。由于项目集与项目的数据互通，同一事项在项目与项目集中的状态会自动同步。详情请参考[跟踪工作项状态](/docs/project-set/start.html#track)。


### [若项目集工作项下所有的项目事项均已完成，该工作项是否会自动显示「已完成」状态？](#3)

不会。项目集工作项的状态需要手动更新。否则即使工作项下所有关联项目事项均已完成，工作项会仍显示「未开始」状态。工作项的状态更新之后，将会同步至各关联项目事项。详情请参考[跟踪工作项状态](/docs/project-set/start.html#track)。


### [项目集中的甘特图是否支持显示进度？](#4)

不支持。项目集中的甘特图只显示工作项状态。甘特图默认支持三种颜色：蓝色代表未完成；绿色代表完成；橙色代表逾期未完成。

有关配置甘特图显示状态的方法，请参考[跟踪工作项状态](/docs/project-set/start.html#track)。

![](https://help-assets.codehub.cn/enterprise/20210923155019.png)

### [项目集概览中显示的项目进度条代表什么？](#5)

在项目集的「概览」中，「项目」区域显示的进度条代表分解到该项目的事项完成比例。比如， 2 个事项完成了 2 个，将显示**100% 2/2 事项**。

![](https://help-assets.codehub.cn/enterprise/20210923103205.png)

==== 2021/09/29 ====
