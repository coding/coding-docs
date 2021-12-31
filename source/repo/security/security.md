---
title: 检查仓库安全风险 - CODING 帮助中心
pageTitle: 检查仓库安全风险
pagePrevTitle: 版本与标签——管理版本标签
pagePrev: repo/version/tag.html
pageNextTitle: 设置仓库访问方式
pageNext: repo/security/access.html
alias: repo/config/security.html
---

项目管理员可以在代码仓库的「设置」->「仓库安全」页面查看该仓库存在的安全风险。

![](https://help-assets.codehub.cn/enterprise/20211104145830.png)

目前，系统支持对代码仓库进行以下检查：

-   是否开启了 Git 提交者和提交作者检查
-   是否上传了 GPG 公钥
-   是否设置了保护分支；若已设置保护分支，是否设置了分支管理员和开启代码所有者评审

为了提高仓库的安全等级，建议你参考[推送设置](/docs/repo/config/push.html)、[使用 GPG 签名 commit 记录](/docs/repo/gpg-sign.html)、[保护分支](/docs/repo/branch/protected.html)配置对应功能。




==== 2021/10/28 ====
