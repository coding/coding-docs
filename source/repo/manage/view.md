---
title: 查看仓库详情 - CODING 帮助中心
pageTitle: 查看仓库详情
pagePrevTitle: 导入或关联外部仓库
pagePrev: repo/manage/sync-relate.html
pageNextTitle: 设置仓库基本信息
pageNext: repo/manage/basic.html
---

在「代码仓库」页面，点击任一仓库名称即可进入该仓库的详情页面。详情页面默认显示 master 分支的文件和提交历史等信息。

### [文件列表](#file-list)

进入仓库的详情页面之后，默认显示仓库中 master 分支的文件目录结构，并展开 `readme` 文件的具体内容。

点击左侧目录结构中的任一文件夹，该文件夹中包含的所有文件将会在右侧「文件」页签中列出。你可以新增文件或文件夹，或执行重命名、锁定、上传、下载或删除操作。

![](https://help-assets.codehub.cn/enterprise/20210915161411.png)

点击左侧目录结构中的任一文件，该文件的内容将会显示在右侧「文件」页签。你可以对当前文件进行编辑，或执行重命名、锁定、RAW、下载或删除操作。

![](https://help-assets.codehub.cn/enterprise/20210915161845.png)

> 将鼠标悬浮在目录结构中的任一文件或文件夹上，会出现更多操作按钮。你也可以通过该按钮执行对应操作。

### [提交历史](#commit-history)

点击「历史」页签，默认进入 master 分支的提交历史页面。

提交记录按照日期倒序排列。点击任一提交记录的名称或右侧的 SHA ID 可以跳转至该代码仓库的「提交」页签查看[提交详情](#commit-details)。

![](https://help-assets.codehub.cn/enterprise/20210915163517.png)

### [提交详情](#commit-details)

在代码仓库详情页，点击「提交」即可进入提交记录管理页面。该页面默认按照时间倒序列出 master 分支的提交记录。你可以切换为其他分支，查看相应的提交历史记录。

![](https://help-assets.codehub.cn/enterprise/20210915173108.png)

点击任一提交记录的名称或 SHA ID，将会在新页面打开该记录的详情页面，清晰地列出本次提交中所有更改过的文件。

![](https://help-assets.codehub.cn/enterprise/20210915173201.png)

代码的行级对比支持使用[普通模式](#common-mode)、[左右模式](#left-right)与[高级选项](#advance)以便更快发现代码间的异同，还支持对每行代码发起评论。

#### [普通模式](#common-mode)

普通模式下，代码文件中会显示该提交改动过的所有文件。展开任一文档，可查看具体的提交改动。每个文件内会显示具体的行级增删修改信息。其中，绿色代表增加，红色表示减少。

![](https://help-assets.codehub.cn/enterprise/20210915173352.png)

#### [左右模式](#left-right)

点击「切换为左右模式」，代码行级对比由普通模式切换为左右模式。用户可清晰地对比代码改动前后的内容。改了哪一行、修改了什么内容均一目了然。

你还可以选择浏览改动前/后的文件或 Diff 文件。

![](https://help-assets.codehub.cn/enterprise/20210915174538.png)

#### [高级选项](#advance)

高级选项支持折行显示、显示制表符及性能模式。你可以按需打开或关闭对应选项。

![](https://help-assets.codehub.cn/enterprise/20210915174738.png)




==== 2021/10/28 ====
