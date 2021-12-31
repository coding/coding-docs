---
title: 清理策略 - CODING 帮助中心
pageTitle: 清理策略
pagePrevTitle: 制品版本覆盖策略
pagePrev: artifacts/version.html
pageNextTitle: 常见问题
pageNext: artifacts/problem.html
---

制品仓库的清理策略能够及时清理老旧版本的制品。您可以通过设置清理策略快速清理多余制品，释放储存空间。目前支持清理策略设置的制品类型：

-   npm
-   maven
-   helm

### 配置清理策略

进入上述三种类型的制品仓库页后，点击「设置仓库」>「清理策略」。

![](https://help-assets.codehub.cn/enterprise/20210311165452.png)

您需要先填写清理设置中的两个触发条件，再选择执行自动/手动清理，只有同时符合两个触发清理条件的制品才会被纳入清理列表。

![](https://help-assets.codehub.cn/enterprise/20210311170856.png)

### 查看清理记录

您可以在「团队管理」>「日志」中查看制品仓库的操作日志。

![](https://help-assets.codehub.cn/enterprise/20210312102521.png)

【项目概览】中的项目动态也会直接展示制品版本删除记录。

![](https://help-assets.codehub.cn/enterprise/20210311171552.png)

==== 2021/03/11 ====
