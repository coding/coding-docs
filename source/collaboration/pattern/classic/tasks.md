---
title: 管理任务 - CODING 帮助中心
pageTitle: 管理任务
pagePrevTitle: 管理迭代
pagePrev: collaboration/pattern/classic/iterations.html
pageNextTitle: 管理缺陷
pageNext: collaboration/pattern/classic/bugs.html
---

任务是常见的团队协作载体，在团队拆分需求后，例如开发人员拆分出开发任务、测试人员拆分出测试任务后，可以在「项目协同」->「任务」中或关联需求内直接进行创建，并设置优先级、截止日期、预估工时并追踪进度，同时可以与任务参与者在评论中随时随地展开讨论，细致的任务动态能帮助你回溯一切关于该任务的历史消息。

### [创建任务](#create)

1.  进入任意项目，在「项目协同」->「任务」模块右上方选择「创建任务」，或在关联需求内选择「分解任务」，填写任务标题、任务描述等基本信息后即可完成创建。

![](https://help-assets.codehub.cn/enterprise/20210625151937.png)

![](https://help-assets.codehub.cn/enterprise/20210624184503.png)

2.  创建完成后，可以进行设置处理人、关联所属需求、规划所属迭代、调整优先级、设置起始日期、预估/记录工时、添加标签等详细操作，详情可查阅[《管理需求 - 分解子任务》](/docs/collaboration/pattern/classic/requirements.html#sub-tasks)。

![](https://help-assets.codehub.cn/enterprise/20210625155209.png)

### [关联阻塞关系](#blocking)

任务内可以设置已有事项为前置/后置阻塞事项。在任务详情页内，通过上方「阻塞关系」选项，输入事项 ID 或标题，即可查找并完成关联。可在「前置/后置事项」中切换。关于阻塞关系的详细讲解，可查阅[《阻塞关系》](/docs/collaboration/pattern/classic/blocking.html)。

![](https://help-assets.codehub.cn/enterprise/20210625160432.png)

### [引用资源](#references)

在任务详情页的描述或评论中，可通过【 # + 引用 ID/标题】形式选择资源，引用的资源将会在引用列表中展示；如果当前任务被其他资源引用，那么其他资源将会显示在该任务的被引用列表中。

![](https://help-assets.codehub.cn/enterprise/20210627184636.png)

还支持将**代码提交**与事项进行关联，可以在代码执行提交时，在提交信息中插入关联事项【 # + 引用 ID/标题】信息（例如：这是一次提交 #4）。详情可查阅[《引用资源&上传附件》](/docs/collaboration/customize/references.html)。

![](https://help-assets.codehub.cn/enterprise/20210617175403.png)

### [任务状态流转](#status)

任务状态是指任务在生命周期中所处的阶段，用于组织和跟踪任务，默认包含 3 个状态：未开始、处理中、已完成。

1.  在任务列表页「创建任务」后，进入该任务详情页，任务状态默认为「未开始」，可在右侧下拉菜单中手动切换状态。

![](https://help-assets.codehub.cn/enterprise/20210628203112.png)

2.  在任务列表页，可以在「状态」栏中，根据任务进行的阶段切换任务状态。

![](https://help-assets.codehub.cn/enterprise/20210628203144.png)

3.  在「项目设置」->「项目协同」->「事项类型」->「任务」末端的「工作流」中，可自定义任务工作流，详情请查阅[《自定义工作流》](/docs/collaboration/customize/workflow.html)。

![](https://help-assets.codehub.cn/enterprise/20210628203211.png)

### [任务视图](#view)

在任务列表页，可以根据使用习惯，在右上角「平铺视图」、「看板视图」中切换视图模式，系统将默认记住上次使用的视图模式，下次使用时将应用相同的视图模式。可以配合使用搜索框与筛选器，在繁杂的信息中快速筛选出需要的内容。详细操作及管理可查阅[《事项视图管理》](/docs/collaboration/customize/view.html)。

![](https://help-assets.codehub.cn/enterprise/20210627190110.png)

### [版本回溯](#backdate)

任务的变更与修改都会记录在活动日志中，可以通过「查看该版本」按时间查看所有历史版本。支持版本回溯，可以选择任意历史版本进行恢复，详情可查阅[《版本管理》](/docs/collaboration/customize/version-control.html)。

![](https://help-assets.codehub.cn/enterprise/20210617183115.png)

### [删除任务](#delete)

在任务详情页内，通过右上方`···`内的「删除」，即可删除任务。

![](https://help-assets.codehub.cn/enterprise/20210630165154.png)

==== 2021/07/02 ====
