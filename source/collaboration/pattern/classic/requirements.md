---
title: 管理需求 - CODING 帮助中心
pageTitle: 管理需求
pagePrevTitle: 模式介绍
pagePrev: collaboration/pattern/classic/intro.html
pageNextTitle: 计划
pageNext: collaboration/pattern/classic/plan.html
---

需求是指用户解决某一问题或达到某一目标所需的软件功能，决定了软件研发的方向与结果，由产品经理创建，可拆分子需求，最后拆分成任务。团队可以通过 CODING 经典项目管理中的「需求」模块，创建并将较大粒度的需求分解为较小的子需求，并在需求下新建或关联任务、缺陷，实现开发任务的快速分解和分配。

### [创建需求](#create)

1.  进入任一项目后，在「项目协同」->「需求」模块右上方选择「创建需求」，填写需求标题、需求描述等基本信息后即可完成创建。

![](https://help-assets.codehub.cn/enterprise/20210624164519.png)

2.  创建完成后，可以进行设置处理人、规划所属迭代、调整优先级、设置起始日期等详细操作，支持团队根据管理习惯，对需求的属性维度自定义，具体设置请参考[《自定义事项属性》](/docs/collaboration/customize/attributes.html)。

![](https://help-assets.codehub.cn/enterprise/20210624165027.png)

### [需求分解](#decompose)

子工作项（子需求、子任务）是为实现需求所进行的具体活动，通过在需求下创建子工作项可实现对需求的分解和分配。

#### [分解子需求](#sub-requirement)

需求可分解子需求，子需求内又可继续分解，最多支持 5 层子需求。请注意，一个需求同时只能属于一个父需求。

1.  在需求详情页选择「分解需求」。

![](https://help-assets.codehub.cn/enterprise/20210624181747.png)

2.  可以仅输入子需求标题快速创建，也可以在「创建」下拉菜单中选择「完整创建」（快捷键：shift + 回车），填写子需求详情后完成创建；也可以关联已有需求，输入事项 ID 或标题即可快速查找。

![](https://help-assets.codehub.cn/enterprise/20210624181957.png)

![](https://help-assets.codehub.cn/enterprise/20210624182121.png)

3.  子需求项创建成功后，可以在父需求详情页中查看，也可以在需求列表页查看该子需求。

![](https://help-assets.codehub.cn/enterprise/20210624182336.png)

![](https://help-assets.codehub.cn/enterprise/20210624182509.png)

4.  在需求详情页内，通过指定子需求后方`···`菜单内「创建子需求」；或在子需求详情页内，通过上方的「分解需求」，均可创建该子需求的子需求。

![](https://help-assets.codehub.cn/enterprise/20210624184021.png)

![](https://help-assets.codehub.cn/enterprise/20210624184104.png)

5.  在需求详情页内，通过指定子需求后方`···`菜单内的选项，可以更改关联的父需求，也可以与当前父需求解除关联。

![](https://help-assets.codehub.cn/enterprise/20210624184336.png)

![](https://help-assets.codehub.cn/enterprise/20210624184414.png)

#### [分解子任务](#sub-tasks)

需求可分解子任务，一个任务只能同时关联一个父需求。

1.  在需求详情页选择「分解任务」。

![](https://help-assets.codehub.cn/enterprise/20210624184503.png)

2.  可以仅输入子任务标题快速创建，也可以在「创建」下拉菜单中选择「完整创建」（快捷键：shift + 回车），填写子任务详情后完成创建；也可以关联已有任务，输入事项 ID 或标题即可快速查找。

![](https://help-assets.codehub.cn/enterprise/20210624184638.png)

3.  子任务项创建成功后，可以在父需求详情页中查看，也可以在任务列表页查看该子任务。

![](https://help-assets.codehub.cn/enterprise/20210624184803.png)

![](https://help-assets.codehub.cn/enterprise/20210624184924.png)

4.  在需求详情页内，通过指定子任务后方`···`菜单内的选项，可以更改关联的父需求，也可以与当前父需求解除关联。

![](https://help-assets.codehub.cn/enterprise/20210624185016.png)

### [关联资源](#resource)

#### [关联缺陷](#bugs)

需求可以关联相同项目内的多个缺陷，但一个缺陷只能关联一个需求。

1.  在需求列表页，通过上方「关联缺陷」选项，可以关联已有缺陷，或者快速创建新的缺陷与之关联。

![](https://help-assets.codehub.cn/enterprise/20210624193741.png)

2.  在需求详情页，可以通过关联缺陷右侧`···`菜单「取消关联」；同时在缺陷详情页右侧菜单内，也可以查看当前关联的需求，并解除或切换关联。

![](https://help-assets.codehub.cn/enterprise/20210624194022.png)

![](https://help-assets.codehub.cn/enterprise/20210624194313.png)

3.  在缺陷详情页内，通过右上方`···`，可将该缺陷转为新需求。

![](https://help-assets.codehub.cn/enterprise/20210624194206.png)

![](https://help-assets.codehub.cn/enterprise/20210624194514.png)

#### [关联测试用例](#cases)

需求可以关联已有测试用例。在需求详情页内，通过上方`···`菜单内的「关联测试用例」，输入测试用例 ID 或标题，即可查找并完成关联。关于测试用例的创建与管理，可查阅[《测试用例》](https://help.coding.net/docs/test-management/cases/create.html)。

![](https://help-assets.codehub.cn/enterprise/20210624195239.png)

#### [关联阻塞关系](#blocking)

需求内可以设置已有事项为前置/后置阻塞事项。在需求详情页内，通过上方`···`菜单内的「阻塞关系」，输入事项 ID 或标题，即可查找并完成关联。可在「前置/后置事项」中切换。关于阻塞关系的详细讲解，可查阅[《阻塞关系》](/docs/collaboration/pattern/classic/blocking.html)。

![](https://help-assets.codehub.cn/enterprise/20210624195436.png)

#### [引用资源](#references)

在需求详情页的描述或评论中，可通过【 # + 引用 ID/标题】形式选择资源，引用的资源将会在引用列表中展示；如果当前需求被其他资源引用，那么其他资源将会显示在该需求的被引用列表中。

![](https://help-assets.codehub.cn/enterprise/20210627184315.png)

还支持将**代码提交**与事项进行关联，可以在代码执行提交时，在提交信息中插入关联事项【 # + 引用 ID/标题】信息（例如：这是一次提交 #4）。详情可查阅[《引用资源&上传附件》](/docs/collaboration/customize/references.html)。

![](https://help-assets.codehub.cn/enterprise/20210617175403.png)

### [需求状态流转](#status)

需求状态是指需求在生命周期中所处的阶段，用于组织和跟踪需求，默认包含 4 个状态：未开始、开发中、测试中、已完成。

1.  在需求列表页「创建需求」后，进入该需求详情页，需求状态默认为「未开始」，可在右侧下拉菜单中手动切换状态。

![](https://help-assets.codehub.cn/enterprise/20210628202643.png)

2.  在需求列表页，可以在「状态」栏中，根据需求进行的阶段切换需求状态。

![](https://help-assets.codehub.cn/enterprise/20210628202710.png)

3.  在「项目设置」->「项目协同」->「事项类型」->「需求」末端的「工作流」中，可自定义需求工作流，详情请查阅[《自定义工作流》](/docs/collaboration/customize/workflow.html)。

![](https://help-assets.codehub.cn/enterprise/20210628202753.png)

### [需求视图](#view)

在需求列表页，可以根据使用习惯，在「树状视图」、「平铺视图」、「看板视图」中无缝切换视图模式，这是产品相关人员的主要工作界面，可以帮助你对目前项目内的所有需求建立全局概念。系统将默认记住上次使用的视图模式，下次使用时将应用相同的视图模式。

当存在大量需求时，配合使用搜索框与筛选器，便可以在繁杂的信息中快速筛选出需要的内容。具体操作及管理可查阅[《事项视图管理》](/docs/collaboration/customize/view.html)。

![](https://help-assets.codehub.cn/enterprise/20210624195843.png)

### [版本回溯](#backdate)

需求内所有变更都会记录在活动日志中，可以通过详情页内右上方`···`菜单内的「历史版本」按时间顺序查看所有版本。支持版本回溯，可以选择任意历史版本进行恢复，详情可查阅[《版本管理》](/docs/collaboration/customize/version-control.html)。

![](https://help-assets.codehub.cn/enterprise/20210617183115.png)

### [导入/导出需求](#import)

需求支持批量导入和导出，可在需求列表页右上角`···`菜单中导入/导出需求，具体操作可查阅[《导入&导出事项》](/docs/collaboration/customize/import-export.html)。

![](https://help-assets.codehub.cn/enterprise/20210625111255.png)

### [删除需求](#delete)

在需求详情页内，可以通过右上方`···`菜单进行「删除」操作。如果含有子工作项（子需求、子任务），将全部删除，但不会影响所关联缺陷的状态，请谨慎操作。

![](https://help-assets.codehub.cn/enterprise/20210624165727.png)

如仅需删除子需求/子任务/缺陷，可在需求详情页或子需求/子任务/缺陷详情页内，通过`···`菜单进行「删除」操作。

![](https://help-assets.codehub.cn/enterprise/20210624183637.png)

==== 2021/07/02 ====
