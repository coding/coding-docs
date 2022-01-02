---
title: 管理缺陷 - CODING 帮助中心
pageTitle: 管理缺陷
pagePrevTitle: 管理任务
pagePrev: collaboration/pattern/classic/tasks.html
pageNextTitle: 阻塞关系
pageNext: collaboration/pattern/classic/blocking.html
---

CODING 项目协同的「缺陷」功能可以帮助团队清晰了解缺陷（Bug）的具体信息，提高缺陷流转及处理效率，极大提升企业用户进行大规模缺陷管理的效率。

### [创建缺陷](#create)

1.  进入任意项目后，在「项目协同」->「缺陷」模块右上方选择「创建缺陷」，填写缺陷标题、缺陷描述等基本信息后即可完成创建。

![](https://help-assets.codehub.cn/enterprise/20210627191531.png)

2.  创建完成后，缺陷状态默认为「待处理」，可以在缺陷详情页切换状态，并进行设置处理人、关联所属需求、规划所属迭代、调整优先级、设置起始日期、预估/记录工时、添加标签等详细操作。

![](https://help-assets.codehub.cn/enterprise/20210627205337.png)

### [关联阻塞关系](#blocking)

缺陷内可以设置已有事项为前置/后置阻塞事项。在缺陷详情页内，通过上方「阻塞关系」选项，输入事项 ID 或标题，即可查找并完成关联。可在「前置/后置事项」中切换。关于阻塞关系的详细讲解，可查阅[《阻塞关系》](/docs/collaboration/pattern/classic/blocking.html)。

![](https://help-assets.codehub.cn/enterprise/20210627210142.png)

### [引用资源](#references)

在缺陷详情页的描述或评论中，可通过【 # + 引用 ID/标题】形式选择资源，引用的资源将会在引用列表中展示；如果当前缺陷被其他资源引用，那么其他资源将会显示在该缺陷的被引用列表中。

![](https://help-assets.codehub.cn/enterprise/20210627210921.png)

还支持将**代码提交**与事项进行关联，可以在代码执行提交时，在提交信息中插入关联事项【 # + 引用 ID/标题】信息（例如：这是一次提交 #4）。详情可查阅[《引用资源&上传附件》](/docs/collaboration/customize/references.html)。

![](https://help-assets.codehub.cn/enterprise/20210617175403.png)

### [缺陷状态流转](#status)

缺陷状态是指缺陷在生命周期中所处的阶段，用于组织和跟踪缺陷，是实现缺陷处理工作流的核心手段，默认包含 6 个状态：待处理、处理中、待验证、已拒绝、重新打开、已关闭。

1.  在缺陷列表页「创建缺陷」后，进入该缺陷详情页，缺陷状态默认为「待处理」，可在右侧下拉菜单中手动切换状态。

![](https://help-assets.codehub.cn/enterprise/20210628201228.png)

2.  在缺陷列表页，可以在「状态」栏中，根据缺陷进行的阶段切换缺陷状态。

![](https://help-assets.codehub.cn/enterprise/20210628200644.png)

3.  在「项目设置」->「项目协同」->「事项类型」->「缺陷」末端的「工作流」中，可自定义缺陷工作流，详情请查阅[《自定义工作流》](/docs/collaboration/customize/workflow.html)。

![](https://help-assets.codehub.cn/enterprise/20210628202110.png)

### [缺陷视图](#view)

在缺陷列表页，可以根据使用习惯，在右上角「平铺视图」、「看板视图」中切换视图模式，系统将默认记住上次使用的视图模式，下次使用时将应用相同的视图模式。可以配合使用搜索框与筛选器，快速筛选出需要的内容。详细操作及管理可查阅[《事项视图管理》](/docs/collaboration/customize/view.html)。

![](https://help-assets.codehub.cn/enterprise/20210627211923.png)

### [版本回溯](#backdate)

缺陷的变更与修改都会记录在活动日志中，可以通过「查看该版本」按时间查看所有历史版本。支持版本回溯，可以选择任意历史版本进行恢复，详情可查阅[《版本管理》](/docs/collaboration/customize/version-control.html)。

![](https://help-assets.codehub.cn/enterprise/20210617183115.png)

### [缺陷类型与缺陷模块](#type&module)

#### [管理缺陷类型](#type)

在创建缺陷以及进行缺陷管理操作时，可以设置缺陷的所属类型。CODING 缺陷管理默认提供了五种缺陷类型：
-   功能缺陷
-   UI 界面问题
-   易用性问题
-   安全问题
-   性能问题

![](https://help-assets.codehub.cn/enterprise/20210627214649.png)

也可以根据团队需求自定义缺陷类型，仅**团队所有者**及**管理员**可创建缺陷类型。缺陷类型添加成功后，团队内所有项目均可选用该缺陷类型。

##### [创建/使用缺陷类型](#type-create)

1.  在任一项目内，在左侧菜单「项目设置」->「项目协同」->「事项类型」中，选择「缺陷」末端的「属性」菜单。

![](https://help-assets.codehub.cn/enterprise/20210627215137.png)

2.  进入「事项类型/缺陷」后，选择「缺陷类型」末端的「配置菜单选项」。

![](https://help-assets.codehub.cn/enterprise/20210627215321.png)

3.  输入新增缺陷类型名称，可上下拖拽调整各缺陷类型优先级，「添加」并「确定」后，在「事项类型/缺陷」中选择「应用配置」，即可完成缺陷类型的添加并生效。

![](https://help-assets.codehub.cn/enterprise/20210627213825.png)

![](https://help-assets.codehub.cn/enterprise/20210627215511.png)

4.  创建缺陷时或在缺陷详情页，通过右侧「缺陷类型」菜单即可选择新增缺陷类型。

![](https://help-assets.codehub.cn/enterprise/20210627215645.png)

#### [管理缺陷模块](#module)

该功能主要用于配置缺陷所属模块，创建不同的模块可便于管理和定位缺陷位置，满足专业化场景需要，且模块数据在项目内共享，协作更为高效。

##### [创建/使用缺陷模块](#module-create)

1.  在任一项目内，在左侧菜单「项目设置」->「项目协同」->「模块设置」中，选择「创建模块」。

![](https://help-assets.codehub.cn/enterprise/20210627220748.png)

2.  输入模块名称，选择「保存」即可完成缺陷模块添加。可在「模块设置」中的各模块末端，通过「↑」「↓」调整多个模块的显示优先级，并进行模块重命名、删除操作。

![](https://help-assets.codehub.cn/enterprise/20210627220829.png)

![](https://help-assets.codehub.cn/enterprise/20210627221054.png)

3.  创建缺陷时或在缺陷详情页，通过右侧「模块」菜单即可将缺陷规划入。

![](https://help-assets.codehub.cn/enterprise/20210627221512.png)

### [删除缺陷](#delete)

在缺陷详情页内，通过右上方`···`内的「删除」，即可删除缺陷。

![](https://help-assets.codehub.cn/enterprise/20210627205531.png)

==== 2021/07/02 ====
