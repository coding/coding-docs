---
title: 设置隐藏分支 - CODING 帮助中心
pageTitle: 设置隐藏分支
pagePrevTitle: 设置保护分支
pagePrev: repo/branch/protected.html 
pageNextTitle: 使用代码所有者机制
pageNext: repo/branch/codeowner.html
---

如需控制单个分支的访问权限，你可以将默认分支以外的任一分支设为隐藏分支，只有经授权的用户或用户组才能访问该分支，保证代码的安全性。

1.  在代码仓库的详情页面，点击「设置」->「分支设置」进入分支设置页面。

![](https://help-assets.codehub.cn/enterprise/20210813143516.png)

2.  点击「添加隐藏分支」，选择或输入分支后点击「保存」。添加成功的隐藏分支会显示在隐藏分支列表。
2.  通过「新增用户组」或「新增成员」添加允许/拒绝分支访问的用户。


![](https://help-assets.codehub.cn/enterprise/20210817125640.png)

隐藏分支访问权限优先级为 用户 > 用户组 > 所有用户。当某个成员归属多个用户组时，若某个用户组具备访问权限，那么其能够访问隐藏分支。

例如，用户 A 同时归属于用户组 1 (允许访问 `dev/001` 分支) 和用户组 2 (拒绝访问 `dev/001` 分支)，在该种情况下用户 A 可以访问 `dev/001` 分支。




==== 2021/11/11 ====
