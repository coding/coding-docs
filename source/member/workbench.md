---
title: 个人工作台 - CODING 帮助中心
pageTitle: 个人工作台
pagePrevTitle: 个人设置概览
pagePrev: member/introduce.html
pageNextTitle: 个人账户管理——个人帐户设置
pageNext: member/personal-account/settings.html
---

### [功能介绍](#intro)

当你登录一个团队之后，会默认进入你的个人工作台。

![](https://help-assets.codehub.cn/enterprise/20210910103753.png)

在个人工作台中，你可以快速浏览当前团队下与你相关的所有项目事项、合并请求、构建记录及持续部署相关的待办工作事项。你还可以通过工作台右上角的项目筛选框快速过滤出指定项目中与你有关的项目事项。

工作台整合了待办信息，解决了多页面浏览的混乱低效，让你可更加专注于工作，提高工作效率。

### [我的事项](#item)


在「我的事项」页签，通过右上角的项目筛选框选择指定项目，将会展示该项目下所有分配给当前用户的事项和此项目内与当前用户相关的全部迭代。

> 若用户被分配了事项，但没有事项的查看权限，则在「我的事项」中不显示该事项。

![](https://help-assets.codehub.cn/enterprise/20210910105030.png)
#### [事项列表](#item-list)

**事项列表展示了分配给当前用户的所有未完成事项**，且默认按照 ID 降序排列。事项列表支持关键字搜索、翻页和手动刷新操作。

1.  通过点击「任务」、「需求」、「缺陷」或「史诗」页签可看具体类型的事项。

![](https://help-assets.codehub.cn/enterprise/20210910110736.png)

2.  支持将事项按照不同属性（ID、状态、优先级、截止时间）进行排序。

![](https://help-assets.codehub.cn/enterprise/20210910110339.png)

3.  点击任一事项的 ID 或标题，将在浏览器新窗口中打开该事项详情页。

![](https://help-assets.codehub.cn/enterprise/20210910111101.png)

4.  点击事项列表右上方的设置按钮，可以更改表格显示设置。

![](https://help-assets.codehub.cn/enterprise/20210910111427.png)
#### [迭代列表](#iteration-list)

**迭代列表展示了当前用户负责的、当前用户关注的以及当前用户的待处理的任务所在的迭代**，且默认按照 ID 降序排列。迭代列表支持关键字搜索、翻页和手动刷新操作。

1.  支持将迭代按照不同属性（ID、开始时间、结束时间、阶段、进度、负责人、所属项目）进行排序。

![](https://help-assets.codehub.cn/enterprise/20210910111917.png)

2.  选择任意一迭代，鼠标放置于进度条上，将展示更加详细的迭代进度信息。

![](https://help-assets.codehub.cn/enterprise/20210910112044.png)

3.  点击任一迭代的 ID 或者标题，将在浏览器新窗口中打开该迭代详情页。

![](https://help-assets.codehub.cn/enterprise/20210910112147.png)

### [合并请求](#merge-request)

合并请求分为「我发起的」、「我评审的」两个选项：

-   「我发起的」：展示由当前用户发起的合并请求，并且该合并请求还未完成合并。

-   「我评审的」：展示等待当前用户评审的合并请求。若合并请求已完成合并或该用户已评审则不展示。

针对每一行合并请求，可在最末端看到该合并请求的状态，比如**文件冲突**。点击任一合并请求的标题，将在浏览器新窗口中打开该合并请求详情页。

![](https://help-assets.codehub.cn/enterprise/20210910112536.png)

### [构建记录](#build-history)

**构建记录列表展示了当前用户触发的所有构建记录**，默认按照开始时间逆序排列。

1.  点击任一构建记录的任务名称，将在浏览器新窗口中打开该构建任务详情页。

![](https://help-assets.codehub.cn/enterprise/20210910113104.png)

![](https://help-assets.codehub.cn/enterprise/20210910113611.png)


2.  点击任一行构建记录的运行编号，将在浏览器新窗口中打开该构建记录详情页。

![](https://help-assets.codehub.cn/enterprise/20210910113724.png)

### [待确认发布](#release)

待确认发表列表页展示了持续部署中需要当前用户进行人工确认的发布单。

点击任一发布单的标题，将在浏览器新窗口中打开该发布单的详情页。

==== 2021/09/15 ====
