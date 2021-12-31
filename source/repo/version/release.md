---
title: 管理版本发布 - CODING 帮助中心
pageTitle: 管理版本发布
pagePrevTitle: 合并请求与代码评审——评审合并请求
pagePrev: repo/mr-review/review.html
pageNextTitle: 管理版本标签
pageNext: repo/version/tag.html
alias: 
-   host/release.html
-   repo/release.html
---

在代码仓库管理列表，点击指定代码仓库进入其详情页面之后，再点击「版本」->「版本发布」即可进入其版本发布列表。

![](https://help-assets.codehub.cn/enterprise/20211102174945.png)

版本发布列表按创建时间倒序列出项目已发布的代码版本，并展示了代码版本对应的标签名、提交的代码版本等信息。


### [新建代码版本](#create-version)

1.  在版本管理页面，点击右上角的新建代码版本按钮。
> 你可以在代码仓库设置页面[设置版本发布默认分支](#delete-tag)。

2.  输入标签版本、版本发布标题、版本描述等，支持上传 100 MB 以下所有格式的文件以及关联项目内的资源（如任务、文件、Wiki、合并请求）。其中，标签名只能输出新标签名，需要给新标签版本选择创建来源（分支、标签或修订版本）。

![](https://help-assets.codehub.cn/enterprise/20211102175039.png)

3.  在填写以上信息后，您可以标记为该版本为预发布状态，然后创建代码版本发布。

代码版本发布后，显示情况如下图。最近一次正式版本发布为最新发布。

![](https://help-assets.codehub.cn/enterprise/20211102175134.png)

### [编辑代码版本](#edit-version)

在版本发布列表点击任一代码版本进入其详情页面之后，版本发布创建者或项目管理员点击编辑版本描述按钮，即可编辑除标签名以外的其他所有信息。

![](https://help-assets.codehub.cn/enterprise/20211102175209.png)

### [删除代码版本](#delete-version)

在代码版本详情页面，版本发布创建者或项目管理员点击删除图标，即可删除该版本。

>在删除版本时，可同时将对应的版本标签删除。只有删除了对应的版本标签，才能使用或创建同名的标签。

![](https://help-assets.codehub.cn/enterprise/20211102175250.png)

### [设置版本发布默认分支](#delete-tag)

在代码仓库的「设置」->「版本发布」页面，项目管理员可以指定版本发布时默认选择的分支。

![](https://help-assets.codehub.cn/enterprise/20210813144322.png)


==== 2021/11/13 ====
