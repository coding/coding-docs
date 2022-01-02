---
title: 管理缺陷 - CODING 帮助中心
pageTitle: 管理缺陷
pagePrevTitle: 管理任务
pagePrev: collaboration/pattern/scrum/tasks.html
pageNextTitle: 故事点
pageNext: collaboration/pattern/scrum/story-points.html
alias: 
-   agile-development/bug-tracking/manual.html
-   collaboration/bugs/manual.html
-   collaboration/bugs/basic.html
-   collaboration/bugs/management.html
---

缺陷是指不符合最初定义的业务需求，其覆盖范围高于 Bug，除了错误编码外其他导致不符合最初定义的业务需求问题都属于缺陷范畴。

在 CODING 缺陷管理模块中，可以对缺陷归纳统一，详细记录缺陷类型、处理人、所属迭代、优先级、模块等信息，方便测试工程师了解整体进度，提高缺陷流转及处理效率

### [创建缺陷](#create)

进入任意项目后，在「项目协同」->「缺陷」模块右上方选择「创建缺陷」，填写缺陷标题、描述等基本信息后即可快速完成创建。

![](https://help-assets.codehub.cn/enterprise/20210701210951.png)

### [缺陷分解](#decompose)

可以在缺陷内创建子工作项，细化较大粒度的缺陷。

1、在缺陷详情页选择「添加子工作项」。可以仅输入子工作项标题快速创建，也可以在「创建」下拉菜单中选择「完整创建」（快捷键：shift + 回车），填写详情后完成创建。

![](https://help-assets.codehub.cn/enterprise/20210701211947.png)

![](https://help-assets.codehub.cn/enterprise/20210701212028.png)

2、子工作项创建成功后，可以在缺陷详情页中查看，也可以在「缺陷」列表页查看该子工作项。

![](https://help-assets.codehub.cn/enterprise/20210701212200.png)

![](https://help-assets.codehub.cn/enterprise/20210701212240.png)

3、在缺陷详情页内，通过指定子工作项后方`···`菜单内的选项，可以更改关联的父事项，或删除当前子工作项。

![](https://help-assets.codehub.cn/enterprise/20210701212321.png)

4、在实际开发流程中，可能会遇到因规划不足而出现的计划外缺陷，或缺陷较为复杂，需要团队投入大量精力来调研处理等临时情况。在这些场景下，可以进入缺陷详情页，通过右上方`···`，将该缺陷转为新需求，或根据实际情况更改所属史诗。

![](https://help-assets.codehub.cn/enterprise/20210701214142.png)

### [缺陷分配](#allocate)

缺陷及子工作项分解并创建完成后，可以分别进入详情页，规划所属迭代、关联需求、[设置故事点](/docs/collaboration/pattern/scrum/story-points.html)、选择缺陷类型、调整优先级、设置截止日期等详细内容，并分配给不同成员开始处理。

![](https://help-assets.codehub.cn/enterprise/20210701212917.png)

### [引用资源](#references)

在缺陷详情页的描述或评论中，可通过【 # + 引用 ID/标题】形式选择资源，引用的资源将会在引用列表中展示；如果当前缺陷被其他资源引用，那么其他资源将会显示在该缺陷的被引用列表中。

![](https://help-assets.codehub.cn/enterprise/20210701213049.png)

还支持将**代码提交**与事项进行关联，可以在代码执行提交时，在提交信息中插入关联事项【 # + 引用 ID/标题】信息（例如：这是一次提交 #4）。详情可查阅[《引用资源&上传附件》](/docs/collaboration/customize/references.html)。

![](https://help-assets.codehub.cn/enterprise/20210617175403.png)

### [缺陷状态流转](#status)

缺陷状态是指缺陷在生命周期中所处的阶段，是实现缺陷处理工作流的核心手段。

1、创建缺陷后，状态默认为「待处理」，可在缺陷详情页右侧下拉菜单中手动切换状态。

![](https://help-assets.codehub.cn/enterprise/20210701213304.png)

2、在缺陷列表页，也可以在「状态」栏中，根据进行阶段切换状态。

![](https://help-assets.codehub.cn/enterprise/20210701213337.png)

3、在「项目设置」->「项目协同」->「事项类型」中，可以自定义缺陷工作流，详情请查阅[《自定义工作流》](/docs/collaboration/customize/workflow.html)。

### [缺陷视图](#view)

缺陷列表是该项目的所有缺陷的列表视图，是测试人员和缺陷处理人员的主要工作界面，可以在任务列表页根据使用习惯，在「树状视图」、「平铺视图」、「看板视图」中无缝切换视图模式，系统将默认记住上次使用的视图模式，下次使用时将应用相同的视图模式。

当存在大量任务时，配合使用搜索框与筛选器，便可以在繁杂的信息中快速筛选出需要的内容。具体操作及管理可查阅[《事项视图管理》](/docs/collaboration/customize/view.html)。

![](https://help-assets.codehub.cn/enterprise/20210701213410.png)

### [版本回溯](#backdate)

缺陷内所有变更都会记录在活动日志中，可以通过详情页右上方`···`菜单内的「历史版本」按时间顺序查看所有版本。支持版本回溯，可以选择任意历史版本进行恢复，详情可查阅[《版本管理》](/docs/collaboration/customize/version-control.html)。

![](https://help-assets.codehub.cn/enterprise/20210701214245.png)

### [导入/导出缺陷](#import)

缺陷支持批量导入和导出，可在缺陷列表页右上角`···`菜单中导入/导出，具体操作可查阅[《导入&导出事项》](/docs/collaboration/customize/import-export.html)。

![](https://help-assets.codehub.cn/enterprise/20210701213624.png)

### [缺陷类型与缺陷模块](#type&module)

#### [管理缺陷类型](#type)

在创建缺陷以及进行缺陷管理操作时，可以设置缺陷的所属类型。CODING 缺陷管理默认提供了五种缺陷类型：
-   功能缺陷
-   UI 界面问题
-   易用性问题
-   安全问题
-   性能问题

![](https://help-assets.codehub.cn/enterprise/20210701215600.png)

也可以根据团队需求自定义缺陷类型，仅**团队所有者**及**管理员**可创建缺陷类型。缺陷类型添加成功后，团队内所有项目均可选用该缺陷类型。

##### [创建/使用缺陷类型](#type-create)

1、在任一项目内，在左侧菜单「项目设置」->「项目协同」->「事项类型」中，选择「缺陷」末端的「属性」菜单。

![](https://help-assets.codehub.cn/enterprise/20210701215655.png)

2、进入「事项类型/缺陷」后，选择「缺陷类型」末端的「配置菜单选项」。

![](https://help-assets.codehub.cn/enterprise/20210627215321.png)

3、输入新增缺陷类型名称，可上下拖拽调整各缺陷类型优先级，「添加」并「确定」后，在「事项类型/缺陷」中选择「应用配置」，即可完成缺陷类型的添加并生效。

![](https://help-assets.codehub.cn/enterprise/20210627213825.png)

![](https://help-assets.codehub.cn/enterprise/20210627215511.png)

4、创建缺陷时或在缺陷详情页，通过右侧「缺陷类型」菜单即可选择新增缺陷类型。

![](https://help-assets.codehub.cn/enterprise/20210701215833.png)

#### [管理缺陷模块](#module)

该功能主要用于配置缺陷所属模块，创建不同的模块可便于管理和定位缺陷位置，满足专业化场景需要，且模块数据在项目内共享，协作更为高效。

##### [创建/使用缺陷模块](#module-create)

1、在任一项目内，在左侧菜单「项目设置」->「项目协同」->「模块设置」中，选择「创建模块」。

![](https://help-assets.codehub.cn/enterprise/20210701215919.png)

2、输入模块名称，选择「保存」即可完成缺陷模块添加。可在「模块设置」中的各模块末端，通过「↑」「↓」调整多个模块的显示优先级，并进行模块重命名、删除操作。

![](https://help-assets.codehub.cn/enterprise/20210627220829.png)

![](https://help-assets.codehub.cn/enterprise/20210701215959.png)

3、创建缺陷时或在缺陷详情页，通过右侧「模块」菜单即可将缺陷规划入。

![](https://help-assets.codehub.cn/enterprise/20210701220058.png)

### [删除缺陷](#delete)

在缺陷详情页内，可以通过右上方`···`菜单进行「删除」操作。如果含有子工作项，将全部删除，请谨慎操作。

![](https://help-assets.codehub.cn/enterprise/20210701213718.png)

==== 2021/07/02 ====
