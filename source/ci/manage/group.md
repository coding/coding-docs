---
title: 分组管理 - CODING 帮助中心
pageTitle: 分组管理
pagePrevTitle: 构建节点池
pagePrev: ci/node/pool.html
pageNextTitle: 团队构建模板
pageNext: ci/manage/team-template.html
alias: 
-   devops/ci/group.html
-   ci/group.html
---

### 星标与分组

构建计划还支持星标与分组，可以帮助快速定位到自己关注的构建计划。

-   星标功能

个人选项，设置后仅对个人生效。点击单个构建计划区域中的星标按钮后，可以在「我的星标」 tab 栏中仅查看星标构建计划。

![](https://help-assets.codehub.cn/enterprise/20200924193538.png)

-   分组功能

全局选项，仅开放给「持续集成管理」权限的用户。设置后的构建计划分组归类对项目内内成员可见，方便项目内构建计划的整理。

点击【更多】->【创建分组】可以创建分组，点击后输入分组名即可创建。

![](https://help-assets.codehub.cn/enterprise/20200924193859.png)

还可以修改分组名称、排序，也可以创建和删除分组。

*注意：删除分组不会删除分组中的构建计划，分组删除后，分组内的构建计划将会被归类到 “未分组” 类别。*

![](https://help-assets.codehub.cn/enterprise/20200924193934.png)

点击【批量整理构建计划】可以进入构建计划整理页面，可以一次性选择多个构建计划至同一个分组当中。添加完成后就可以在单独的分组 tab 页中看到勾选的构建计划。

![](https://help-assets.codehub.cn/enterprise/20200924194030.png)

### 筛选与排序

在构建计划页面右侧的搜索栏中可以根据构建计划名称进行筛选。选择【筛选器】->【只看我触发的】，构建计划中将会显示由用户本人最新一次触发的构建记录，并且在构建记录展示页，也可以开启此筛选按钮。

![](https://help-assets.codehub.cn/enterprise/20200924195635.png)

除此之外，还可以按照构建计划最新构建记录的触发时间排序。


==== 2020/09/25 ====
