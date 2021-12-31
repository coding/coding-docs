---
title: 开启提交者及提交注释验证 - CODING 帮助中心
pageTitle: 开启提交者及提交注释验证
pagePrevTitle: 使用 GPG 签名 commit 记录
pagePrev: repo/security/gpg-sign.html
pageNextTitle: 锁定文件/文件夹
pageNext: repo/security/lock.html
alias: repo/config/push.html
---

项目管理员可以在代码仓库的「设置」->「推送设置」页面开启针对 Git 提交者 (Committer) 和 提交作者 (Author）的验证。

![](https://help-assets.codehub.cn/enterprise/20211104145908.png)

项目管理员还可以设置 Git 提交注释的规则，不符合该规则的提交将被拦截。例如，将提交注释规则设置为 `^fix #[0-9]+`，则规定了每次提交时必须要在提交注释中关联项目事项；如 `^fix #630` 表明该次提交关联当前项目中 ID 为 630 的事项。

>如需了解如何在提交信息中自动关联事项，请参考[提交文件](/docs/repo/start.html#git-commit)。



==== 2021/10/28====
