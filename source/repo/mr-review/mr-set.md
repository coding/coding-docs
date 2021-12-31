---
title: 调整合并请求设置 - CODING 帮助中心
pageTitle: 调整合并请求设置
pagePrevTitle: 分支管理——使用 cherry-pick 功能
pagePrev: repo/branch/cherry-pick.html
pageNextTitle: 合并分支
pageNext: repo/mr-review/mr.html
---

项目管理员可以在代码仓库的「设置」->「合并请求」页面设置合并请求的基础设置、默认的合并方式与目标分支。

![](https://help-assets.codehub.cn/enterprise/20210813144159.png)

### [是否默认删除源分支](#delete-source-branch)

如果开启此项开关，那么当发起请求的源分支被并入至目标分支后，源分支会被自动删除。

### [是否默认以 Fast-Forward 模式合并](#fast-forward)

如果该功能开启，那么当源分支是目标分支的直接上游时，合并会以 Fast-Forward 的模式进行，即源分支会直接指向目标分支，而不会产生一个合并提交。

### [合并方式](#merge-method)

当源分支有多个提交的时候，我们会提供三种合并模式：

-   默认直接合并：会产生一个合并提交
-   默认 Squash 合并：会把源分支的多个提交合并成一个提交，用户可以取消这个行为
-   只能 Squash 合并：强制把源分支的多个提交合并成一个提交，用户不能取消

### [默认目标分支](#default-branch)

指定了默认分支之后，在创建合并请求时会自动填充该分支为目标分支。建议使用主干分支为合并请求的默认目标分支。

==== 2021/11/16 ====
