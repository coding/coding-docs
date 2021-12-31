---
title: 自动化 - CODING 帮助中心
pageTitle: 自动化
pagePrevTitle: 规范
pagePrev:  compass/policy.html
pageNextTitle: true
pageNext: true
sitemap: false
---

通过自动化规则，项目管理员可以指定触发条件被触发之后执行的自动化操作，以此减少繁琐且有重复性的人为操作，规范项目流程，提高工作效率。

CODING Compass 支持的触发器及对应的自动化操作如下所示：

|  触发器   | 触发时执行的自动化操作  |
|  ----  | ----  |
| 事项已创建  | 变更事项状态 |
| 事项状态变更  | 创建代码分支 |
| 子工作项状态变更  | 创建代码分支、变更子工作项关联父事项状态 |
| 合并请求已合并  | 变更合并请求内关联事项状态 |
| 创建分支  | 变更分支关联事项状态 |

系统也提供内置的自动化规则模板，帮助你快速上手。

以下内容将举例说明如何通过自动化规则实现需求状态变更为「开发中」时自动在关联代码仓库创建分支。

### [前提条件](#prerequisite)

在使用 Compass 的自动化规则前，请为事项开启关联代码仓库功能。只有该功能开启，才能实现事项关联的代码仓库自动创建分支。


1.  在项目中，点击左下角「项目设置」进入项目设置页面。
2.  在「项目协同」->「事项类型」页面，选择需要关联仓库的事项类型，点击其属性按钮。

![](https://help-assets.codehub.cn/enterprise/20211102153228.png)

3.  在事项的属性配置页面，将「研发规范」页签的关联功能开启。

![](https://help-assets.codehub.cn/enterprise/20211102153332.png)

该功能开启之后，在创建事项时便可以直接关联代码仓库。

![](https://help-assets.codehub.cn/enterprise/20211102153445.png)


### [新增自动化规则](#new)

你可以新建自动化规则或直接从示例规则创建。

1.  在「Compass」->「自动化」中，点击右上角「新建规则」，选择「普通创建」进入新建规则页面。

![](https://help-assets.codehub.cn/enterprise/20211029165907.png)


2.  选择其中一种业务触发类型，如「事项状态变更」。

![](https://help-assets.codehub.cn/enterprise/20211029170026.png)

3.  配置触发的条件。例如，触发条件为“需求从任何状态变更为「开发中」”。

![](https://help-assets.codehub.cn/enterprise/20211029170222.png)

4.  指定触发器被触发之后进行的自动化操作。例如，当需求从任一状态变更为开发中，自动触发关联代码仓库按照命名规则创建一个分支。

-   **代码仓库**：指定事项关联的代码仓库或某个特定仓库。
-   **分支名称**：可使用**推荐命名**作为分支命名，或者按需**插入动态变量**。

![](https://help-assets.codehub.cn/enterprise/20211029170313.png)

点击右上角的保存按钮，该自动化规则立即生效，并显示在自动化规则列表。
![](https://help-assets.codehub.cn/enterprise/20211008162544.png)

### [触发自动化规则](#trigger)

在「项目协同」中新建一个需求，关联一个代码仓库，并将需求状态更改为「开发中」，即可触发上文中已创建的自动化规则。

![](https://help-assets.codehub.cn/enterprise/20211029170639.png)

点击右上角的通知按钮，可以看到代码分支创建成功的通知。

![](https://help-assets.codehub.cn/enterprise/20211008174722.png)

点击自动化通知中的分支链接，可以查看具体的代码分支已经创建成功。

![](https://help-assets.codehub.cn/enterprise/20211008175209.png)


### [查看自动化规则运行记录](#view)

你可以点击自动化规则列表的运行记录按钮查看任一规则的运行记录。

![](https://help-assets.codehub.cn/enterprise/20211008175431.png)

你也可以点击「设置」进入该规则的设置页面，然后点击设置页面右侧的运行记录按钮进行查看。

![](https://help-assets.codehub.cn/enterprise/20211008175615.png)

### [配置自动化规则失败通知](#notify)
 
自动化规则支持配置失败后通知，以便进行规则调整。

在自动化规则的设置页面，点击右侧设置按钮即可配置失败通知规则。你可以选择不通知或将失败消息通知到具体的用户组。在自动化规则运行失败后，指定用户组的成员将会收到站内信通知。

![](https://help-assets.codehub.cn/enterprise/20211008180046.png)

==== 2021/10/08 ====
