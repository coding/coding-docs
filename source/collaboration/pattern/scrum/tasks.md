---
title: 管理任务 - CODING 帮助中心
pageTitle: 管理任务
pagePrevTitle: 管理需求
pagePrev: collaboration/pattern/scrum/requirements.html
pageNextTitle: 管理缺陷
pageNext: collaboration/pattern/scrum/bugs.html
alias: 
-   agile-development/assignments.html
-   collaboration/assignments.html
-   collaboration/tasks/basic.html
---

任务是常见的团队协作载体，是为实现某个目标所进行的具体活动。一个任务的粒度可以在一个迭代中完成，一个迭代会完成若干个到几十个任务不等。

在「项目协同」->「任务」中创建任务后，可以设置处理人、所属迭代、故事点、优先级等内容，一个任务还可以关联或拆分为数个子工作项，自如管控任务分发；同时可以与任务处理人在评论中随时随地展开讨论，细致的任务动态能帮助你回溯一切关于该任务的历史操作。

### [创建任务](#create)

1、进入任意项目后，在「项目协同」->「任务」模块右上方选择「创建任务」，填写任务标题、描述等基本信息后即可快速完成创建。

![](https://help-assets.codehub.cn/enterprise/20210701202122.png)

2、创建完成后，可以进入任务详情页，进行设置处理人、规划所属迭代、[设置故事点](/docs/collaboration/pattern/scrum/story-points.html)、调整优先级、设置起始日期等详细操作。

![](https://help-assets.codehub.cn/enterprise/20210701202315.png)

### [任务分解](#decompose)

敏捷研发是快速迭代与交付的开发模式，这就要求迭代周期内的任务量不宜过大，因此可在任务内，将其分解为粒度更小的子工作项，让开发更加高效，确保在预期内能够按时交付。

1、在任务详情页选择「添加子工作项」。

![](https://help-assets.codehub.cn/enterprise/20210701202459.png)

2、可以仅输入子工作项标题快速创建，也可以在「创建」下拉菜单中选择「完整创建」（快捷键：shift + 回车），填写子工作项详情后完成创建。

![](https://help-assets.codehub.cn/enterprise/20210701203653.png)

![](https://help-assets.codehub.cn/enterprise/20210701173455.png)

3、子工作项创建成功后，可以在任务详情页中查看，也可以在「任务」列表页查看该子工作项。

![](https://help-assets.codehub.cn/enterprise/20210701204024.png)

![](https://help-assets.codehub.cn/enterprise/20210701203903.png)

4、在任务详情页内，通过指定子工作项后方`···`菜单内的选项，可以更改关联的父事项，或删除当前子工作项。

![](https://help-assets.codehub.cn/enterprise/20210701204154.png)

### [引用资源](#references)

在任务详情页的描述或评论中，可通过【 # + 引用 ID/标题】形式选择资源，引用的资源将会在引用列表中展示；如果当前任务被其他资源引用，那么其他资源将会显示在该任务的被引用列表中。

![](https://help-assets.codehub.cn/enterprise/20210701204557.png)

还支持将**代码提交**与事项进行关联，可以在代码执行提交时，在提交信息中插入关联事项【 # + 引用 ID/标题】信息（例如：这是一次提交 #4）。详情可查阅[《引用资源&上传附件》](/docs/collaboration/customize/references.html)。

![](https://help-assets.codehub.cn/enterprise/20210617175403.png)

### [任务状态流转](#status)

任务状态是指任务在生命周期中所处的阶段，用于组织和跟踪任务。

1、创建任务后，进入该任务详情页，状态默认为「未开始」，可在右侧下拉菜单中手动切换状态。

![](https://help-assets.codehub.cn/enterprise/20210701204730.png)

2、在任务列表页，也可以在「状态」栏中，根据进行阶段切换状态。

![](https://help-assets.codehub.cn/enterprise/20210701204927.png)

3、在「项目设置」->「项目协同」->「事项类型」中，可以自定义任务工作流，详情请查阅[《自定义工作流》](/docs/collaboration/customize/workflow.html)。

### [任务视图](#view)

可以在任务列表页根据使用习惯，在「树状视图」、「平铺视图」、「看板视图」中无缝切换视图模式，系统将默认记住上次使用的视图模式，下次使用时将应用相同的视图模式。

当存在大量任务时，配合使用搜索框与筛选器，便可以在繁杂的信息中快速筛选出需要的内容。具体操作及管理可查阅[《事项视图管理》](/docs/collaboration/customize/view.html)。

![](https://help-assets.codehub.cn/enterprise/20210701205105.png)

### [版本回溯](#backdate)

任务内所有变更都会记录在活动日志中，可以通过详情页右上方`···`菜单内的「历史版本」按时间顺序查看所有版本。支持版本回溯，可以选择任意历史版本进行恢复，详情可查阅[《版本管理》](/docs/collaboration/customize/version-control.html)。

![](https://help-assets.codehub.cn/enterprise/20210701205203.png)

### [导入/导出任务](#import)

任务支持批量导入和导出，可在任务列表页右上角`···`菜单中导入/导出，具体操作可查阅[《导入&导出事项》](/docs/collaboration/customize/import-export.html)。

![](https://help-assets.codehub.cn/enterprise/20210701205302.png)

### [删除任务](#delete)

在任务详情页内，可以通过右上方`···`菜单进行「删除」操作。如果含有子工作项，将全部删除，请谨慎操作。

![](https://help-assets.codehub.cn/enterprise/20210701205405.png)

==== 2021/07/02 ====
